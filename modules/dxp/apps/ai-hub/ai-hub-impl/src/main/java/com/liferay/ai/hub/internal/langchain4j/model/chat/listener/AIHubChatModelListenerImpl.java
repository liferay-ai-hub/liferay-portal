/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.langchain4j.model.chat.listener;

import com.liferay.ai.hub.quota.QuotaManager;
import com.liferay.ai.hub.quota.Source;
import com.liferay.ai.hub.quota.Usage;
import com.liferay.petra.string.StringBundler;
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
 * @author Carolina Barbosa
 */
public class AIHubChatModelListenerImpl implements ChatModelListener {

	public AIHubChatModelListenerImpl(
		String source, QuotaManager quotaManager,
		ServiceContext serviceContext) {

		_source = source;
		_quotaManager = quotaManager;

		_companyId = serviceContext.getCompanyId();
		_userId = serviceContext.getUserId();
	}

	@Override
	public void onResponse(ChatModelResponseContext chatModelResponseContext) {
		ChatResponse chatResponse = chatModelResponseContext.chatResponse();

		// LPD-97532 diagnostic logging (temporary): trace whether the metering
		// listener fires per source, whether usage is present, and which
		// QuotaManager is bound. Remove once the UAT root cause is confirmed.

		if (_log.isInfoEnabled()) {
			_log.info(
				StringBundler.concat(
					"[LPD-97532] onResponse source=", _source, " companyId=",
					_companyId, " userId=", _userId, " quotaManager=",
					_quotaManager.getClass(
					).getName(),
					" chatResponseNull=", chatResponse == null));
		}

		if (chatResponse == null) {
			return;
		}

		TokenUsage tokenUsage = chatResponse.tokenUsage();

		if (tokenUsage == null) {
			if (_log.isWarnEnabled()) {
				_log.warn(
					StringBundler.concat(
						"[LPD-97532] source=", _source,
						" skipping quota update: tokenUsage is null"));
			}

			return;
		}

		if (_log.isInfoEnabled()) {
			_log.info(
				StringBundler.concat(
					"[LPD-97532] source=", _source,
					" updating quota inputTokens=", tokenUsage.inputTokenCount(),
					" outputTokens=", tokenUsage.outputTokenCount()));
		}

		try {
			_quotaManager.updateUsage(
				_companyId,
				Usage.builder(
				).source(
					Source.VERTEX_INPUT
				).tokenCount(
					GetterUtil.getLong(tokenUsage.inputTokenCount())
				).build(),
				_userId);
			_quotaManager.updateUsage(
				_companyId,
				Usage.builder(
				).source(
					Source.VERTEX_OUTPUT
				).tokenCount(
					GetterUtil.getLong(tokenUsage.outputTokenCount())
				).build(),
				_userId);
		}
		catch (PortalException portalException) {
			_log.error(
				StringBundler.concat(
					"[LPD-97532] source=", _source,
					" updateUsage failed for companyId=", _companyId, " userId=",
					_userId),
				portalException);
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(
		AIHubChatModelListenerImpl.class);

	private final long _companyId;
	private final QuotaManager _quotaManager;
	private final String _source;
	private final long _userId;

}