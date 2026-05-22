/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.web.internal.servlet;

import com.liferay.portal.kernel.dao.orm.DynamicQuery;
import com.liferay.portal.kernel.dao.orm.OrderFactoryUtil;
import com.liferay.portal.kernel.dao.orm.QueryUtil;
import com.liferay.portal.kernel.dao.orm.RestrictionsFactoryUtil;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.Portal;
import com.liferay.portal.workflow.kaleo.model.KaleoLog;
import com.liferay.portal.workflow.kaleo.service.KaleoLogLocalService;

import jakarta.servlet.Servlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.List;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Eugenio Ortiz
 */
@Component(
	property = {
		"osgi.http.whiteboard.servlet.name=com.liferay.ai.hub.web.internal.servlet.AIHubAuditExportServlet",
		"osgi.http.whiteboard.servlet.pattern=/ai-hub-audit-export"
	},
	service = Servlet.class
)
public class AIHubAuditExportServlet extends HttpServlet {

	@Override
	protected void doGet(
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse)
		throws IOException {

		try {
			User user = _portal.getUser(httpServletRequest);

			if ((user == null) || user.isDefaultUser()) {
				httpServletResponse.sendError(
					HttpServletResponse.SC_UNAUTHORIZED);

				return;
			}

			long companyId = _portal.getCompanyId(httpServletRequest);

			DynamicQuery dynamicQuery = _kaleoLogLocalService.dynamicQuery();

			dynamicQuery.add(
				RestrictionsFactoryUtil.eq("companyId", companyId));
			dynamicQuery.add(
				RestrictionsFactoryUtil.eq("type", _NODE_USAGE_METADATA_TYPE));
			dynamicQuery.addOrder(OrderFactoryUtil.desc("createDate"));

			List<KaleoLog> kaleoLogs = _kaleoLogLocalService.dynamicQuery(
				dynamicQuery, QueryUtil.ALL_POS, QueryUtil.ALL_POS);

			SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
			SimpleDateFormat fileNameFormat = new SimpleDateFormat("yyyy-MM-dd");

			String fileName =
				"ai-hub-audit-" + fileNameFormat.format(new Date()) + ".csv";

			httpServletResponse.setContentType("text/csv; charset=UTF-8");
			httpServletResponse.setHeader(
				"Content-Disposition",
				"attachment; filename=\"" + fileName + "\"");

			PrintWriter writer = httpServletResponse.getWriter();

			writer.println(
				"Date,User,Node,User Message,Input Tokens,Output Tokens," +
					"Total Tokens,Duration (ms),Error");

			for (KaleoLog kaleoLog : kaleoLogs) {
				String workflowContext = kaleoLog.getWorkflowContext();

				JSONObject ctx = JSONFactoryUtil.createJSONObject("{}");

				if (workflowContext != null) {
					JSONObject jsonObject = JSONFactoryUtil.createJSONObject(
						workflowContext);

					JSONObject mapObject = jsonObject.getJSONObject("map");

					ctx = (mapObject != null) ? mapObject : jsonObject;
				}

				boolean isError = "true".equals(ctx.getString("error"));

				writer.println(
					_toCsvRow(
						dateFormat.format(kaleoLog.getCreateDate()),
						kaleoLog.getUserName(),
						kaleoLog.getKaleoNodeName(),
						ctx.getString("userMessageInput"),
						isError ? "-" : String.valueOf(
							GetterUtil.getInteger(
								ctx.getString("inputTokensCount"))),
						isError ? "-" : String.valueOf(
							GetterUtil.getInteger(
								ctx.getString("outputTokensCount"))),
						isError ? "-" : String.valueOf(
							GetterUtil.getInteger(
								ctx.getString("totalTokenCount"))),
						isError ? "-" : ctx.getString("durationMs"),
						isError ? ctx.getString("errorMessage") : ""));
			}

			writer.flush();
		}
		catch (Exception exception) {
			_log.error(exception);

			httpServletResponse.sendError(
				HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	private String _csvEscape(String value) {
		if (value == null) {
			return "\"\"";
		}

		return "\"" + value.replace("\"", "\"\"") + "\"";
	}

	private String _toCsvRow(String... values) {
		StringBuilder sb = new StringBuilder();

		for (int i = 0; i < values.length; i++) {
			if (i > 0) {
				sb.append(',');
			}

			sb.append(_csvEscape(values[i]));
		}

		return sb.toString();
	}

	private static final String _NODE_USAGE_METADATA_TYPE =
		"NODE_USAGE_METADATA";

	private static final Log _log = LogFactoryUtil.getLog(
		AIHubAuditExportServlet.class);

	@Reference
	private KaleoLogLocalService _kaleoLogLocalService;

	@Reference
	private Portal _portal;

}
