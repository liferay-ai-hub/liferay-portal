/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.rest.internal.resource.v1_0;

import com.liferay.ai.hub.rest.dto.v1_0.MetricsActivity;
import com.liferay.ai.hub.rest.resource.v1_0.MetricsActivityResource;
import com.liferay.petra.function.transform.TransformUtil;
import com.liferay.portal.kernel.dao.orm.Criterion;
import com.liferay.portal.kernel.dao.orm.DynamicQuery;
import com.liferay.portal.kernel.dao.orm.OrderFactoryUtil;
import com.liferay.portal.kernel.dao.orm.RestrictionsFactoryUtil;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.search.Sort;
import com.liferay.portal.kernel.security.permission.PermissionThreadLocal;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.vulcan.pagination.Page;
import com.liferay.portal.vulcan.pagination.Pagination;
import com.liferay.portal.workflow.kaleo.model.KaleoDefinitionVersion;
import com.liferay.portal.workflow.kaleo.model.KaleoLog;
import com.liferay.portal.workflow.kaleo.service.KaleoDefinitionVersionLocalService;
import com.liferay.portal.workflow.kaleo.service.KaleoLogLocalService;

import com.liferay.portal.kernel.util.FastDateFormatFactoryUtil;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ServiceScope;

/**
 * @author Eugenio Ortiz
 */
