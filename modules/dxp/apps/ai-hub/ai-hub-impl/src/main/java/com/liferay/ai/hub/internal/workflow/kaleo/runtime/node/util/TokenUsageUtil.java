/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.workflow.kaleo.runtime.node.util;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.CountTokensResponse;
import com.google.cloud.vertexai.generativeai.GenerativeModel;

import com.liferay.account.model.AccountEntry;
import com.liferay.ai.hub.internal.configuration.VertexAIConfiguration;
import com.liferay.ai.hub.util.AccountEntryUtil;
import com.liferay.object.model.ObjectDefinition;
import com.liferay.object.model.ObjectEntry;
import com.liferay.object.service.ObjectDefinitionLocalServiceUtil;
import com.liferay.object.service.ObjectEntryLocalServiceUtil;
import com.liferay.petra.string.StringBundler;
import com.liferay.portal.configuration.module.configuration.ConfigurationProviderUtil;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.HashMapBuilder;

import dev.langchain4j.model.chat.listener.ChatModelListener;
import dev.langchain4j.model.chat.listener.ChatModelRequestContext;
import dev.langchain4j.model.chat.listener.ChatModelResponseContext;
import dev.langchain4j.model.chat.response.ChatResponse;
import dev.langchain4j.model.output.TokenUsage;

import java.io.IOException;
import java.io.Serializable;

import java.util.List;
import java.util.Map;

/**
 * @author João Victor Alves
 */
public class TokenUsageUtil {

	public static int computeMaxOutputTokens(
			long companyId, long userId, String inputMessage)
		throws PortalException {

		AccountEntry accountEntry = _getUserAccountEntry(userId);

		ObjectEntry limitObjectEntry = _fetchLimitObjectEntry(
			companyId, accountEntry.getExternalReferenceCode());

		Map<String, Serializable> values = limitObjectEntry.getValues();

		int maxTokens = GetterUtil.getInteger(values.get("maxTokens"));

		int tokensUsed = GetterUtil.getInteger(values.get("tokensUsed"));

		int inputTokens = _countInputTokens(companyId, inputMessage);

		int remainingMaxOutputTokens = maxTokens - tokensUsed - inputTokens;

		if (remainingMaxOutputTokens <= 0) {
			throw new PortalException(
				StringBundler.concat(
					"Input tokens (", inputTokens,
					") exceed remaining token budget (", maxTokens - tokensUsed,
					")."));
		}

		return remainingMaxOutputTokens;
	}

	public static List<ChatModelListener> createTokenUsageListeners(
			long companyId, long userId, String inputMessage)
		throws PortalException {

		return List.of(
			new TokenUsageListener(
				companyId, _getUserAccountEntry(userId), inputMessage));
	}

	private static void _assertTokenUsageLimit(
			long companyId, String externalReferenceCode, String inputMessage)
		throws PortalException {

		ObjectEntry limitObjectEntry = _fetchLimitObjectEntry(
			companyId, externalReferenceCode);

		Map<String, Serializable> values = limitObjectEntry.getValues();

		long maxTokens = GetterUtil.getLong(values.get("maxTokens"));

		long inputTokens = _countInputTokens(companyId, inputMessage);

		long tokensUsed = GetterUtil.getLong(values.get("tokensUsed"));

		if ((tokensUsed + inputTokens) >= maxTokens) {
			throw new PortalException(
				StringBundler.concat(
					"Token usage limit (", maxTokens, ") reached."));
		}
	}

	private static int _countInputTokens(long companyId, String inputMessage)
		throws PortalException {

		VertexAIConfiguration vertexAIConfiguration =
			ConfigurationProviderUtil.getCompanyConfiguration(
				VertexAIConfiguration.class, companyId);

		try (VertexAI vertexAI = new VertexAI(
				vertexAIConfiguration.projectId(),
				vertexAIConfiguration.location())) {

			GenerativeModel generativeModel = new GenerativeModel(
				vertexAIConfiguration.modelName(), vertexAI);

			CountTokensResponse countTokensResponse =
				generativeModel.countTokens(inputMessage);

			return countTokensResponse.getTotalTokens();
		}
		catch (IOException ioException) {
			throw new PortalException(ioException);
		}
	}

	private static ObjectEntry _fetchLimitObjectEntry(
		long companyId, String externalReferenceCode) {

		ObjectDefinition objectDefinition =
			ObjectDefinitionLocalServiceUtil.
				fetchObjectDefinitionByExternalReferenceCode(
					"L_AI_HUB_TOKEN_USAGE_LIMIT", companyId);

		return ObjectEntryLocalServiceUtil.fetchObjectEntry(
			"TOKEN_LIMIT-" + externalReferenceCode, 0,
			objectDefinition.getObjectDefinitionId());
	}

	private static AccountEntry _getUserAccountEntry(long userId)
		throws PortalException {

		try {
			return AccountEntryUtil.getUserAccountEntry(userId);
		}
		catch (Exception exception) {
			throw new PortalException(exception);
		}
	}

	private static void _recordUsage(
		AccountEntry accountEntry, long companyId, int inputTokens,
		int outputTokens) {

		try {
			ObjectEntry limitObjectEntry = _fetchLimitObjectEntry(
				companyId, accountEntry.getExternalReferenceCode());

			Map<String, Serializable> values = limitObjectEntry.getValues();

			long currentTokensUsed = GetterUtil.getLong(
				values.get("tokensUsed"));

			Map<String, Serializable> updatedValues =
				HashMapBuilder.<String, Serializable>putAll(
					values
				).put(
					"tokensUsed", currentTokensUsed + inputTokens + outputTokens
				).build();

			ObjectEntryLocalServiceUtil.updateObjectEntry(
				limitObjectEntry.getUserId(),
				limitObjectEntry.getObjectEntryId(), 0, updatedValues,
				new ServiceContext());
		}
		catch (Exception exception) {
			if (_log.isWarnEnabled()) {
				_log.warn(
					"Unable to record token usage for account " +
						accountEntry.getExternalReferenceCode(),
					exception);
			}
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(TokenUsageUtil.class);

	private static class TokenUsageListener implements ChatModelListener {

		@Override
		public void onRequest(ChatModelRequestContext chatModelRequestContext) {
			try {
				_assertTokenUsageLimit(
					_companyId, _accountEntry.getExternalReferenceCode(),
					_inputMessage);
			}
			catch (PortalException portalException) {
				throw new RuntimeException(portalException);
			}
		}

		@Override
		public void onResponse(
			ChatModelResponseContext chatModelResponseContext) {

			ChatResponse chatResponse = chatModelResponseContext.chatResponse();

			TokenUsage tokenUsage = chatResponse.tokenUsage();

			_recordUsage(
				_accountEntry, _companyId, tokenUsage.inputTokenCount(),
				tokenUsage.outputTokenCount());
		}

		private TokenUsageListener(
			long companyId, AccountEntry accountEntry, String inputMessage) {

			_companyId = companyId;
			_accountEntry = accountEntry;
			_inputMessage = inputMessage;
		}

		private final AccountEntry _accountEntry;
		private final long _companyId;
		private final String _inputMessage;

	}

}