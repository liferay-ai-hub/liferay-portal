/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.langchain4j.model.image;

import com.google.genai.Client;
import com.google.genai.types.Blob;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.GenerateContentResponseUsageMetadata;
import com.google.genai.types.Part;

import com.liferay.ai.hub.configuration.VertexAIConfiguration;
import com.liferay.ai.hub.internal.model.GoogleGenAiUtil;
import com.liferay.petra.reflect.ReflectionUtil;
import com.liferay.portal.configuration.module.configuration.ConfigurationProviderUtil;
import com.liferay.portal.kernel.module.configuration.ConfigurationException;

import dev.langchain4j.data.image.Image;
import dev.langchain4j.model.image.ImageModel;
import dev.langchain4j.model.output.Response;
import dev.langchain4j.model.output.TokenUsage;

import java.util.Base64;
import java.util.List;

/**
 * @author Feliphe Marinho
 */
public class GoogleGenAiImageModel implements ImageModel {

	public GoogleGenAiImageModel(
			long companyId, String modelLocation, String modelName)
		throws ConfigurationException {

		VertexAIConfiguration vertexAIConfiguration =
			ConfigurationProviderUtil.getCompanyConfiguration(
				VertexAIConfiguration.class, companyId);

		_modelLocation = modelLocation;
		_modelName = modelName;

		_projectId = vertexAIConfiguration.projectId();
	}

	@Override
	public Response<Image> generate(String prompt) {
		try (Client client = Client.builder(
			).location(
				_modelLocation
			).project(
				_projectId
			).vertexAI(
				true
			).build()) {

			GenerateContentResponse generateContentResponse =
				client.models.generateContent(
					_modelName,
					List.of(
						Content.builder(
						).parts(
							List.of(Part.fromText(prompt))
						).role(
							"user"
						).build()),
					GenerateContentConfig.builder(
					).responseModalities(
						List.of("IMAGE")
					).safetySettings(
						GoogleGenAiUtil.getSafetySettings()
					).build());

			return Response.from(
				_toImage(generateContentResponse),
				_toTokenUsage(generateContentResponse));
		}
		catch (Exception exception) {
			return ReflectionUtil.throwException(exception);
		}
	}

	private Image _toImage(GenerateContentResponse generateContentResponse) {
		for (Part part : generateContentResponse.parts()) {
			Blob blob = part.inlineData(
			).orElse(
				null
			);

			if (blob == null) {
				continue;
			}

			byte[] data = blob.data(
			).orElse(
				null
			);

			if (data == null) {
				continue;
			}

			Base64.Encoder encoder = Base64.getEncoder();

			return Image.builder(
			).base64Data(
				encoder.encodeToString(data)
			).mimeType(
				blob.mimeType(
				).orElse(
					"image/png"
				)
			).build();
		}

		throw new IllegalStateException("The model returned no image");
	}

	private TokenUsage _toTokenUsage(
		GenerateContentResponse generateContentResponse) {

		GenerateContentResponseUsageMetadata usageMetadata =
			generateContentResponse.usageMetadata(
			).orElse(
				null
			);

		if (usageMetadata == null) {
			return null;
		}

		return new TokenUsage(
			usageMetadata.promptTokenCount(
			).orElse(
				null
			),
			usageMetadata.candidatesTokenCount(
			).orElse(
				null
			),
			usageMetadata.totalTokenCount(
			).orElse(
				null
			));
	}

	private final String _modelLocation;
	private final String _modelName;
	private final String _projectId;

}