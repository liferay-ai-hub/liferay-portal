/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.langchain4j.model.image;

import com.google.genai.types.Content;
import com.google.genai.types.Part;

import com.liferay.ai.hub.internal.model.GoogleGenAiUtil;
import com.liferay.petra.reflect.ReflectionUtil;
import com.liferay.portal.kernel.module.configuration.ConfigurationException;

import dev.langchain4j.data.image.Image;
import dev.langchain4j.model.image.ImageModel;
import dev.langchain4j.model.output.Response;

import java.lang.reflect.Method;

import java.util.List;

/**
 * @author Feliphe Marinho
 */
public class GoogleGenAiImageModel implements ImageModel {

	public GoogleGenAiImageModel(
			long companyId, String modelLocation, String modelName)
		throws ConfigurationException {

		_imageModel = GoogleGenAiUtil.createGoogleGenAiImageModel(
			companyId, modelLocation, modelName);
	}

	@Override
	public Response<Image> generate(String prompt) {
		try {
			return (Response<Image>)_generateImageResponseMethod.invoke(
				_imageModel, List.of(Content.fromParts(Part.fromText(prompt))));
		}
		catch (Exception exception) {
			return ReflectionUtil.throwException(exception);
		}
	}

	private static final Method _generateImageResponseMethod =
		ReflectionUtil.fetchDeclaredMethod(
			dev.langchain4j.model.google.genai.GoogleGenAiImageModel.class,
			"generateImageResponse", List.class);

	private final dev.langchain4j.model.google.genai.GoogleGenAiImageModel
		_imageModel;

}