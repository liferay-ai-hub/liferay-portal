/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.workflow.kaleo.runtime.node.util;

import com.liferay.portal.kernel.audit.AuditMessage;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.security.audit.storage.service.AuditEventLocalServiceUtil;
import com.liferay.portal.workflow.kaleo.model.KaleoInstanceToken;
import com.liferay.portal.workflow.kaleo.service.KaleoLogLocalServiceUtil;

import dev.langchain4j.model.chat.response.ChatResponse;
import dev.langchain4j.model.chat.response.ChatResponseMetadata;
import dev.langchain4j.model.output.TokenUsage;

import java.io.Serializable;

/**
 * @author João Victor Alves
 */
public class KaleoLogUtil {

	public static void addErrorKaleoLog(
		String errorMessage, KaleoInstanceToken kaleoInstanceToken,
		String processType, ServiceContext serviceContext, String nodeName,
		String userMessage) {

		try {
			KaleoLogLocalServiceUtil.addNodeUsageMetadataKaleoLog(
				kaleoInstanceToken,
				HashMapBuilder.<String, Serializable>put(
					"error", "true"
				).put(
					"errorMessage", errorMessage
				).put(
					"processType", processType
				).put(
					"userMessageInput", userMessage
				).build(),
				serviceContext);
		}
		catch (PortalException portalException) {
			_log.error(portalException);
		}

		try {
			JSONObject additionalInfo = JSONFactoryUtil.createJSONObject();

			additionalInfo.put("error", "true");
			additionalInfo.put("errorMessage", errorMessage);
			additionalInfo.put("nodeName", nodeName);
			additionalInfo.put("userMessageInput", userMessage);

			AuditEventLocalServiceUtil.addAuditEvent(
				new AuditMessage(
					"ERROR", serviceContext.getCompanyId(),
					serviceContext.getUserId(),
					kaleoInstanceToken.getUserName(), _AI_HUB_CLASS_NAME,
					String.valueOf(kaleoInstanceToken.getKaleoInstanceId()),
					null, additionalInfo));
		}
		catch (Exception exception) {
			_log.error(exception);
		}
	}

	public static void addNodeUsageKaleoLog(
		ChatResponse chatResponse, long durationMs,
		KaleoInstanceToken kaleoInstanceToken, String nodeName, String output,
		String processType, String prompt, ServiceContext serviceContext,
		String userMessage) {

		ChatResponseMetadata chatResponseMetadata = chatResponse.metadata();

		TokenUsage tokenUsage = chatResponseMetadata.tokenUsage();

		try {
			KaleoLogLocalServiceUtil.addNodeUsageMetadataKaleoLog(
				kaleoInstanceToken,
				HashMapBuilder.<String, Serializable>put(
					"durationMs", String.valueOf(durationMs)
				).put(
					"inputTokensCount",
					String.valueOf(tokenUsage.inputTokenCount())
				).put(
					"output", output
				).put(
					"outputTokensCount",
					String.valueOf(tokenUsage.outputTokenCount())
				).put(
					"processType", processType
				).put(
					"promptInput", prompt
				).put(
					"totalTokenCount",
					String.valueOf(tokenUsage.totalTokenCount())
				).put(
					"userMessageInput", userMessage
				).build(),
				serviceContext);
		}
		catch (PortalException portalException) {
			_log.error(portalException);
		}

		try {
			JSONObject additionalInfo = JSONFactoryUtil.createJSONObject();

			additionalInfo.put(
				"durationMs", String.valueOf(durationMs));
			additionalInfo.put(
				"inputTokensCount",
				String.valueOf(tokenUsage.inputTokenCount()));
			additionalInfo.put("nodeName", nodeName);
			additionalInfo.put(
				"outputTokensCount",
				String.valueOf(tokenUsage.outputTokenCount()));
			additionalInfo.put(
				"totalTokenCount",
				String.valueOf(tokenUsage.totalTokenCount()));
			additionalInfo.put("userMessageInput", userMessage);

			AuditEventLocalServiceUtil.addAuditEvent(
				new AuditMessage(
					"EXECUTE", serviceContext.getCompanyId(),
					serviceContext.getUserId(),
					kaleoInstanceToken.getUserName(), _AI_HUB_CLASS_NAME,
					String.valueOf(kaleoInstanceToken.getKaleoInstanceId()),
					null, additionalInfo));
		}
		catch (Exception exception) {
			_log.error(exception);
		}
	}

	private static final String _AI_HUB_CLASS_NAME =
		"com.liferay.ai.hub.LLMInteraction";

	private static final Log _log = LogFactoryUtil.getLog(KaleoLogUtil.class);

}