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
import com.google.genai.types.SafetySetting;

import com.liferay.ai.hub.configuration.VertexAIConfiguration;
import com.liferay.ai.hub.quota.QuotaManager;
import com.liferay.ai.hub.quota.Source;
import com.liferay.ai.hub.quota.Usage;
import com.liferay.petra.reflect.ReflectionUtil;
import com.liferay.portal.configuration.module.configuration.ConfigurationProviderUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.module.configuration.ConfigurationException;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.GetterUtil;

import dev.langchain4j.data.image.Image;
import dev.langchain4j.model.image.ImageModel;
import dev.langchain4j.model.output.Response;
import dev.langchain4j.model.output.TokenUsage;

import java.util.Base64;
import java.util.List;

/**
 * @author Feliphe Marinho
 * @author Mario Gomes
 */
public class GoogleGenAiImageModel implements ImageModel {

	public GoogleGenAiImageModel(
			QuotaManager quotaManager, List<SafetySetting> safetySettings,
			ServiceContext serviceContext)
		throws ConfigurationException {

		_companyId = serviceContext.getCompanyId();

		VertexAIConfiguration vertexAIConfiguration =
			ConfigurationProviderUtil.getCompanyConfiguration(
				VertexAIConfiguration.class, serviceContext.getCompanyId());

		_modelLocation = vertexAIConfiguration.imageModelLocation();
		_modelName = vertexAIConfiguration.imageModelName();
		_projectId = vertexAIConfiguration.projectId();

		_quotaManager = quotaManager;
		_safetySettings = safetySettings;

		_userId = serviceContext.getUserId();
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
						_safetySettings
					).build());

			TokenUsage tokenUsage = _toTokenUsage(generateContentResponse);

			_updateUsage(tokenUsage);

			return Response.from(_toImage(generateContentResponse), tokenUsage);
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

		GenerateContentResponseUsageMetadata
			generateContentResponseUsageMetadata =
				generateContentResponse.usageMetadata(
				).orElse(
					null
				);

		if (generateContentResponseUsageMetadata == null) {
			return null;
		}

		return new TokenUsage(
			generateContentResponseUsageMetadata.promptTokenCount(
			).orElse(
				null
			),
			generateContentResponseUsageMetadata.candidatesTokenCount(
			).orElse(
				null
			),
			generateContentResponseUsageMetadata.totalTokenCount(
			).orElse(
				null
			));
	}

	private void _updateUsage(TokenUsage tokenUsage) {
		if (tokenUsage == null) {
			return;
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
		catch (Exception exception) {
			_log.error(exception);
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(
		GoogleGenAiImageModel.class);

	private final long _companyId;
	private final String _modelLocation;
	private final String _modelName;
	private final String _projectId;
	private final QuotaManager _quotaManager;
	private final List<SafetySetting> _safetySettings;
	private final long _userId;

}