@Component(
	properties = "OSGI-INF/liferay/rest/v1_0/metrics-activity.properties",
	scope = ServiceScope.PROTOTYPE, service = MetricsActivityResource.class
)
public class MetricsActivityResourceImpl
	extends BaseMetricsActivityResourceImpl {

	@Override
	public Page<MetricsActivity> getMetricActivitiesPage(
			Pagination pagination, Sort[] sorts)
		throws Exception {

		if (!PermissionThreadLocal.getPermissionChecker().isCompanyAdmin()) {
			throw new com.liferay.portal.kernel.security.auth.PrincipalException.MustBeCompanyAdmin(
				contextUser.getUserId());
		}

		long companyId = contextCompany.getCompanyId();

		String filterParam = contextHttpServletRequest.getParameter("filter");

		DynamicQuery countQuery = _buildQuery(companyId, filterParam);

		long totalCount = _kaleoLogLocalService.dynamicQueryCount(countQuery);

		DynamicQuery dynamicQuery = _buildQuery(companyId, filterParam);

		dynamicQuery.addOrder(OrderFactoryUtil.desc("createDate"));

		int start = pagination.getStartPosition();
		int end = pagination.getEndPosition();

		List<KaleoLog> kaleoLogs = _kaleoLogLocalService.dynamicQuery(
			dynamicQuery, start, end);

		// Build agent name cache to avoid N+1 queries

		Map<Long, String> agentNameCache = new java.util.HashMap<>();

		for (KaleoLog kaleoLog : kaleoLogs) {
			long versionId = kaleoLog.getKaleoDefinitionVersionId();

			if (!agentNameCache.containsKey(versionId)) {
				agentNameCache.put(versionId, _getAgentName(versionId));
			}
		}

		return Page.of(
			TransformUtil.transform(
				kaleoLogs,
				kaleoLog -> _toMetricsActivity(kaleoLog, agentNameCache)),
			pagination, totalCount);
	}

	private DynamicQuery _buildQuery(long companyId, String filterParam) {
		DynamicQuery dynamicQuery = _kaleoLogLocalService.dynamicQuery();

		dynamicQuery.add(RestrictionsFactoryUtil.eq("companyId", companyId));
		dynamicQuery.add(
			RestrictionsFactoryUtil.eq("type", _NODE_USAGE_METADATA_TYPE));

		if (filterParam != null && !filterParam.isEmpty()) {
			_applyFilter(dynamicQuery, filterParam);
		}

		return dynamicQuery;
	}

	private void _applyFilter(DynamicQuery dynamicQuery, String filter) {
		try {

			// Date range: date ge '2024-01-01' and date le '2024-12-31'

			Criterion dateFrom = _extractDateCriterion(filter, "date ge");
			Criterion dateTo = _extractDateCriterion(filter, "date le");

			if (dateFrom != null) {
				dynamicQuery.add(dateFrom);
			}

			if (dateTo != null) {
				dynamicQuery.add(dateTo);
			}

			// userName eq 'John'

			String userName = _extractStringValue(filter, "userName");

			if (userName != null) {
				dynamicQuery.add(
					RestrictionsFactoryUtil.eq("userName", userName));
			}

			// nodeName eq 'fixSpelling'

			String nodeName = _extractStringValue(filter, "nodeName");

			if (nodeName != null) {
				dynamicQuery.add(
					RestrictionsFactoryUtil.eq("kaleoNodeName", nodeName));
			}
		}
		catch (Exception exception) {
			_log.warn("Could not parse filter: " + filter, exception);
		}
	}

	private Criterion _extractDateCriterion(String filter, String operator) {
		try {
			int idx = filter.indexOf(operator);

			if (idx < 0) {
				return null;
			}

			String rest = filter.substring(idx + operator.length()).trim();
			int start = rest.indexOf('\'');
			int end = rest.indexOf('\'', start + 1);

			if (start < 0 || end < 0) {
				return null;
			}

			String dateStr = rest.substring(start + 1, end);

			Date date = FastDateFormatFactoryUtil.getSimpleDateFormat(
				"yyyy-MM-dd"
			).parse(
				dateStr.length() > 10 ? dateStr.substring(0, 10) : dateStr
			);

			if (operator.endsWith("ge")) {
				return RestrictionsFactoryUtil.ge("createDate", date);
			}

			return RestrictionsFactoryUtil.le("createDate", date);
		}
		catch (Exception exception) {
			return null;
		}
	}

	private String _extractStringValue(String filter, String field) {
		String token = field + " eq '";
		int idx = filter.indexOf(token);

		if (idx < 0) {

			// Try alternative: field in ('value')

			token = field + " in ('";
			idx = filter.indexOf(token);
		}

		if (idx < 0) {
			return null;
		}

		int start = filter.indexOf('\'', idx + field.length());
		int end = filter.indexOf('\'', start + 1);

		if (start < 0 || end < 0) {
			return null;
		}

		return filter.substring(start + 1, end);
	}

	private String _formatDuration(long durationMs) {
		if (durationMs <= 0) {
			return "-";
		}

		double seconds = durationMs / 1000.0;

		if (seconds < 10) {
			return String.format("%.1fs", seconds);
		}

		return String.format("%.0fs", seconds);
	}

	private String _getAgentName(long kaleoDefinitionVersionId) {
		try {
			KaleoDefinitionVersion kaleoDefinitionVersion =
				_kaleoDefinitionVersionLocalService.fetchKaleoDefinitionVersion(
					kaleoDefinitionVersionId);

			if (kaleoDefinitionVersion == null) {
				return null;
			}

			return kaleoDefinitionVersion.getTitle(
				contextAcceptLanguage.getPreferredLocale());
		}
		catch (Exception exception) {
			_log.error(exception);

			return null;
		}
	}

	private MetricsActivity _toMetricsActivity(
		KaleoLog kaleoLog, Map<Long, String> agentNameCache) {

		MetricsActivity metricsActivity = new MetricsActivity();

		metricsActivity.setId(kaleoLog.getKaleoLogId());
		metricsActivity.setDate(kaleoLog.getCreateDate());
		metricsActivity.setNodeName(kaleoLog.getKaleoNodeName());
		metricsActivity.setUserName(kaleoLog.getUserName());
		metricsActivity.setAgentName(
			agentNameCache.get(kaleoLog.getKaleoDefinitionVersionId()));

		String workflowContextJSON = kaleoLog.getWorkflowContext();

		if (workflowContextJSON != null) {
			try {
				JSONObject jsonObject = JSONFactoryUtil.createJSONObject(
					workflowContextJSON);

				JSONObject mapObject = jsonObject.getJSONObject("map");

				if (mapObject != null) {
					jsonObject = mapObject;
				}

				long durationMs = GetterUtil.getLong(
					jsonObject.getString("durationMs"));

				metricsActivity.setDuration(durationMs);
				metricsActivity.setDurationDisplay(
					_formatDuration(durationMs));
				metricsActivity.setInputTokensCount(
					GetterUtil.getInteger(
						jsonObject.getString("inputTokensCount")));
				metricsActivity.setOutputTokensCount(
					GetterUtil.getInteger(
						jsonObject.getString("outputTokensCount")));
				metricsActivity.setTotalTokenCount(
					GetterUtil.getInteger(
						jsonObject.getString("totalTokenCount")));
				metricsActivity.setOutput(jsonObject.getString("output"));
				metricsActivity.setPromptInput(
					jsonObject.getString("promptInput"));
				String processType = jsonObject.getString("processType");

				metricsActivity.setType(
					processType.isEmpty() ? "Agent" : processType);
				metricsActivity.setUserMessage(
					jsonObject.getString("userMessageInput"));
			}
			catch (Exception exception) {
				_log.error(exception);
			}
		}

		return metricsActivity;
	}

	private static final String _NODE_USAGE_METADATA_TYPE =
		"NODE_USAGE_METADATA";

	private static final Log _log = LogFactoryUtil.getLog(
		MetricsActivityResourceImpl.class);

	@Reference
	private KaleoDefinitionVersionLocalService
		_kaleoDefinitionVersionLocalService;

	@Reference
	private KaleoLogLocalService _kaleoLogLocalService;

}
