/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.internal.instance.lifecycle.test;

import com.liferay.ai.hub.cell.configuration.AIHubCellConfiguration;
import com.liferay.arquillian.extension.junit.bridge.junit.Arquillian;
import com.liferay.oauth2.provider.model.OAuth2Application;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalService;
import com.liferay.portal.configuration.test.util.CompanyConfigurationTemporarySwapper;
import com.liferay.portal.instance.lifecycle.PortalInstanceLifecycleListener;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.service.CompanyLocalService;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.test.util.TestPropsValues;
import com.liferay.portal.kernel.util.HashMapDictionaryBuilder;
import com.liferay.portal.security.service.access.policy.model.SAPEntry;
import com.liferay.portal.security.service.access.policy.service.SAPEntryLocalService;
import com.liferay.portal.test.rule.FeatureFlag;
import com.liferay.portal.test.rule.Inject;
import com.liferay.portal.test.rule.LiferayIntegrationTestRule;

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
public class AIHubCellInitialRequestPortalInstanceLifecycleListenerTest {

	@ClassRule
	@Rule
	public static final LiferayIntegrationTestRule liferayIntegrationTestRule =
		new LiferayIntegrationTestRule();

	@Before
	public void setUp() throws Exception {
		_deleteOAuth2ApplicationAndSAPEntry();
	}

	@After
	public void tearDown() throws Exception {
		_deleteOAuth2ApplicationAndSAPEntry();
	}

	@Test
	public void testPortalInstanceRegistered() throws Exception {
		Company company = _companyLocalService.getCompany(
			TestPropsValues.getCompanyId());

		try (CompanyConfigurationTemporarySwapper
				companyConfigurationTemporarySwapper =
					new CompanyConfigurationTemporarySwapper(
						company.getCompanyId(),
						AIHubCellConfiguration.class.getName(),
						HashMapDictionaryBuilder.<String, Object>put(
							"clientId", ""
						).put(
							"clientSecret", ""
						).put(
							"serviceURL", ""
						).build())) {

			_deleteOAuth2ApplicationAndSAPEntry();

			_portalInstanceLifecycleListener.portalInstanceRegistered(company);

			Assert.assertNull(
				_oAuth2ApplicationLocalService.
					fetchOAuth2ApplicationByExternalReferenceCode(
						"AI-HUB-CELL", company.getCompanyId()));
			Assert.assertNull(
				_sapEntryLocalService.fetchSAPEntry(
					company.getCompanyId(), "AI_HUB_CELL_TOKEN"));
		}

		try (CompanyConfigurationTemporarySwapper
				companyConfigurationTemporarySwapper =
					new CompanyConfigurationTemporarySwapper(
						company.getCompanyId(),
						AIHubCellConfiguration.class.getName(),
						HashMapDictionaryBuilder.<String, Object>put(
							"clientId", RandomTestUtil.randomString()
						).put(
							"clientSecret", RandomTestUtil.randomString()
						).put(
							"serviceURL",
							"https://" + RandomTestUtil.randomString()
						).build())) {

			_deleteOAuth2ApplicationAndSAPEntry();

			_portalInstanceLifecycleListener.portalInstanceRegistered(company);

			Assert.assertNotNull(
				_oAuth2ApplicationLocalService.
					fetchOAuth2ApplicationByExternalReferenceCode(
						"AI-HUB-CELL", company.getCompanyId()));
			Assert.assertNotNull(
				_sapEntryLocalService.fetchSAPEntry(
					company.getCompanyId(), "AI_HUB_CELL_TOKEN"));
		}
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

	@Inject
	private CompanyLocalService _companyLocalService;

	@Inject
	private OAuth2ApplicationLocalService _oAuth2ApplicationLocalService;

	@Inject(
		filter = "component.name=com.liferay.ai.hub.cell.internal.instance.lifecycle.AIHubCellInitialRequestPortalInstanceLifecycleListener"
	)
	private PortalInstanceLifecycleListener _portalInstanceLifecycleListener;

	@Inject
	private SAPEntryLocalService _sapEntryLocalService;

}