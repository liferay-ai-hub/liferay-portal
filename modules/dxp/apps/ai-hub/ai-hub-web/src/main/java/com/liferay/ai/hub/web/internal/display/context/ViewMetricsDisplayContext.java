/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.web.internal.display.context;

import com.liferay.account.model.AccountEntry;
import com.liferay.ai.hub.util.AccountEntryUtil;
import com.liferay.frontend.data.set.model.FDSActionDropdownItem;
import com.liferay.object.model.ObjectDefinition;
import com.liferay.object.model.ObjectEntry;
import com.liferay.object.service.ObjectDefinitionLocalService;
import com.liferay.object.service.ObjectEntryLocalService;
import com.liferay.portal.kernel.dao.orm.QueryUtil;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.util.ResourceBundleUtil;
import com.liferay.portal.kernel.dao.orm.DynamicQuery;
import com.liferay.portal.kernel.dao.orm.OrderFactoryUtil;
import com.liferay.portal.kernel.dao.orm.RestrictionsFactoryUtil;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.workflow.kaleo.model.KaleoLog;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.workflow.kaleo.service.KaleoLogLocalService;

import jakarta.servlet.http.HttpServletRequest;

import java.io.Serializable;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

/**
 * @author Eugenio Ortiz
 */
public class ViewMetricsDisplayContext {

	public ViewMetricsDisplayContext(
		HttpServletRequest httpServletRequest,
		KaleoLogLocalService kaleoLogLocalService,
		ObjectDefinitionLocalService objectDefinitionLocalService,
		ObjectEntryLocalService objectEntryLocalService) {

		_httpServletRequest = httpServletRequest;
		_kaleoLogLocalService = kaleoLogLocalService;
		_objectDefinitionLocalService = objectDefinitionLocalService;
		_objectEntryLocalService = objectEntryLocalService;

		_themeDisplay = (ThemeDisplay)httpServletRequest.getAttribute(
			WebKeys.THEME_DISPLAY);
	}

	public String get(String key) {
		ResourceBundle resourceBundle = ResourceBundleUtil.getBundle(
			"content.Language", _themeDisplay.getLocale(),
			ViewMetricsDisplayContext.class.getClassLoader());

		return LanguageUtil.get(resourceBundle, key);
	}

	public String getActivitiesAPIURL() {
		return "/o/ai-hub/v1.0/metrics/activities";
	}

	public List<FDSActionDropdownItem> getFDSActionDropdownItems() {
		return Collections.emptyList();
	}

	public int getAgentDefinitionsCount() {
		return _getObjectEntriesCount("L_AI_HUB_AGENT_DEFINITION");
	}

	public int getChatbotsCount() {
		return _getObjectEntriesCount("L_AI_HUB_CHATBOT");
	}

	public List<KaleoLog> getRecentActivities() {
		try {
			DynamicQuery dynamicQuery = _kaleoLogLocalService.dynamicQuery();

			dynamicQuery.add(
				RestrictionsFactoryUtil.eq(
					"companyId", _themeDisplay.getCompanyId()));
			dynamicQuery.add(
				RestrictionsFactoryUtil.eq("type", _NODE_USAGE_METADATA_TYPE));
			dynamicQuery.addOrder(OrderFactoryUtil.desc("createDate"));

			return _kaleoLogLocalService.dynamicQuery(dynamicQuery, 0, 20);
		}
		catch (Exception exception) {
			return new java.util.ArrayList<>();
		}
	}

	public String getWorkflowContextValue(KaleoLog kaleoLog, String key) {
		try {
			String workflowContext = kaleoLog.getWorkflowContext();

			if (workflowContext == null) {
				return "";
			}

			JSONObject jsonObject = JSONFactoryUtil.createJSONObject(
				workflowContext);

			// Liferay serializes Maps as {"javaClass":"...","map":{...}}

			JSONObject mapObject = jsonObject.getJSONObject("map");

			if (mapObject != null) {
				return mapObject.getString(key);
			}

			return jsonObject.getString(key);
		}
		catch (Exception exception) {
			return "";
		}
	}

