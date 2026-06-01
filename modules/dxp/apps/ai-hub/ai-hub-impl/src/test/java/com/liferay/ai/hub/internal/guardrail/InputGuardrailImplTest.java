/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.guardrail;

import com.liferay.ai.hub.guardrail.ModelArmorHandler;
import com.liferay.ai.hub.quota.QuotaManager;
import com.liferay.ai.hub.quota.Source;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.test.rule.LiferayUnitTestRule;

import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.guardrail.GuardrailResult;
import dev.langchain4j.guardrail.InputGuardrailResult;

import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;

import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

/**
 * @author Mario Gomes
 */
public class InputGuardrailImplTest {

	@ClassRule
	@Rule
	public static final LiferayUnitTestRule liferayUnitTestRule =
		LiferayUnitTestRule.INSTANCE;

	@Before
	public void setUp() {
		_modelArmorHandler = Mockito.mock(ModelArmorHandler.class);
		_quotaManager = Mockito.mock(QuotaManager.class);

		_inputGuardrailImpl = new InputGuardrailImpl(
			_COMPANY_ID, _EXTERNAL_REFERENCE_CODE, _LOCATION,
			_modelArmorHandler, _quotaManager, _USER_ID, Map.of());
	}

	@Test
	public void testValidateReturnsFatalAndDebitsWhenModelArmorHandlerThrows()
		throws Exception {

		Mockito.when(
			_modelArmorHandler.sanitizeUserPrompt(
				_COMPANY_ID, _EXTERNAL_REFERENCE_CODE, _LOCATION, _USER_MESSAGE)
		).thenThrow(
			new RuntimeException()
		);

		InputGuardrailResult inputGuardrailResult =
			_inputGuardrailImpl.validate(UserMessage.from(_USER_MESSAGE));

		Assert.assertEquals(
			GuardrailResult.Result.FATAL, inputGuardrailResult.result());

		Mockito.verify(
			_quotaManager, Mockito.times(1)
		).updateUsage(
			_COMPANY_ID, Source.MODEL_ARMOR, _USER_MESSAGE, _USER_ID
		);
	}

	@Test
	public void testValidateReturnsFatalAndDebitsWhenViolation()
		throws Exception {

		Mockito.when(
			_modelArmorHandler.sanitizeUserPrompt(
				_COMPANY_ID, _EXTERNAL_REFERENCE_CODE, _LOCATION, _USER_MESSAGE)
		).thenReturn(
			"malicious-uri"
		);

		InputGuardrailResult inputGuardrailResult =
			_inputGuardrailImpl.validate(UserMessage.from(_USER_MESSAGE));

		Assert.assertEquals(
			GuardrailResult.Result.FATAL, inputGuardrailResult.result());

		Mockito.verify(
			_quotaManager, Mockito.times(1)
		).updateUsage(
			_COMPANY_ID, Source.MODEL_ARMOR, _USER_MESSAGE, _USER_ID
		);
	}

	@Test
	public void testValidateReturnsSuccessAndDebitsWhenNoViolation()
		throws Exception {

		Mockito.when(
			_modelArmorHandler.sanitizeUserPrompt(
				_COMPANY_ID, _EXTERNAL_REFERENCE_CODE, _LOCATION, _USER_MESSAGE)
		).thenReturn(
			null
		);

		InputGuardrailResult inputGuardrailResult =
			_inputGuardrailImpl.validate(UserMessage.from(_USER_MESSAGE));

		Assert.assertEquals(
			GuardrailResult.Result.SUCCESS, inputGuardrailResult.result());

		Mockito.verify(
			_quotaManager, Mockito.times(1)
		).updateUsage(
			_COMPANY_ID, Source.MODEL_ARMOR, _USER_MESSAGE, _USER_ID
		);
	}

	@Test
	public void testValidateReturnsSuccessWhenUpdateUsageThrows()
		throws Exception {

		Mockito.when(
			_modelArmorHandler.sanitizeUserPrompt(
				_COMPANY_ID, _EXTERNAL_REFERENCE_CODE, _LOCATION, _USER_MESSAGE)
		).thenReturn(
			null
		);

		Mockito.doThrow(
			new PortalException()
		).when(
			_quotaManager
		).updateUsage(
			ArgumentMatchers.anyLong(), ArgumentMatchers.any(Source.class),
			ArgumentMatchers.anyString(), ArgumentMatchers.anyLong()
		);

		InputGuardrailResult inputGuardrailResult =
			_inputGuardrailImpl.validate(UserMessage.from(_USER_MESSAGE));

		Assert.assertEquals(
			GuardrailResult.Result.SUCCESS, inputGuardrailResult.result());
	}

	private static final long _COMPANY_ID = 1L;

	private static final String _EXTERNAL_REFERENCE_CODE = "TEST_ERC";

	private static final String _LOCATION = "us-central1";

	private static final long _USER_ID = 99L;

	private static final String _USER_MESSAGE = "Hello, world.";

	private InputGuardrailImpl _inputGuardrailImpl;
	private ModelArmorHandler _modelArmorHandler;
	private QuotaManager _quotaManager;

}