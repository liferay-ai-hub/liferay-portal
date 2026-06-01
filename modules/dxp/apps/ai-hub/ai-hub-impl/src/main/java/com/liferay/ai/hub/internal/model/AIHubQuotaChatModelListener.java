/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.model;

import com.liferay.ai.hub.quota.QuotaManager;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;

import dev.langchain4j.model.chat.listener.ChatModelErrorContext;
import dev.langchain4j.model.chat.listener.ChatModelListener;
import dev.langchain4j.model.chat.listener.ChatModelResponseContext;
import dev.langchain4j.model.chat.response.ChatResponse;
import dev.langchain4j.model.output.TokenUsage;

/**
 * @author Guilherme Camacho
 */
public class AIHubQuotaChatModelListener implements ChatModelListener {

	public AIHubQuotaChatModelListener(
		long companyId, long preDebitedTokens, long userId,
		QuotaManager quotaManager) {

		_companyId = companyId;
		_preDebitedTokens = preDebitedTokens;
		_userId = userId;
		_quotaManager = quotaManager;
	}

	@Override
	public void onError(ChatModelErrorContext chatModelErrorContext) {
		_log.error(chatModelErrorContext.error());

		if (_preDebitedTokens <= 0L) {
			return;
		}

		try {
			_quotaManager.updateUsage(
				_companyId, 0, 0, _preDebitedTokens, _userId);
		}
		catch (PortalException portalException) {
			_log.error(portalException);
		}
	}

	@Override
	public void onResponse(ChatModelResponseContext chatModelResponseContext) {
		ChatResponse chatResponse = chatModelResponseContext.chatResponse();

		if (chatResponse == null) {
			return;
		}

		TokenUsage tokenUsage = chatResponse.tokenUsage();

		if (tokenUsage == null) {
			return;
		}

		Integer inputTokenCount = tokenUsage.inputTokenCount();
		Integer totalTokenCount = tokenUsage.totalTokenCount();

		if ((inputTokenCount == null) || (totalTokenCount == null)) {
			return;
		}

		try {
			_quotaManager.updateUsage(
				_companyId, inputTokenCount.intValue(),
				totalTokenCount.intValue() - inputTokenCount.intValue(),
				_preDebitedTokens, _userId);
		}
		catch (PortalException portalException) {
			_log.error(portalException);
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(
		AIHubQuotaChatModelListener.class);

	private final long _companyId;
	private final long _preDebitedTokens;
	private final QuotaManager _quotaManager;
	private final long _userId;

}