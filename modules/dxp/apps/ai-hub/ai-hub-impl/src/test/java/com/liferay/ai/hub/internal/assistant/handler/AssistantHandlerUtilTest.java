/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.assistant.handler;

import com.liferay.portal.test.rule.LiferayUnitTestRule;

import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.Content;
import dev.langchain4j.data.message.ImageContent;
import dev.langchain4j.data.message.TextContent;
import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.invocation.InvocationParameters;
import dev.langchain4j.model.chat.request.ChatRequest;
import dev.langchain4j.model.chat.request.DefaultChatRequestParameters;
import dev.langchain4j.model.chat.response.ChatResponse;
import dev.langchain4j.model.chat.response.StreamingChatResponseHandler;
import dev.langchain4j.model.vertexai.gemini.VertexAiGeminiStreamingChatModel;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;

import org.mockito.Mockito;

/**
 * @author Marcos Castro
 */
public class AssistantHandlerUtilTest {

	@ClassRule
	@Rule
	public static final LiferayUnitTestRule liferayUnitTestRule =
		LiferayUnitTestRule.INSTANCE;

	@Before
	public void setUp() {
		Mockito.when(
			_vertexAiGeminiStreamingChatModel.defaultRequestParameters()
		).thenReturn(
			DefaultChatRequestParameters.builder().build()
		);

		Mockito.doAnswer(
			invocation -> {
				_chatRequestAtomicReference.set(invocation.getArgument(0));

				StreamingChatResponseHandler streamingChatResponseHandler =
					invocation.getArgument(1);

				streamingChatResponseHandler.onCompleteResponse(
					ChatResponse.builder(
					).aiMessage(
						AiMessage.from("an alternative text")
					).build());

				return null;
			}
		).when(
			_vertexAiGeminiStreamingChatModel
		).chat(
			Mockito.any(ChatRequest.class),
			Mockito.any(StreamingChatResponseHandler.class)
		);
	}

	@Test
	public void testHandle() throws Exception {
		_handle(List.of());

		UserMessage userMessage = _getUserMessage();

		Assert.assertEquals(
			"Propose the alternative text for the attached image.",
			userMessage.singleText());
	}

	@Test
	public void testHandleWithUserMessageImageContents() throws Exception {
		_handle(List.of(ImageContent.from("iVBORw0KGgo=", "image/png")));

		UserMessage userMessage = _getUserMessage();

		List<Content> contents = userMessage.contents();

		Assert.assertEquals(contents.toString(), 2, contents.size());

		TextContent textContent = (TextContent)contents.get(0);

		Assert.assertEquals(
			"Propose the alternative text for the attached image.",
			textContent.text());

		ImageContent imageContent = (ImageContent)contents.get(1);

		Assert.assertEquals(
			ImageContent.from("iVBORw0KGgo=", "image/png"), imageContent);
	}

	private UserMessage _getUserMessage() {
		ChatRequest chatRequest = _chatRequestAtomicReference.get();

		Assert.assertNotNull(chatRequest);

		List<ChatMessage> chatMessages = chatRequest.messages();

		ChatMessage chatMessage = chatMessages.get(chatMessages.size() - 1);

		return (UserMessage)chatMessage;
	}

	private void _handle(List<ImageContent> userMessageImageContents)
		throws Exception {

		AtomicReference<Throwable> throwableAtomicReference =
			new AtomicReference<>();

		CountDownLatch countDownLatch = new CountDownLatch(1);

		AssistantHandlerUtil.handle(
			AssistantHandlerContext.builder(
			).aiServiceListeners(
				List.of()
			).inputGuardrails(
				List.of()
			).invocationParameters(
				InvocationParameters.from(Map.of())
			).onCompleteResponseConsumer(
				chatResponse -> countDownLatch.countDown()
			).onErrorConsumer(
				throwable -> {
					throwableAtomicReference.set(throwable);

					countDownLatch.countDown();
				}
			).outputGuardrails(
				List.of()
			).systemMessageProviderFunction(
				memoryId -> "You are a web accessibility specialist."
			).userMessage(
				"Propose the alternative text for the attached image."
			).userMessageImageContents(
				userMessageImageContents
			).vertexAiGeminiStreamingChatModel(
				_vertexAiGeminiStreamingChatModel
			).build());

		Assert.assertTrue(countDownLatch.await(10, TimeUnit.SECONDS));

		Throwable throwable = throwableAtomicReference.get();

		Assert.assertNull(String.valueOf(throwable), throwable);
	}

	private final AtomicReference<ChatRequest> _chatRequestAtomicReference =
		new AtomicReference<>();
	private final VertexAiGeminiStreamingChatModel
		_vertexAiGeminiStreamingChatModel = Mockito.mock(
			VertexAiGeminiStreamingChatModel.class);

}
