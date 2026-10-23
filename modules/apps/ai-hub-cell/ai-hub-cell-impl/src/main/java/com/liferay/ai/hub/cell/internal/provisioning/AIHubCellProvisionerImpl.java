/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.internal.provisioning;

import com.liferay.ai.hub.cell.provisioning.AIHubCellProvisioner;
import com.liferay.oauth2.provider.constants.ClientProfile;
import com.liferay.oauth2.provider.constants.GrantType;
import com.liferay.oauth2.provider.model.OAuth2Application;
import com.liferay.oauth2.provider.scope.liferay.ScopeLocator;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalService;
import com.liferay.oauth2.provider.service.OAuth2ApplicationScopeAliasesLocalService;
import com.liferay.oauth2.provider.util.OAuth2SecureRandomGenerator;
import com.liferay.petra.string.StringBundler;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.model.UserConstants;
import com.liferay.portal.kernel.service.CompanyLocalService;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.util.ListUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.SetUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.security.service.access.policy.model.SAPEntry;
import com.liferay.portal.security.service.access.policy.service.SAPEntryLocalService;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Joao Victor
 */
@Component(service = AIHubCellProvisioner.class)
public class AIHubCellProvisionerImpl implements AIHubCellProvisioner {

	@Override
	public void provision(long companyId) {
		_addOrUpdateOAuth2Application(companyId);
		_addOrUpdateSAPEntry(companyId);
	}

	private void _addOAuth2Application(long companyId) throws PortalException {
		User user = _userLocalService.fetchUserByScreenName(
			companyId, UserConstants.SCREEN_NAME_DEFAULT_SERVICE_ACCOUNT);

		if (user == null) {
			if (_log.isWarnEnabled()) {
				_log.warn(
					StringBundler.concat(
						"Unable to add OAuth2 application for company ",
						companyId,
						" because the default service account does not exist"));
			}

			return;
		}

		Company company = _companyLocalService.getCompany(companyId);

		_oAuth2ApplicationLocalService.addOrUpdateOAuth2Application(
			_OAUTH2_APPLICATION_EXTERNAL_REFERENCE_CODE, user.getUserId(),
			user.getScreenName(), Arrays.asList(GrantType.CLIENT_CREDENTIALS),
			"client_secret_post", user.getUserId(),
			OAuth2SecureRandomGenerator.generateClientId(),
			ClientProfile.HEADLESS_SERVER.id(),
			OAuth2SecureRandomGenerator.generateClientSecret(), null, null,
			company.getPortalURL(0), 0, null, "AI Hub Cell", null,
			Arrays.asList(), false, _getScopeAliasesList(companyId), false,
			new ServiceContext());
	}

	private void _addOrUpdateOAuth2Application(long companyId) {
		try {
			OAuth2Application oAuth2Application =
				_oAuth2ApplicationLocalService.
					fetchOAuth2ApplicationByExternalReferenceCode(
						_OAUTH2_APPLICATION_EXTERNAL_REFERENCE_CODE, companyId);

			if (oAuth2Application == null) {
				_addOAuth2Application(companyId);
			}
			else {
				_updateScopeAliases(oAuth2Application);
			}
		}
		catch (PortalException portalException) {
			_log.error(
				"Unable to add or update OAuth2 application for company " +
					companyId,
				portalException);
		}
	}

	private void _addOrUpdateSAPEntry(long companyId) {
		try {
			SAPEntry sapEntry = _sapEntryLocalService.fetchSAPEntry(
				companyId, _SAP_ENTRY_NAME);

			if (sapEntry == null) {
				_sapEntryLocalService.addSAPEntry(
					_userLocalService.getGuestUserId(companyId),
					_SAP_ENTRY_ALLOWED_SERVICE_SIGNATURES, true, true,
					_SAP_ENTRY_NAME,
					Collections.singletonMap(
						LocaleUtil.getDefault(), _SAP_ENTRY_NAME),
					new ServiceContext());

				return;
			}

			if (Objects.equals(
					SetUtil.fromList(
						sapEntry.getAllowedServiceSignaturesList()),
					SetUtil.fromArray(
						StringUtil.split(
							_SAP_ENTRY_ALLOWED_SERVICE_SIGNATURES,
							StringPool.NEW_LINE)))) {

				return;
			}

			_sapEntryLocalService.updateSAPEntry(
				sapEntry.getSapEntryId(), _SAP_ENTRY_ALLOWED_SERVICE_SIGNATURES,
				sapEntry.isDefaultSAPEntry(), sapEntry.isEnabled(),
				sapEntry.getName(), sapEntry.getTitleMap(),
				new ServiceContext());
		}
		catch (PortalException portalException) {
			_log.error(
				"Unable to add or update service access policy entry for " +
					"company " + companyId,
				portalException);
		}
	}

	private List<String> _getScopeAliasesList(long companyId) {
		Collection<String> scopeAliases = _scopeLocator.getScopeAliases(
			companyId);

		return ListUtil.filter(_scopeAliasesList, scopeAliases::contains);
	}

	private void _updateScopeAliases(OAuth2Application oAuth2Application)
		throws PortalException {

		List<String> scopeAliasesList = _getScopeAliasesList(
			oAuth2Application.getCompanyId());

		List<String> currentScopeAliasesList =
			_oAuth2ApplicationScopeAliasesLocalService.getScopeAliasesList(
				oAuth2Application.getOAuth2ApplicationScopeAliasesId());

		if (Objects.equals(
				SetUtil.fromList(currentScopeAliasesList),
				SetUtil.fromList(scopeAliasesList))) {

			return;
		}

		_oAuth2ApplicationLocalService.updateScopeAliases(
			oAuth2Application.getUserId(), oAuth2Application.getUserName(),
			oAuth2Application.getOAuth2ApplicationId(), scopeAliasesList);
	}

	private static final String _OAUTH2_APPLICATION_EXTERNAL_REFERENCE_CODE =
		"AI-HUB-CELL";

	private static final String _SAP_ENTRY_ALLOWED_SERVICE_SIGNATURES =
		"com.liferay.portal.search.rest.internal.resource.v1_0." +
			"SearchResultResourceImpl#getSearchPage";

	private static final String _SAP_ENTRY_NAME = "AI_HUB_CELL_TOKEN";

	private static final Log _log = LogFactoryUtil.getLog(
		AIHubCellProvisionerImpl.class);

	private static final List<String> _scopeAliasesList = Arrays.asList(
		"Liferay.Bulk.REST.everything.write",
		"Liferay.Headless.Admin.Taxonomy.everything.read",
		"Liferay.Headless.Admin.User.everything.read",
		"Liferay.Headless.Batch.Engine.everything",
		"Liferay.Headless.CMP.everything.read",
		"Liferay.Object.Admin.REST.everything.read",
		"Liferay.Portal.Search.REST.everything.read",
		"cmpprojectlink.everything");

	@Reference
	private CompanyLocalService _companyLocalService;

	@Reference
	private OAuth2ApplicationLocalService _oAuth2ApplicationLocalService;

	@Reference
	private OAuth2ApplicationScopeAliasesLocalService
		_oAuth2ApplicationScopeAliasesLocalService;

	@Reference
	private SAPEntryLocalService _sapEntryLocalService;

	@Reference
	private ScopeLocator _scopeLocator;

	@Reference
	private UserLocalService _userLocalService;

}