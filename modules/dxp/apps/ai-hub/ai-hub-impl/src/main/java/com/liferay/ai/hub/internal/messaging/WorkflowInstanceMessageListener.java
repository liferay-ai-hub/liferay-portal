/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.messaging;

import com.liferay.ai.hub.audit.constants.AIHubEventTypes;
import com.liferay.ai.hub.internal.agent.util.AgentUtil;
import com.liferay.ai.hub.internal.configuration.VertexAIConfiguration;
import com.liferay.ai.hub.util.AuditRouterUtil;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.configuration.module.configuration.ConfigurationProviderUtil;
import com.liferay.portal.kernel.audit.AuditRouter;
import com.liferay.portal.kernel.dao.orm.QueryUtil;
import com.liferay.portal.kernel.feature.flag.FeatureFlagManagerUtil;
import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONFactory;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.messaging.BaseMessageListener;
import com.liferay.portal.kernel.messaging.Destination;
import com.liferay.portal.kernel.messaging.DestinationConfiguration;
import com.liferay.portal.kernel.messaging.DestinationFactory;
import com.liferay.portal.kernel.messaging.Message;
import com.liferay.portal.kernel.messaging.MessageListener;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.MapUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.workflow.WorkflowInstance;
import com.liferay.portal.kernel.workflow.WorkflowInstanceManager;
import com.liferay.portal.kernel.workflow.WorkflowLog;
import com.liferay.portal.workflow.kaleo.runtime.constants.WorkflowInstanceDestinationNames;
import com.liferay.portal.workflow.kaleo.runtime.util.WorkflowContextUtil;
import com.liferay.portal.workflow.manager.WorkflowLogManager;

import java.io.Serializable;

import java.util.Collections;
import java.util.Map;

import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Feliphe Marinho
 * @author João Victor Alves
 */
@Component(
	property = "destination.name=" + WorkflowInstanceDestinationNames.WORKFLOW_INSTANCE,
	service = MessageListener.class
)
public class WorkflowInstanceMessageListener extends BaseMessageListener {

	@Activate
	protected void activate(BundleContext bundleContext) {
		Destination destination = _destinationFactory.createDestination(
			new DestinationConfiguration(
				DestinationConfiguration.DESTINATION_TYPE_PARALLEL,
				WorkflowInstanceDestinationNames.WORKFLOW_INSTANCE));

		_destinationServiceRegistration = bundleContext.registerService(
			Destination.class, destination,
			MapUtil.singletonDictionary(
				"destination.name", destination.getName()));
	}

	@Deactivate
	protected void deactivate() {
		_destinationServiceRegistration.unregister();
	}

	@Override
	protected void doReceive(Message message) throws Exception {
		long companyId = message.getLong("companyId");
		long userId = message.getLong("userId");
		long workflowInstanceId = message.getLong("workflowInstanceId");

		if (message.contains("exception")) {
			Exception exception = (Exception)message.get("exception");

			AgentUtil.completeExceptionally(exception, workflowInstanceId);

			_route(companyId, exception, userId, workflowInstanceId);

			return;
		}

		AgentUtil.complete(
			(Map<String, Serializable>)message.get("workflowContext"),
			workflowInstanceId);

		_route(companyId, null, userId, workflowInstanceId);
	}

