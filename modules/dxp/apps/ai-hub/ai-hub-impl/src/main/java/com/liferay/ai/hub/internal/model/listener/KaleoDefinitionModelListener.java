/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.model.listener;

import com.liferay.ai.hub.audit.constants.AIHubEventTypes;
import com.liferay.ai.hub.util.AuditRouterUtil;
import com.liferay.portal.kernel.audit.AuditRouter;
import com.liferay.portal.kernel.exception.ModelListenerException;
import com.liferay.portal.kernel.feature.flag.FeatureFlagManagerUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.model.BaseModelListener;
import com.liferay.portal.kernel.model.ModelListener;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.workflow.constants.WorkflowDefinitionConstants;
import com.liferay.portal.workflow.kaleo.model.KaleoDefinition;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Pedro Leite
 */
@Component(service = ModelListener.class)
public class KaleoDefinitionModelListener
	extends BaseModelListener<KaleoDefinition> {

	@Override
	public void onAfterCreate(KaleoDefinition kaleoDefinition)
		throws ModelListenerException {

		try {
			if (!_isAIScoped(kaleoDefinition)) {
				return;
			}

			_route(
				JSONUtil.put("content", kaleoDefinition.getContent()),
				AIHubEventTypes.AI_HUB_AGENT_FLOW_ADD, kaleoDefinition);
		}
		catch (Exception exception) {
			throw new ModelListenerException(exception);
		}
	}

	@Override
	public void onAfterRemove(KaleoDefinition kaleoDefinition)
		throws ModelListenerException {

		try {
			if (!_isAIScoped(kaleoDefinition)) {
				return;
			}

			_route(
				JSONUtil.put(
					"content", kaleoDefinition.getContent()
				).put(
					"version", kaleoDefinition.getVersion()
				),
				AIHubEventTypes.AI_HUB_AGENT_FLOW_DELETE, kaleoDefinition);
		}
		catch (Exception exception) {
			throw new ModelListenerException(exception);
		}
	}

	@Override
	public void onAfterUpdate(
			KaleoDefinition originalKaleoDefinition,
			KaleoDefinition kaleoDefinition)
		throws ModelListenerException {

		try {
			if (!_isAIScoped(kaleoDefinition)) {
				return;
			}

			String content = kaleoDefinition.getContent();
			String originalContent = originalKaleoDefinition.getContent();

			if (StringUtil.equals(originalContent, content)) {
				return;
			}

			_route(
				JSONUtil.put(
					"newContent", content
				).put(
					"newVersion", kaleoDefinition.getVersion()
				).put(
					"oldContent", originalContent
				).put(
					"oldVersion", originalKaleoDefinition.getVersion()
				),
				AIHubEventTypes.AI_HUB_AGENT_FLOW_UPDATE, kaleoDefinition);
		}
		catch (Exception exception) {
			throw new ModelListenerException(exception);
		}
	}

	private boolean _isAIScoped(KaleoDefinition kaleoDefinition) {
		if (!FeatureFlagManagerUtil.isEnabled(
				kaleoDefinition.getCompanyId(), "LPD-62272")) {

			return false;
		}

		return StringUtil.equals(
			kaleoDefinition.getScope(), WorkflowDefinitionConstants.SCOPE_AI);
	}

	private void _route(
			JSONObject additionalInfoJSONObject, String eventType,
			KaleoDefinition kaleoDefinition)
		throws Exception {

		AuditRouterUtil.route(
			additionalInfoJSONObject, _auditRouter,
			KaleoDefinition.class.getName(),
			kaleoDefinition.getKaleoDefinitionId(),
			kaleoDefinition.getCompanyId(), eventType,
			kaleoDefinition.getUserId());
	}

	@Reference
	private AuditRouter _auditRouter;

}