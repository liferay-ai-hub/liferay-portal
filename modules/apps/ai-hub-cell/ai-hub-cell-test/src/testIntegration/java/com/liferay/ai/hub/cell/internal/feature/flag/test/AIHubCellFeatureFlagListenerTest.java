/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.internal.feature.flag.test;

import com.liferay.ai.hub.cell.configuration.AIHubCellConfiguration;
import com.liferay.arquillian.extension.junit.bridge.junit.Arquillian;
import com.liferay.oauth2.provider.model.OAuth2Application;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalService;
import com.liferay.portal.configuration.test.util.ConfigurationTestUtil;
import com.liferay.portal.kernel.feature.flag.FeatureFlagListener;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.test.util.TestPropsValues;
import com.liferay.portal.kernel.util.HashMapDictionaryBuilder;
import com.liferay.portal.test.rule.FeatureFlag;
import com.liferay.portal.test.rule.FeatureFlags;
import com.liferay.portal.test.rule.Inject;
import com.liferay.portal.test.rule.LiferayIntegrationTestRule;

import java.util.Arrays;

import org.junit.After;
import org.junit.Assert;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * @author Iliyan Peychev
 */
@RunWith(Arquillian.class)
public class AIHubCellFeatureFlagListenerTest {

	@ClassRule
	@Rule
	public static final LiferayIntegrationTestRule liferayIntegrationTestRule =
		new LiferayIntegrationTestRule();

	@After
	public void tearDown() throws Exception {
		if (!_configurationSaved) {
			return;
		}

		ConfigurationTestUtil.deleteConfiguration(
			AIHubCellConfiguration.class.getName());

		OAuth2Application mcpOAuth2Application = _fetchMCPOAuth2Application();

		if (mcpOAuth2Application != null) {
			_oAuth2ApplicationLocalService.deleteOAuth2Application(
				mcpOAuth2Application);
		}

		OAuth2Application oAuth2Application = _fetchOAuth2Application();

		if (_homePageURL == null) {
			_oAuth2ApplicationLocalService.deleteOAuth2Application(
				oAuth2Application);

			return;
		}

		oAuth2Application.setHomePageURL(_homePageURL);

		_oAuth2ApplicationLocalService.updateOAuth2Application(
			oAuth2Application);
	}

	@FeatureFlags(
		featureFlags = {
			@FeatureFlag("LPD-62272"), @FeatureFlag("LPD-63311"),
			@FeatureFlag("LPD-65213")
		}
	)
	@Test
	public void testOnValue() throws Exception {
		OAuth2Application oAuth2Application = _fetchOAuth2Application();

		if (oAuth2Application != null) {
			_homePageURL = oAuth2Application.getHomePageURL();
		}

		_configurationSaved = true;

		ConfigurationTestUtil.saveConfiguration(
			AIHubCellConfiguration.class.getName(),
			HashMapDictionaryBuilder.<String, Object>put(
				"companyId", TestPropsValues.getCompanyId()
			).put(
				"serviceURL", "https://ai-hub.example.com"
			).build());

		_oAuth2ApplicationLocalService.deleteOAuth2Application(
			_fetchMCPOAuth2Application());

		_featureFlagListener.onValue(
			TestPropsValues.getCompanyId(), "LPD-65213", false);

		Assert.assertNull(_fetchMCPOAuth2Application());

		_featureFlagListener.onValue(
			TestPropsValues.getCompanyId(), "LPD-65213", true);

		OAuth2Application mcpOAuth2Application = _fetchMCPOAuth2Application();

		Assert.assertEquals("ai-hub-mcp", mcpOAuth2Application.getClientId());
		Assert.assertEquals(
			Arrays.asList("https://ai-hub.example.com/o/ai-hub-mcp/oauth2"),
			mcpOAuth2Application.getRedirectURIsList());

		mcpOAuth2Application.setRedirectURIsList(
			Arrays.asList(
				"https://" + RandomTestUtil.randomString() +
					"/o/ai-hub-mcp/oauth2"));

		mcpOAuth2Application =
			_oAuth2ApplicationLocalService.updateOAuth2Application(
				mcpOAuth2Application);

		_featureFlagListener.onValue(
			TestPropsValues.getCompanyId(), "LPD-63311", true);

		OAuth2Application updatedMCPOAuth2Application =
			_fetchMCPOAuth2Application();

		Assert.assertEquals(
			mcpOAuth2Application.getOAuth2ApplicationId(),
			updatedMCPOAuth2Application.getOAuth2ApplicationId());
		Assert.assertEquals(
			Arrays.asList("https://ai-hub.example.com/o/ai-hub-mcp/oauth2"),
			updatedMCPOAuth2Application.getRedirectURIsList());
	}

	private OAuth2Application _fetchMCPOAuth2Application() throws Exception {
		return _oAuth2ApplicationLocalService.
			fetchOAuth2ApplicationByExternalReferenceCode(
				"AI-HUB-MCP", TestPropsValues.getCompanyId());
	}

	private OAuth2Application _fetchOAuth2Application() throws Exception {
		return _oAuth2ApplicationLocalService.
			fetchOAuth2ApplicationByExternalReferenceCode(
				"AI-HUB-CELL", TestPropsValues.getCompanyId());
	}

	private boolean _configurationSaved;

	@Inject(filter = "feature.flag.key=LPD-65213")
	private FeatureFlagListener _featureFlagListener;

	private String _homePageURL;

	@Inject
	private OAuth2ApplicationLocalService _oAuth2ApplicationLocalService;

}