/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.quota;

import com.liferay.portal.test.rule.LiferayUnitTestRule;

import java.util.Map;

import org.junit.Assert;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;

/**
 * @author Guilherme Camacho
 */
public class LiferayTokenConverterTest {

	@ClassRule
	@Rule
	public static final LiferayUnitTestRule liferayUnitTestRule =
		LiferayUnitTestRule.INSTANCE;

	@Test
	public void testConvertMapSumsAllSources() {
		Assert.assertEquals(
			2000L,
			LiferayTokenConverter.convert(
				Map.of(
					TokenSource.VERTEX_INPUT, 1560L, TokenSource.VERTEX_OUTPUT,
					350L)));
	}

	@Test
	public void testConvertMapWithEmptyInputReturnsZero() {
		Assert.assertEquals(0L, LiferayTokenConverter.convert(Map.of()));
	}

	@Test
	public void testConvertNegativeReturnsZero() {
		Assert.assertEquals(
			0L, LiferayTokenConverter.convert(TokenSource.VERTEX_INPUT, -1L));
	}

	@Test
	public void testConvertUsingEmbeddingReturnsOneLRT() {
		Assert.assertEquals(
			1000L,
			LiferayTokenConverter.convert(TokenSource.EMBEDDING, 62500L));
	}

	@Test
	public void testConvertUsingModelArmorReturnsOneLRT() {
		Assert.assertEquals(
			1000L,
			LiferayTokenConverter.convert(TokenSource.MODEL_ARMOR, 62500L));
	}

	@Test
	public void testConvertUsingVertexInputReturnsOneLRT() {
		Assert.assertEquals(
			1000L,
			LiferayTokenConverter.convert(TokenSource.VERTEX_INPUT, 1560L));
	}

	@Test
	public void testConvertUsingVertexInputRoundsDown() {
		Assert.assertEquals(
			641L,
			LiferayTokenConverter.convert(TokenSource.VERTEX_INPUT, 1000L));
	}

	@Test
	public void testConvertUsingVertexInputSmallValueKeepsFraction() {
		Assert.assertEquals(
			128L,
			LiferayTokenConverter.convert(TokenSource.VERTEX_INPUT, 200L));
	}

	@Test
	public void testConvertUsingVertexOutputReturnsOneLRT() {
		Assert.assertEquals(
			1000L,
			LiferayTokenConverter.convert(TokenSource.VERTEX_OUTPUT, 350L));
	}

	@Test
	public void testConvertZero() {
		Assert.assertEquals(
			0L, LiferayTokenConverter.convert(TokenSource.VERTEX_INPUT, 0L));
	}

}