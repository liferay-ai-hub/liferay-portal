/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.tools;

import com.liferay.ai.hub.internal.langchain4j.model.image.GoogleGenAiImageModel;
import com.liferay.ai.hub.internal.model.GoogleGenAiUtil;
import com.liferay.ai.hub.quota.QuotaManager;
import com.liferay.ai.hub.rest.resource.v1_0.util.SseUtil;
import com.liferay.petra.string.StringBundler;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.workflow.kaleo.runtime.ExecutionContext;

import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;
import dev.langchain4j.data.image.Image;
import dev.langchain4j.invocation.InvocationParameters;
import dev.langchain4j.model.output.Response;

import java.io.Serializable;

import java.util.Map;

/**
 * @author Feliphe Marinho
 */
public class ImageGenerationTools {

	public ImageGenerationTools(
		String modelLocation, String modelName, QuotaManager quotaManager) {

		_modelLocation = modelLocation;
		_modelName = modelName;
		_quotaManager = quotaManager;
	}

	@Tool("Generate an image from a natural language description")
	public String generateImage(
		InvocationParameters invocationParameters,
		@P("A description of the image to generate") String description) {

		try {
			ExecutionContext executionContext = invocationParameters.get(
				"executionContext");

			GoogleGenAiImageModel googleGenAiImageModel =
				GoogleGenAiUtil.createGoogleGenAiImageModel(
					_modelLocation, _modelName, _quotaManager,
					executionContext.getServiceContext());

			Response<Image> response = googleGenAiImageModel.generate(
				description);

			Image image = response.content();

			Map<String, Serializable> workflowContext =
				executionContext.getWorkflowContext();

			SseUtil.send(
				new String[] {
					GetterUtil.getString(
						workflowContext.get(
							"agentDefinitionExternalReferenceCode"))
				},
				StringPool.BLANK,
				new String[] {
					StringBundler.concat(
						"data:", image.mimeType(), ";base64,",
						image.base64Data())
				},
				"Chat Message Sent", null,
				GetterUtil.getString(workflowContext.get("sseEventSinkKey")));

			return "The image was generated and delivered to the user.";
		}
		catch (Exception exception) {
			_log.error("Unable to generate an image", exception);

			return "The image could not be generated. Ask the user to " +
				"rephrase the request or try again later.";
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(
		ImageGenerationTools.class);

	private final String _modelLocation;
	private final String _modelName;
	private final QuotaManager _quotaManager;

}