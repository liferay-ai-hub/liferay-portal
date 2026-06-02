/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.secure;

import com.liferay.ai.hub.configuration.OnePasswordConfiguration;
import com.liferay.portal.configuration.module.configuration.ConfigurationProvider;
import com.liferay.portal.json.JSONFactoryImpl;
import com.liferay.portal.kernel.servlet.HttpHeaders;
import com.liferay.portal.kernel.test.ReflectionTestUtil;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.Http;
import com.liferay.portal.test.rule.LiferayUnitTestRule;

import java.net.HttpURLConnection;

import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;

import org.mockito.Mockito;

/**
 * @author Guilherme Camacho
 */
public class OnePasswordSecureSharingClientTest {

	@ClassRule
	@Rule
	public static final LiferayUnitTestRule liferayUnitTestRule =
		LiferayUnitTestRule.INSTANCE;

	@Before
	public void setUp() throws Exception {
		_onePasswordSecureSharingClient = new OnePasswordSecureSharingClient();

		ReflectionTestUtil.setFieldValue(
			_onePasswordSecureSharingClient, "_configurationProvider",
			_configurationProvider);

		ReflectionTestUtil.setFieldValue(
			_onePasswordSecureSharingClient, "_http", _http);

		ReflectionTestUtil.setFieldValue(
			_onePasswordSecureSharingClient, "_jsonFactory",
			new JSONFactoryImpl());

		OnePasswordConfiguration onePasswordConfiguration = Mockito.mock(
			OnePasswordConfiguration.class);

		Mockito.when(
			onePasswordConfiguration.accessToken()
		).thenReturn(
			_ACCESS_TOKEN
		);

		Mockito.when(
			onePasswordConfiguration.serviceURL()
		).thenReturn(
			_SERVICE_URL
		);

		Mockito.when(
			onePasswordConfiguration.shareExpirationDays()
		).thenReturn(
			7
		);

		Mockito.when(
			_configurationProvider.getCompanyConfiguration(
				OnePasswordConfiguration.class, _COMPANY_ID)
		).thenReturn(
			onePasswordConfiguration
		);
	}

	@Test
	public void testShareReturnsLink() throws Exception {
		String link =
			"https://share.1password.com/s/" + RandomTestUtil.randomString();

		_setUpHttpResponse(
			"{\"url\": \"" + link + "\"}", HttpURLConnection.HTTP_OK);

		Assert.assertEquals(
			link,
			_onePasswordSecureSharingClient.share(
				_COMPANY_ID,
				HashMapBuilder.put(
					"clientId", "id-123"
				).put(
					"clientSecret", "secret-456"
				).build(),
				"admin@liferay.com"));

		Http.Options options = _capturedOptions;

		Assert.assertEquals(_SERVICE_URL + "/share", options.getLocation());
		Assert.assertEquals(
			"Bearer " + _ACCESS_TOKEN,
			options.getHeader(HttpHeaders.AUTHORIZATION));
	}

	@Test
	public void testShareThrowsOnErrorResponse() throws Exception {
		_setUpHttpResponse(
			"{\"error\": \"internal_error\"}",
			HttpURLConnection.HTTP_INTERNAL_ERROR);

		Assert.assertThrows(
			Exception.class,
			() -> _onePasswordSecureSharingClient.share(
				_COMPANY_ID,
				HashMapBuilder.put(
					"clientId", "id-123"
				).put(
					"clientSecret", "secret-456"
				).build(),
				"admin@liferay.com"));
	}

	private void _setUpHttpResponse(String responseBody, int responseCode)
		throws Exception {

		Mockito.when(
			_http.URLtoString(Mockito.any(Http.Options.class))
		).thenAnswer(
			invocation -> {
				_capturedOptions = invocation.getArgument(0);

				Http.Response response = _capturedOptions.getResponse();

				response.setResponseCode(responseCode);

				return responseBody;
			}
		);
	}

	private static final String _ACCESS_TOKEN = "token-123";

	private static final long _COMPANY_ID = RandomTestUtil.randomLong();

	private static final String _SERVICE_URL =
		"https://secure-sharing.example.com";

	private Http.Options _capturedOptions;
	private final ConfigurationProvider _configurationProvider = Mockito.mock(
		ConfigurationProvider.class);
	private final Http _http = Mockito.mock(Http.class);
	private OnePasswordSecureSharingClient _onePasswordSecureSharingClient;

}