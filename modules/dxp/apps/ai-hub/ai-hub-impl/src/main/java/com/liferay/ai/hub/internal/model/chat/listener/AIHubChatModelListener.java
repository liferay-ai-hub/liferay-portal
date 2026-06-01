/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.model.chat.listener;

import com.liferay.ai.hub.quota.QuotaManager;
import com.liferay.ai.hub.quota.Source;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.GetterUtil;

import dev.langchain4j.model.chat.listener.ChatModelListener;
import dev.langchain4j.model.chat.listener.ChatModelResponseContext;
import dev.langchain4j.model.chat.response.ChatResponse;
import dev.langchain4j.model.output.TokenUsage;

/**
 * @author Guilherme Camacho
 */
public class AIHubChatModelListener implements ChatModelListener {

	public AIHubChatModelListener(
		QuotaManager quotaManager, ServiceContext serviceContext) {

		_quotaManager = quotaManager;

		_companyId = serviceContext.getCompanyId();
		_userId = serviceContext.getUserId();
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

		try {
			_quotaManager.updateUsage(
				_companyId, Source.VERTEX_INPUT,
				GetterUtil.getInteger(tokenUsage.inputTokenCount()), _userId);
			_quotaManager.updateUsage(
				_companyId, Source.VERTEX_OUTPUT,
				GetterUtil.getInteger(tokenUsage.outputTokenCount()), _userId);
		}
		catch (PortalException portalException) {
			_log.error(portalException);
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(
		AIHubChatModelListener.class);

	private final long _companyId;
	private final QuotaManager _quotaManager;
	private final long _userId;

}