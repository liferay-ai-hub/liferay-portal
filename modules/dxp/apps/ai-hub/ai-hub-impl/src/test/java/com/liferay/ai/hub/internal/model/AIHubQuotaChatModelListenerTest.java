/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.model;

import com.liferay.ai.hub.quota.QuotaManager;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.test.rule.LiferayUnitTestRule;

import dev.langchain4j.model.chat.listener.ChatModelErrorContext;
import dev.langchain4j.model.chat.listener.ChatModelResponseContext;
import dev.langchain4j.model.chat.response.ChatResponse;
import dev.langchain4j.model.output.TokenUsage;

import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;

import org.mockito.Mockito;

/**
 * @author Guilherme Camacho
 */
public class AIHubQuotaChatModelListenerTest {

	@ClassRule
	@Rule
	public static final LiferayUnitTestRule liferayUnitTestRule =
		LiferayUnitTestRule.INSTANCE;

	@Test
	public void testOnErrorRefundsPreDebit() throws Exception {
		QuotaManager quotaManager = Mockito.mock(QuotaManager.class);

		long preDebitedTokens = 200L;

		AIHubQuotaChatModelListener aiHubQuotaChatModelListener =
			new AIHubQuotaChatModelListener(
				_COMPANY_ID, preDebitedTokens, _USER_ID, quotaManager);

		ChatModelErrorContext chatModelErrorContext = Mockito.mock(
			ChatModelErrorContext.class);

		Mockito.when(
			chatModelErrorContext.error()
		).thenReturn(
			new RuntimeException()
		);

		aiHubQuotaChatModelListener.onError(chatModelErrorContext);

		Mockito.verify(
			quotaManager
		).updateUsage(
			_COMPANY_ID, 0, 0, preDebitedTokens, _USER_ID
		);
	}

	@Test
	public void testOnErrorWithoutPreDebitDoesNothing() throws Exception {
		QuotaManager quotaManager = Mockito.mock(QuotaManager.class);

		AIHubQuotaChatModelListener aiHubQuotaChatModelListener =
			new AIHubQuotaChatModelListener(
				_COMPANY_ID, 0L, _USER_ID, quotaManager);

		ChatModelErrorContext chatModelErrorContext = Mockito.mock(
			ChatModelErrorContext.class);

		Mockito.when(
			chatModelErrorContext.error()
		).thenReturn(
			new RuntimeException()
		);

		aiHubQuotaChatModelListener.onError(chatModelErrorContext);

		Mockito.verifyNoInteractions(quotaManager);
	}

	@Test
	public void testOnResponseReconcilesUsage() throws Exception {
		QuotaManager quotaManager = Mockito.mock(QuotaManager.class);

		long preDebitedTokens = 200L;

		AIHubQuotaChatModelListener aiHubQuotaChatModelListener =
			new AIHubQuotaChatModelListener(
				_COMPANY_ID, preDebitedTokens, _USER_ID, quotaManager);

		TokenUsage tokenUsage = Mockito.mock(TokenUsage.class);

		Mockito.when(
			tokenUsage.inputTokenCount()
		).thenReturn(
			180
		);

		Mockito.when(
			tokenUsage.totalTokenCount()
		).thenReturn(
			320
		);

		ChatResponse chatResponse = Mockito.mock(ChatResponse.class);

		Mockito.when(
			chatResponse.tokenUsage()
		).thenReturn(
			tokenUsage
		);

		ChatModelResponseContext chatModelResponseContext = Mockito.mock(
			ChatModelResponseContext.class);

		Mockito.when(
			chatModelResponseContext.chatResponse()
		).thenReturn(
			chatResponse
		);

		aiHubQuotaChatModelListener.onResponse(chatModelResponseContext);

		Mockito.verify(
			quotaManager
		).updateUsage(
			_COMPANY_ID, 180, 140, preDebitedTokens, _USER_ID
		);
	}

	private static final long _COMPANY_ID = RandomTestUtil.randomLong();

	private static final long _USER_ID = RandomTestUtil.randomLong();

}