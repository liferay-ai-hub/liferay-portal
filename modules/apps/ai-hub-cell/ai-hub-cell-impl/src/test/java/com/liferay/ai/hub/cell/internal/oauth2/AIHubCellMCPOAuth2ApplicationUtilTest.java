/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.internal.oauth2;

import com.liferay.oauth2.provider.model.OAuth2Application;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalService;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.test.log.LogCapture;
import com.liferay.portal.test.log.LogEntry;
import com.liferay.portal.test.log.LoggerTestUtil;
import com.liferay.portal.test.rule.LiferayUnitTestRule;

import java.lang.reflect.Method;

import java.util.Arrays;
import java.util.List;

import org.junit.Assert;
import org.junit.ClassRule;
import org.junit.Test;

import org.mockito.Mockito;

/**
 * @author Iliyan Peychev
 */
public class AIHubCellMCPOAuth2ApplicationUtilTest {

	@ClassRule
	public static final LiferayUnitTestRule liferayUnitTestRule =
		LiferayUnitTestRule.INSTANCE;

	@Test
	public void testAddOrUpdateMCPOAuth2ApplicationAddedByAnotherNode() {
		OAuth2Application oAuth2Application = Mockito.mock(
			OAuth2Application.class);

		try (LogCapture logCapture = LoggerTestUtil.configureLog4JLogger(
				AIHubCellMCPOAuth2ApplicationUtil.class.getName(),
				LoggerTestUtil.ERROR)) {

			AIHubCellMCPOAuth2ApplicationUtil.addOrUpdateMCPOAuth2Application(
				1, "https://" + RandomTestUtil.randomString(),
				_getOAuth2ApplicationLocalService(null, oAuth2Application),
				_getUserLocalService());

			List<LogEntry> logEntries = logCapture.getLogEntries();

			Assert.assertEquals(logEntries.toString(), 0, logEntries.size());
		}

		try (LogCapture logCapture = LoggerTestUtil.configureLog4JLogger(
				AIHubCellMCPOAuth2ApplicationUtil.class.getName(),
				LoggerTestUtil.ERROR)) {

			AIHubCellMCPOAuth2ApplicationUtil.addOrUpdateMCPOAuth2Application(
				1, "https://" + RandomTestUtil.randomString(),
				_getOAuth2ApplicationLocalService(null, null),
				_getUserLocalService());

			List<LogEntry> logEntries = logCapture.getLogEntries();

			Assert.assertEquals(logEntries.toString(), 1, logEntries.size());

			LogEntry logEntry = logEntries.get(0);

			Assert.assertEquals(
				"Unable to add or update OAuth 2 application with client ID " +
					"\"ai-hub-mcp\" for company 1",
				logEntry.getMessage());
		}
	}

	@Test
	public void testAddOrUpdateMCPOAuth2ApplicationWithTrailingSlash() {
		OAuth2Application oAuth2Application = Mockito.mock(
			OAuth2Application.class);

		Mockito.when(
			oAuth2Application.getRedirectURIsList()
		).thenReturn(
			Arrays.asList(
				"https://" + RandomTestUtil.randomString() +
					"/o/ai-hub-mcp/oauth2")
		);

		AIHubCellMCPOAuth2ApplicationUtil.addOrUpdateMCPOAuth2Application(
			1, "https://ai-hub.example.com/",
			_getOAuth2ApplicationLocalService(oAuth2Application, null),
			_getUserLocalService());

		Mockito.verify(
			oAuth2Application
		).setRedirectURIsList(
			Arrays.asList("https://ai-hub.example.com/o/ai-hub-mcp/oauth2")
		);
	}

	private OAuth2ApplicationLocalService _getOAuth2ApplicationLocalService(
		OAuth2Application oAuth2Application,
		OAuth2Application oAuth2ApplicationAfterFailure) {

		boolean[] failed = {false};

		return Mockito.mock(
			OAuth2ApplicationLocalService.class,
			invocation -> {
				Method method = invocation.getMethod();

				String methodName = method.getName();

				if (methodName.equals("addOrUpdateOAuth2Application")) {
					failed[0] = true;

					throw new PortalException();
				}

				if (methodName.equals(
						"fetchOAuth2ApplicationByExternalReferenceCode")) {

					if (failed[0]) {
						return oAuth2ApplicationAfterFailure;
					}

					return oAuth2Application;
				}

				return null;
			});
	}

	private UserLocalService _getUserLocalService() {
		UserLocalService userLocalService = Mockito.mock(
			UserLocalService.class);

		User user = Mockito.mock(User.class);

		Mockito.when(
			userLocalService.fetchUserByScreenName(1, "default-service-account")
		).thenReturn(
			user
		);

		return userLocalService;
	}

}