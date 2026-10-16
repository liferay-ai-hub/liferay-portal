/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.internal.configuration.persistence.listener.test;

import com.liferay.ai.hub.cell.configuration.AIHubCellConfiguration;
import com.liferay.arquillian.extension.junit.bridge.junit.Arquillian;
import com.liferay.oauth2.provider.constants.ClientProfile;
import com.liferay.oauth2.provider.constants.GrantType;
import com.liferay.oauth2.provider.model.OAuth2Application;
import com.liferay.oauth2.provider.scope.liferay.ScopeLocator;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalService;
import com.liferay.oauth2.provider.service.OAuth2ApplicationScopeAliasesLocalService;
import com.liferay.petra.string.StringBundler;
import com.liferay.portal.configuration.persistence.listener.ConfigurationModelListener;
import com.liferay.portal.configuration.persistence.listener.ConfigurationModelListenerException;
import com.liferay.portal.kernel.language.Language;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.test.AssertUtils;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.test.util.TestPropsValues;
import com.liferay.portal.kernel.util.HashMapDictionaryBuilder;
import com.liferay.portal.kernel.util.ListUtil;
import com.liferay.portal.kernel.util.LocaleThreadLocal;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.SetUtil;
import com.liferay.portal.security.service.access.policy.model.SAPEntry;
import com.liferay.portal.security.service.access.policy.service.SAPEntryLocalService;
import com.liferay.portal.test.rule.FeatureFlag;
import com.liferay.portal.test.rule.Inject;
import com.liferay.portal.test.rule.LiferayIntegrationTestRule;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Dictionary;
import java.util.Locale;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * @author Joao Victor
 */
@FeatureFlag("LPD-62272")
@RunWith(Arquillian.class)
public class AIHubCellConfigurationModelListenerTest {

	@ClassRule
	@Rule
	public static final LiferayIntegrationTestRule liferayIntegrationTestRule =
		new LiferayIntegrationTestRule();

	@Before
	public void setUp() {
		_locale = LocaleThreadLocal.getThemeDisplayLocale();

		LocaleThreadLocal.setThemeDisplayLocale(LocaleUtil.US);
	}

	@After
	public void tearDown() throws Exception {
		LocaleThreadLocal.setThemeDisplayLocale(_locale);

		_deleteOAuth2ApplicationAndSAPEntry();
	}

