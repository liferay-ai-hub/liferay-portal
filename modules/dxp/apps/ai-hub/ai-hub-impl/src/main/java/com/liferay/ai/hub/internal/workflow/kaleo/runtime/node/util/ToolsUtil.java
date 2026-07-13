/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.workflow.kaleo.runtime.node.util;

import com.liferay.ai.hub.internal.tools.ImageGenerationTools;
import com.liferay.ai.hub.internal.tools.WorkflowNodeTools;
import com.liferay.ai.hub.quota.QuotaManager;
import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONException;
import com.liferay.portal.kernel.json.JSONFactory;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.workflow.WorkflowNodeManager;
import com.liferay.portal.workflow.kaleo.definition.NodeType;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Feliphe Marinho
 */
public class ToolsUtil {

	public static List<String> getMCPServerExternalReferenceCodes(
		JSONFactory jsonFactory, Map<String, String> kaleoNodeSettingValues) {

		return _getExternalReferenceCodes(
			jsonFactory, kaleoNodeSettingValues, "mcpServer");
	}

	public static Object[] getTools(
		JSONFactory jsonFactory, Map<String, String> kaleoNodeSettingValues,
		NodeType nodeType, QuotaManager quotaManager,
		WorkflowNodeManager workflowNodeManager) {

		if (nodeType == NodeType.AI_DECISION) {
			return new Object[] {new WorkflowNodeTools(workflowNodeManager)};
		}

		List<String> externalReferenceCodes = _getExternalReferenceCodes(
			jsonFactory, kaleoNodeSettingValues, "tool");

		if (externalReferenceCodes.contains("imageGeneration")) {
			return new Object[] {new ImageGenerationTools(quotaManager)};
		}

		return new Object[0];
	}

	private static List<String> _getExternalReferenceCodes(
		JSONFactory jsonFactory, Map<String, String> kaleoNodeSettingValues,
		String type) {

		List<String> externalReferenceCodes = new ArrayList<>();

		try {
			JSONArray jsonArray = jsonFactory.createJSONArray(
				kaleoNodeSettingValues.get("tools"));

			for (JSONObject jsonObject : (Iterable<JSONObject>)jsonArray) {
				if (!type.equals(jsonObject.getString("type"))) {
					continue;
				}

				externalReferenceCodes.add(
					jsonObject.getString("externalReferenceCode"));
			}
		}
		catch (JSONException jsonException) {
			if (_log.isDebugEnabled()) {
				_log.debug(jsonException);
			}
		}

		return externalReferenceCodes;
	}

	private static final Log _log = LogFactoryUtil.getLog(ToolsUtil.class);

}