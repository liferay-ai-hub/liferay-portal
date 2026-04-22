/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.model;

import com.liferay.ai.hub.internal.configuration.VertexAIConfiguration;
import com.liferay.portal.configuration.module.configuration.ConfigurationProviderUtil;
import com.liferay.portal.kernel.module.configuration.ConfigurationException;

import dev.langchain4j.model.chat.listener.ChatModelListener;
import dev.langchain4j.model.vertexai.gemini.VertexAiGeminiStreamingChatModel;

import java.util.List;

/**
 * @author João Victor Alves
 */
public class VertexAiGeminiStreamingChatModelUtil {

	public static VertexAiGeminiStreamingChatModel create(
			List<ChatModelListener> chatModelListeners, long companyId,
			int maxOutputTokens)
		throws ConfigurationException {

		VertexAIConfiguration vertexAIConfiguration =
			ConfigurationProviderUtil.getCompanyConfiguration(
				VertexAIConfiguration.class, companyId);

		return VertexAiGeminiStreamingChatModel.builder(
		).listeners(
			chatModelListeners
		).location(
			vertexAIConfiguration.location()
		).maxOutputTokens(
			maxOutputTokens
		).modelName(
			vertexAIConfiguration.modelName()
		).project(
			vertexAIConfiguration.projectId()
		).build();
	}

}