	public String getFeedbackAPIURL() {
		return "/o/ai-hub/agent-feedbacks";
	}

	public long getFeedbackTotalCount() {
		return _getObjectEntriesCount("L_AI_HUB_AGENT_FEEDBACK");
	}

	public long getPositiveFeedbackCount() {
		return _getObjectEntriesCountByFieldValue(
			"L_AI_HUB_AGENT_FEEDBACK", "feedbackType", "POSITIVE");
	}

	public long getNegativeFeedbackCount() {
		return _getObjectEntriesCountByFieldValue(
			"L_AI_HUB_AGENT_FEEDBACK", "feedbackType", "NEGATIVE");
	}

	public int getPositiveFeedbackPercent() {
		long total = getFeedbackTotalCount();

		if (total == 0) {
			return 0;
		}

		return (int)(getPositiveFeedbackCount() * 100 / total);
	}

	public long getIssueReportCount() {
		return _getObjectEntriesCountByFieldNonEmpty(
			"L_AI_HUB_AGENT_FEEDBACK", "issueType");
	}

	public String getAverageResponseTime() {
		try {
			DynamicQuery dynamicQuery = _kaleoLogLocalService.dynamicQuery();

			dynamicQuery.add(
				RestrictionsFactoryUtil.eq(
					"companyId", _themeDisplay.getCompanyId()));
			dynamicQuery.add(
				RestrictionsFactoryUtil.eq("type", _NODE_USAGE_METADATA_TYPE));

			List<KaleoLog> kaleoLogs = _kaleoLogLocalService.dynamicQuery(
				dynamicQuery, 0, 1000);

			long total = 0;
			int count = 0;

			for (KaleoLog kaleoLog : kaleoLogs) {
				String durationMs = getWorkflowContextValue(
					kaleoLog, "durationMs");

				if (!durationMs.isEmpty()) {
					long ms = GetterUtil.getLong(durationMs);

					if (ms > 0) {
						total += ms;
						count++;
					}
				}
			}

			if (count == 0) {
				return "-";
			}

			double avgSeconds = (total / (double)count) / 1000.0;

			if (avgSeconds < 10) {
				return String.format("%.1fs", avgSeconds);
			}

			return String.format("%.0fs", avgSeconds);
		}
		catch (Exception exception) {
			return "-";
		}
	}

	public long getTotalInteractions() {
		try {
			DynamicQuery dynamicQuery = _kaleoLogLocalService.dynamicQuery();

			dynamicQuery.add(
				RestrictionsFactoryUtil.eq(
					"companyId", _themeDisplay.getCompanyId()));
			dynamicQuery.add(
				RestrictionsFactoryUtil.eq("type", _NODE_USAGE_METADATA_TYPE));

			return _kaleoLogLocalService.dynamicQueryCount(dynamicQuery);
		}
		catch (Exception exception) {
			return 0L;
		}
	}

	public long getTotalTokensUsed() {
		try {
			DynamicQuery dynamicQuery = _kaleoLogLocalService.dynamicQuery();

			dynamicQuery.add(
				RestrictionsFactoryUtil.eq(
					"companyId", _themeDisplay.getCompanyId()));
			dynamicQuery.add(
				RestrictionsFactoryUtil.eq("type", _NODE_USAGE_METADATA_TYPE));
			dynamicQuery.addOrder(OrderFactoryUtil.desc("createDate"));

			List<KaleoLog> kaleoLogs = _kaleoLogLocalService.dynamicQuery(
				dynamicQuery, 0, 1000);

			long total = 0;

			for (KaleoLog kaleoLog : kaleoLogs) {
				String totalTokenCount = getWorkflowContextValue(
					kaleoLog, "totalTokenCount");

				if (!totalTokenCount.isEmpty()) {
					total += GetterUtil.getLong(totalTokenCount);
				}
			}

			return total;
		}
		catch (Exception exception) {
			return 0L;
		}
	}

	public long getTokenLimit() {
		return _getQuotaValue("limit");
	}