	private void _route(
			long companyId, Exception exception, long userId,
			long workflowInstanceId)
		throws Exception {

		if (!FeatureFlagManagerUtil.isEnabled(companyId, "LPD-62272")) {
			return;
		}

		WorkflowInstance workflowInstance =
			_workflowInstanceManager.getWorkflowInstance(
				companyId, workflowInstanceId);

		Map<String, Serializable> workflowContext =
			workflowInstance.getWorkflowContext();

		String agentDefinitionExternalReferenceCode = MapUtil.getString(
			workflowContext, "agentDefinitionExternalReferenceCode");

		if (Validator.isNull(agentDefinitionExternalReferenceCode)) {
			return;
		}

		long inputTokenCount = 0;
		long outputTokenCount = 0;
		long thoughtsTokenCount = 0;
		long totalTokenCount = 0;

		JSONArray outputsJSONArray = _jsonFactory.createJSONArray();
		JSONArray promptInputsJSONArray = _jsonFactory.createJSONArray();
		JSONArray userMessageInputsJSONArray = _jsonFactory.createJSONArray();

		for (WorkflowLog workflowLog :
				_workflowLogManager.getWorkflowLogsByWorkflowInstance(
					companyId, workflowInstanceId,
					Collections.singletonList(WorkflowLog.NODE_USAGE_METADATA),
					QueryUtil.ALL_POS, QueryUtil.ALL_POS, null)) {

			Map<String, Serializable> workflowLogContext =
				WorkflowContextUtil.convert(workflowLog.getWorkflowContext());

			inputTokenCount += MapUtil.getLong(
				workflowLogContext, "inputTokenCount");
			outputTokenCount += MapUtil.getLong(
				workflowLogContext, "outputTokenCount");
			thoughtsTokenCount += MapUtil.getLong(
				workflowLogContext, "thoughtsTokenCount");
			totalTokenCount += MapUtil.getLong(
				workflowLogContext, "totalTokenCount");

			String output = MapUtil.getString(workflowLogContext, "output");

			if (Validator.isNotNull(output)) {
				outputsJSONArray.put(output);
			}

			String promptInput = MapUtil.getString(
				workflowLogContext, "promptInput");

			if (Validator.isNotNull(promptInput)) {
				promptInputsJSONArray.put(promptInput);
			}

			String userMessageInput = MapUtil.getString(
				workflowLogContext, "userMessageInput");

			if (Validator.isNotNull(userMessageInput)) {
				userMessageInputsJSONArray.put(userMessageInput);
			}
		}

		long endTime = System.currentTimeMillis();
		String errorMessage = StringPool.BLANK;
		long startTime = MapUtil.getLong(workflowContext, "startTime");
		String status = "success";

		if (exception != null) {
			errorMessage = GetterUtil.getString(
				exception.getLocalizedMessage(), exception.getMessage());
			status = "error";
		}

		VertexAIConfiguration vertexAIConfiguration =
			ConfigurationProviderUtil.getCompanyConfiguration(
				VertexAIConfiguration.class, companyId);

		AuditRouterUtil.route(
			JSONUtil.put(
				"agentDefinitionExternalReferenceCode",
				agentDefinitionExternalReferenceCode
			).put(
				"duration", (startTime > 0) ? (endTime - startTime) : null
			).put(
				"endTime", endTime
			).put(
				"errorMessage", errorMessage
			).put(
				"inputTokenCount", inputTokenCount
			).put(
				"instructionDefinitionScope",
				MapUtil.getString(workflowContext, "instructionDefinitionScope")
			).put(
				"llmModelProvider", "vertex-ai"
			).put(
				"modelName", vertexAIConfiguration.modelName()
			).put(
				"outputs", outputsJSONArray
			).put(
				"outputTokenCount", outputTokenCount
			).put(
				"promptInputs", promptInputsJSONArray
			).put(
				"sseEventSinkKey",
				MapUtil.getString(workflowContext, "sseEventSinkKey")
			).put(
				"startTime", (startTime > 0) ? startTime : null
			).put(
				"status", status
			).put(
				"thoughtsTokenCount", thoughtsTokenCount
			).put(
				"totalTokenCount", totalTokenCount
			).put(
				"userMessageInputs", userMessageInputsJSONArray
			).put(
				"workflowDefinitionName",
				workflowInstance.getWorkflowDefinitionName()
			).put(
				"workflowDefinitionVersion",
				workflowInstance.getWorkflowDefinitionVersion()
			).put(
				"workflowInstanceId", workflowInstanceId
			),
			_auditRouter, WorkflowInstance.class.getName(), workflowInstanceId,
			companyId, AIHubEventTypes.AI_HUB_AGENT_EXECUTION, userId);
	}

	@Reference
	private AuditRouter _auditRouter;

	@Reference
	private DestinationFactory _destinationFactory;

	private ServiceRegistration<Destination> _destinationServiceRegistration;

	@Reference
	private JSONFactory _jsonFactory;

	@Reference
	private WorkflowInstanceManager _workflowInstanceManager;

	@Reference
	private WorkflowLogManager _workflowLogManager;

}