	@Test
	public void testOnAfterSave() throws Exception {
		_deleteOAuth2ApplicationAndSAPEntry();

		User user = TestPropsValues.getUser();

		String clientId = RandomTestUtil.randomString();
		String clientSecret = RandomTestUtil.randomString();

		OAuth2Application oAuth2Application =
			_oAuth2ApplicationLocalService.addOrUpdateOAuth2Application(
				"AI-HUB-CELL", user.getUserId(), user.getScreenName(),
				Arrays.asList(GrantType.CLIENT_CREDENTIALS),
				"client_secret_post", user.getUserId(), clientId,
				ClientProfile.HEADLESS_SERVER.id(), clientSecret, null, null,
				null, 0, null, RandomTestUtil.randomString(), null,
				Arrays.asList(), false,
				Arrays.asList("Liferay.Portal.Search.REST.everything.read"),
				false, new ServiceContext());

		SAPEntry sapEntry = _sapEntryLocalService.addSAPEntry(
			user.getUserId(),
			StringBundler.concat(
				_SEARCH_PAGE_SERVICE_SIGNATURE,
				"\ncom.liferay.ai.hub.cell.rest.internal.resource.v1_0.",
				"AuthorizationTokenResourceImpl#postAuthorizationToken"),
			true, true, "AI_HUB_CELL_TOKEN",
			Collections.singletonMap(
				LocaleUtil.getDefault(), "AI_HUB_CELL_TOKEN"),
			new ServiceContext());

		Dictionary<String, Object> properties =
			HashMapDictionaryBuilder.<String, Object>put(
				"companyId", user.getCompanyId()
			).build();

		_configurationModelListener.onAfterSave(
			AIHubCellConfiguration.class.getName(), properties);

		oAuth2Application = _oAuth2ApplicationLocalService.getOAuth2Application(
			oAuth2Application.getOAuth2ApplicationId());

		Assert.assertEquals(clientId, oAuth2Application.getClientId());
		Assert.assertEquals(
			clientSecret,
			_oAuth2ApplicationLocalService.getPlaintextClientSecret(
				oAuth2Application));

		Collection<String> scopeAliases = _scopeLocator.getScopeAliases(
			user.getCompanyId());

		Assert.assertEquals(
			SetUtil.fromList(
				ListUtil.filter(
					Arrays.asList(
						"Liferay.Bulk.REST.everything.write",
						"Liferay.Headless.Admin.Taxonomy.everything.read",
						"Liferay.Headless.Admin.User.everything.read",
						"Liferay.Headless.Batch.Engine.everything",
						"Liferay.Headless.CMP.everything.read",
						"Liferay.Object.Admin.REST.everything.read",
						"Liferay.Portal.Search.REST.everything.read",
						"cmpprojectlink.everything"),
					scopeAliases::contains)),
			SetUtil.fromList(
				_oAuth2ApplicationScopeAliasesLocalService.getScopeAliasesList(
					oAuth2Application.getOAuth2ApplicationScopeAliasesId())));

		sapEntry = _sapEntryLocalService.getSAPEntry(sapEntry.getSapEntryId());

		Assert.assertEquals(
			Arrays.asList(_SEARCH_PAGE_SERVICE_SIGNATURE),
			sapEntry.getAllowedServiceSignaturesList());

		long oAuth2ApplicationScopeAliasesId =
			oAuth2Application.getOAuth2ApplicationScopeAliasesId();

		_configurationModelListener.onAfterSave(
			AIHubCellConfiguration.class.getName(), properties);

		oAuth2Application = _oAuth2ApplicationLocalService.getOAuth2Application(
			oAuth2Application.getOAuth2ApplicationId());

		Assert.assertEquals(
			oAuth2ApplicationScopeAliasesId,
			oAuth2Application.getOAuth2ApplicationScopeAliasesId());
	}

	@Test
	public void testOnBeforeSave() throws Exception {
		AssertUtils.assertFailure(
			ConfigurationModelListenerException.class,
			StringBundler.concat(
				"The listener ",
				_configurationModelListener.getClass(
				).getName(),
				" was unable to save configuration ",
				AIHubCellConfiguration.class.getName(), ": ",
				_language.get(
					LocaleUtil.US,
					"please-enter-a-service-url-that-does-not-end-with-a-" +
						"slash")),
			() -> _configurationModelListener.onBeforeSave(
				RandomTestUtil.randomString(),
				HashMapDictionaryBuilder.<String, Object>put(
					"serviceURL", "https://example.com/"
				).build()));
	}

	private void _deleteOAuth2ApplicationAndSAPEntry() throws Exception {
		OAuth2Application oAuth2Application =
			_oAuth2ApplicationLocalService.
				fetchOAuth2ApplicationByExternalReferenceCode(
					"AI-HUB-CELL", TestPropsValues.getCompanyId());

		if (oAuth2Application != null) {
			_oAuth2ApplicationLocalService.deleteOAuth2Application(
				oAuth2Application.getOAuth2ApplicationId());
		}

		SAPEntry sapEntry = _sapEntryLocalService.fetchSAPEntry(
			TestPropsValues.getCompanyId(), "AI_HUB_CELL_TOKEN");

		if (sapEntry != null) {
			_sapEntryLocalService.deleteSAPEntry(sapEntry);
		}
	}

	private static final String _SEARCH_PAGE_SERVICE_SIGNATURE =
		"com.liferay.portal.search.rest.internal.resource.v1_0." +
			"SearchResultResourceImpl#getSearchPage";

	@Inject(
		filter = "model.class.name=com.liferay.ai.hub.cell.configuration.AIHubCellConfiguration"
	)
	private ConfigurationModelListener _configurationModelListener;

	@Inject
	private Language _language;

	private Locale _locale;

	@Inject
	private OAuth2ApplicationLocalService _oAuth2ApplicationLocalService;

	@Inject
	private OAuth2ApplicationScopeAliasesLocalService
		_oAuth2ApplicationScopeAliasesLocalService;

	@Inject
	private SAPEntryLocalService _sapEntryLocalService;

	@Inject
	private ScopeLocator _scopeLocator;

}