	public long getTokenUsage() {
		return _getQuotaValue("usage");
	}

	private long _getObjectEntriesCountByFieldValue(
		String externalReferenceCode, String fieldName, String fieldValue) {

		try {
			ObjectDefinition objectDefinition =
				_objectDefinitionLocalService.
					fetchObjectDefinitionByExternalReferenceCode(
						externalReferenceCode, _themeDisplay.getCompanyId());

			if (objectDefinition == null) {
				return 0;
			}

			List<ObjectEntry> objectEntries =
				_objectEntryLocalService.getObjectEntries(
					0, objectDefinition.getObjectDefinitionId(),
					QueryUtil.ALL_POS, QueryUtil.ALL_POS);

			long count = 0;

			for (ObjectEntry objectEntry : objectEntries) {
				Map<String, Serializable> values = objectEntry.getValues();

				if (fieldValue.equals(String.valueOf(values.get(fieldName)))) {
					count++;
				}
			}

			return count;
		}
		catch (Exception exception) {
			return 0;
		}
	}

	private long _getObjectEntriesCountByFieldNonEmpty(
		String externalReferenceCode, String fieldName) {

		try {
			ObjectDefinition objectDefinition =
				_objectDefinitionLocalService.
					fetchObjectDefinitionByExternalReferenceCode(
						externalReferenceCode, _themeDisplay.getCompanyId());

			if (objectDefinition == null) {
				return 0;
			}

			List<ObjectEntry> objectEntries =
				_objectEntryLocalService.getObjectEntries(
					0, objectDefinition.getObjectDefinitionId(),
					QueryUtil.ALL_POS, QueryUtil.ALL_POS);

			long count = 0;

			for (ObjectEntry objectEntry : objectEntries) {
				Map<String, Serializable> values = objectEntry.getValues();

				Object value = values.get(fieldName);

				if ((value != null) && !String.valueOf(value).isEmpty() &&
					!"null".equals(String.valueOf(value))) {

					count++;
				}
			}

			return count;
		}
		catch (Exception exception) {
			return 0;
		}
	}

	private int _getObjectEntriesCount(String externalReferenceCode) {
		try {
			ObjectDefinition objectDefinition =
				_objectDefinitionLocalService.
					fetchObjectDefinitionByExternalReferenceCode(
						externalReferenceCode, _themeDisplay.getCompanyId());

			if (objectDefinition == null) {
				return 0;
			}

			return _objectEntryLocalService.getObjectEntriesCount(
				objectDefinition.getObjectDefinitionId());
		}
		catch (Exception exception) {
			return 0;
		}
	}

	private long _getQuotaValue(String field) {
		try {
			ObjectDefinition objectDefinition =
				_objectDefinitionLocalService.
					fetchObjectDefinitionByExternalReferenceCode(
						"L_AI_HUB_QUOTA", _themeDisplay.getCompanyId());

			if (objectDefinition == null) {
				return 0L;
			}

			AccountEntry accountEntry = AccountEntryUtil.getUserAccountEntry(
				_themeDisplay.getUserId());

			if (accountEntry == null) {
				return 0L;
			}

			com.liferay.object.model.ObjectEntry objectEntry =
				_objectEntryLocalService.fetchObjectEntry(
					"quota-" + accountEntry.getAccountEntryId(), 0,
					objectDefinition.getObjectDefinitionId());

			if (objectEntry == null) {
				return 0L;
			}

			Map<String, Serializable> values = objectEntry.getValues();

			return GetterUtil.getLong(values.get(field));
		}
		catch (Exception exception) {
			return 0L;
		}
	}

	private static final String _NODE_USAGE_METADATA_TYPE =
		"NODE_USAGE_METADATA";

	private final HttpServletRequest _httpServletRequest;
	private final KaleoLogLocalService _kaleoLogLocalService;
	private final ObjectDefinitionLocalService _objectDefinitionLocalService;
	private final ObjectEntryLocalService _objectEntryLocalService;
	private final ThemeDisplay _themeDisplay;

}
