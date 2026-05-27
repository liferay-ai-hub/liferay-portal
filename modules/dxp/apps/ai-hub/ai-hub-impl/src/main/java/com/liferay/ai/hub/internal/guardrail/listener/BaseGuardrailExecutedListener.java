/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.guardrail.listener;

import com.liferay.account.model.AccountEntry;
import com.liferay.ai.hub.audit.constants.AIHubEventTypes;
import com.liferay.ai.hub.util.AccountEntryUtil;
import com.liferay.portal.kernel.audit.AuditMessage;
import com.liferay.portal.kernel.audit.AuditRouter;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.MapUtil;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.workflow.WorkflowInstance;
import com.liferay.portal.workflow.kaleo.model.KaleoInstanceToken;
import com.liferay.portal.workflow.kaleo.runtime.ExecutionContext;

import dev.langchain4j.guardrail.GuardrailResult;

import java.io.Serializable;

import java.time.Duration;

import java.util.Date;
import java.util.Map;

/**
 * @author Pedro Leite
 */
public abstract class BaseGuardrailExecutedListener {

	public BaseGuardrailExecutedListener(
		AuditRouter auditRouter, ExecutionContext executionContext) {

		_auditRouter = auditRouter;
		_executionContext = executionContext;
	}

	protected void route(
		String content, Duration duration, GuardrailResult<?> guardrailResult,
		String guardrailType) {

		try {
			KaleoInstanceToken kaleoInstanceToken =
				_executionContext.getKaleoInstanceToken();

			long accountEntryId = 0;

			AccountEntry accountEntry = AccountEntryUtil.getUserAccountEntry(
				kaleoInstanceToken.getUserId());

			if (accountEntry != null) {
				accountEntryId = accountEntry.getAccountEntryId();
			}

			Map<String, Serializable> workflowContext =
				_executionContext.getWorkflowContext();

			_auditRouter.route(
				new AuditMessage(
					0, kaleoInstanceToken.getCompanyId(),
					kaleoInstanceToken.getUserId(),
					PortalUtil.getUserName(
						kaleoInstanceToken.getUserId(), null),
					new Date(), accountEntryId,
					JSONUtil.put(
						"agentDefinitionExternalReferenceCode",
						MapUtil.getString(
							workflowContext,
							"agentDefinitionExternalReferenceCode")
					).put(
						"content", content
					).put(
						"duration", duration.toMillis()
					).put(
						"errors",
						JSONUtil.toJSONArray(
							guardrailResult.failures(),
							failure -> failure.message())
					).put(
						"guardrailType", guardrailType
					).put(
						"sseEventSinkKey",
						MapUtil.getString(workflowContext, "sseEventSinkKey")
					).put(
						"workflowInstanceId",
						kaleoInstanceToken.getKaleoInstanceId()
					),
					WorkflowInstance.class.getName(),
					String.valueOf(kaleoInstanceToken.getKaleoInstanceId()),
					null, AIHubEventTypes.AI_HUB_GUARDRAIL_ALERT, null));
		}
		catch (Exception exception) {
			if (_log.isWarnEnabled()) {
				_log.warn(exception);
			}
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(
		BaseGuardrailExecutedListener.class);

	private final AuditRouter _auditRouter;
	private final ExecutionContext _executionContext;

}