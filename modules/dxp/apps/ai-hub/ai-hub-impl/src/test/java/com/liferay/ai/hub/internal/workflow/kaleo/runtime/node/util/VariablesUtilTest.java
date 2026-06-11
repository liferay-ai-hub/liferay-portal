/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.workflow.kaleo.runtime.node.util;

import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.test.rule.LiferayUnitTestRule;
import com.liferay.portal.workflow.kaleo.runtime.ExecutionContext;

import dev.langchain4j.data.image.Image;
import dev.langchain4j.data.message.ImageContent;

import java.io.Serializable;

import java.net.URI;

import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;

/**
 * @author Marcos Castro
 */
public class VariablesUtilTest {

	@ClassRule
	@Rule
	public static final LiferayUnitTestRule liferayUnitTestRule =
		LiferayUnitTestRule.INSTANCE;

	@Test
	public void testApplyInputVariablesExcludesImageVariables() {
		String value = VariablesUtil.applyInputVariables(
			_getExecutionContext(
				HashMapBuilder.<String, Serializable>put(
					"context", "a product page"
				).put(
					"image", "data:image/png;base64,iVBORw0KGgo="
				).build()),
			"userMessage",
			HashMapBuilder.put(
				"inputVariables", _INPUT_VARIABLES
			).put(
				"userMessage", "Image: {{image}}, context: {{context}}"
			).build());

		Assert.assertEquals(
			"Image: {{image}}, context: a product page", value);
	}

	@Test
	public void testGetImageContents() {
		List<ImageContent> imageContents = _getImageContents(
			"data:image/png;base64,iVBORw0KGgo=");

		Assert.assertEquals(
			imageContents.toString(), 1, imageContents.size());

		ImageContent imageContent = imageContents.get(0);

		Image image = imageContent.image();

		Assert.assertEquals("iVBORw0KGgo=", image.base64Data());
		Assert.assertEquals("image/png", image.mimeType());
	}

	@Test
	public void testGetImageContentsWithDataURIParameters() {
		List<ImageContent> imageContents = _getImageContents(
			"data:image/png;charset=US-ASCII;base64,iVBORw0KGgo=");

		Assert.assertEquals(
			imageContents.toString(), 1, imageContents.size());

		ImageContent imageContent = imageContents.get(0);

		Image image = imageContent.image();

		Assert.assertEquals("image/png", image.mimeType());
	}

	@Test
	public void testGetImageContentsWithInvalidValues() {
		Assert.assertTrue(
			_getImageContents("data:;base64,iVBORw0KGgo=").isEmpty());
		Assert.assertTrue(
			_getImageContents("https://example.com/an image.png").isEmpty());
	}

	@Test
	public void testGetImageContentsWithMultilineBase64() {
		List<ImageContent> imageContents = _getImageContents(
			"data:image/png;base64,iVBO\nRw0K\r\nGgo=");

		Assert.assertEquals(
			imageContents.toString(), 1, imageContents.size());

		ImageContent imageContent = imageContents.get(0);

		Image image = imageContent.image();

		Assert.assertEquals("iVBORw0KGgo=", image.base64Data());
	}

	@Test
	public void testGetImageContentsWithStringVariable() {
		List<ImageContent> imageContents = VariablesUtil.getImageContents(
			_getExecutionContext(
				HashMapBuilder.<String, Serializable>put(
					"context", "data:image/png;base64,iVBORw0KGgo="
				).build()),
			HashMapBuilder.put(
				"inputVariables", _INPUT_VARIABLES
			).build());

		Assert.assertTrue(imageContents.toString(), imageContents.isEmpty());
	}

	@Test
	public void testGetImageContentsWithURL() {
		List<ImageContent> imageContents = _getImageContents(
			"https://example.com/image.png");

		Assert.assertEquals(
			imageContents.toString(), 1, imageContents.size());

		ImageContent imageContent = imageContents.get(0);

		Image image = imageContent.image();

		Assert.assertEquals(
			URI.create("https://example.com/image.png"), image.url());
	}

	private ExecutionContext _getExecutionContext(
		Map<String, Serializable> workflowContext) {

		return new ExecutionContext(
			null, workflowContext, new ServiceContext());
	}

	private List<ImageContent> _getImageContents(String value) {
		return VariablesUtil.getImageContents(
			_getExecutionContext(
				HashMapBuilder.<String, Serializable>put(
					"image", value
				).build()),
			HashMapBuilder.put(
				"inputVariables", _INPUT_VARIABLES
			).build());
	}

	private static final String _INPUT_VARIABLES = StringBundler.concat(
		"[{\"name\": \"image\", \"type\": \"image\"}, {\"name\": \"context\", ",
		"\"type\": \"string\"}]");

}
