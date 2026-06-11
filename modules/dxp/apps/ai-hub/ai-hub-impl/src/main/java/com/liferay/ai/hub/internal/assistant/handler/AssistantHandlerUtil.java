/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.assistant.handler;

import com.liferay.ai.hub.internal.memory.ChatMemoryProviderUtil;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.util.ListUtil;
import com.liferay.portal.kernel.util.Validator;

import dev.langchain4j.data.message.ImageContent;
import dev.langchain4j.invocation.InvocationParameters;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.TokenStream;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.memory.ChatMemoryAccess;

import java.util.List;

/**
 * @author Feliphe Marinho
 */
public class AssistantHandlerUtil {

	public static void handle(AssistantHandlerContext assistantHandlerContext) {
		TokenStream tokenStream = null;

		AiServices<? extends Assistant> aiServices = AiServices.builder(
			Assistant.class);

		if (Validator.isNotNull(assistantHandlerContext.getMemoryId())) {
			aiServices = AiServices.builder(ChatMemoryAccessAssistant.class);

			aiServices.chatMemoryProvider(ChatMemoryProviderUtil::provide);
		}

		aiServices.registerListeners(
			assistantHandlerContext.getAiServiceListeners());

		if (assistantHandlerContext.getRetrievalAugmentor() != null) {
			aiServices.retrievalAugmentor(
				assistantHandlerContext.getRetrievalAugmentor());
		}

		Assistant assistant = aiServices.inputGuardrails(
			assistantHandlerContext.getInputGuardrails()
		).maxSequentialToolsInvocations(
			7
		).outputGuardrails(
			assistantHandlerContext.getOutputGuardrails()
		).streamingChatModel(
			assistantHandlerContext.getVertexAiGeminiStreamingChatModel()
		).systemMessageProvider(
			assistantHandlerContext.getSystemMessageProviderFunction()
		).toolProvider(
			assistantHandlerContext.getToolProvider()
		).tools(
			assistantHandlerContext.getTools()
		).build();

		List<ImageContent> userMessageImageContents =
			assistantHandlerContext.getUserMessageImageContents();

		if (assistant instanceof
				ChatMemoryAccessAssistant chatMemoryAccessAssistant) {

			if (ListUtil.isEmpty(userMessageImageContents)) {
				tokenStream = chatMemoryAccessAssistant.invoke(
					assistantHandlerContext.getInvocationParameters(),
					assistantHandlerContext.getMemoryId(),
					assistantHandlerContext.getUserMessage());
			}
			else {
				tokenStream = chatMemoryAccessAssistant.invoke(
					assistantHandlerContext.getInvocationParameters(),
					assistantHandlerContext.getMemoryId(),
					_getUserMessage(assistantHandlerContext),
					userMessageImageContents);
			}
		}
		else if (ListUtil.isEmpty(userMessageImageContents)) {
			tokenStream = assistant.invoke(
				assistantHandlerContext.getInvocationParameters(),
				assistantHandlerContext.getUserMessage());
		}
		else {
			tokenStream = assistant.invoke(
				assistantHandlerContext.getInvocationParameters(),
				_getUserMessage(assistantHandlerContext),
				userMessageImageContents);
		}

		tokenStream.onCompleteResponse(
			assistantHandlerContext.getOnCompleteResponseConsumer()
		).onError(
			assistantHandlerContext.getOnErrorConsumer()
		).start();
	}

	public interface Assistant {

		public TokenStream invoke(
			InvocationParameters invocationParameters,
			@UserMessage String userMessage);

		public TokenStream invoke(
			InvocationParameters invocationParameters,
			@UserMessage String userMessage,
			@UserMessage List<ImageContent> imageContents);

	}

	public interface ChatMemoryAccessAssistant
		extends Assistant, ChatMemoryAccess {

		public TokenStream invoke(
			InvocationParameters invocationParameters,
			@MemoryId String memoryId, @UserMessage String userMessage);

		public TokenStream invoke(
			InvocationParameters invocationParameters,
			@MemoryId String memoryId, @UserMessage String userMessage,
			@UserMessage List<ImageContent> imageContents);

	}

	private static String _getUserMessage(
		AssistantHandlerContext assistantHandlerContext) {

		String userMessage = assistantHandlerContext.getUserMessage();

		if (Validator.isNull(userMessage)) {
			return StringPool.PERIOD;
		}

		return userMessage;
	}

}