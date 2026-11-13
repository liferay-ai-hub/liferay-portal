/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.internal.configuration.persistence.listener;

import com.liferay.ai.hub.cell.configuration.AIHubCellConfiguration;
import com.liferay.ai.hub.cell.internal.provisioning.AIHubCellProvisioner;
import com.liferay.oauth2.provider.constants.ClientProfile;
import com.liferay.oauth2.provider.constants.GrantType;
import com.liferay.oauth2.provider.model.OAuth2Application;
import com.liferay.oauth2.provider.scope.liferay.ScopeLocator;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalService;
import com.liferay.oauth2.provider.service.OAuth2ApplicationScopeAliasesLocalService;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.configuration.module.configuration.ConfigurationProvider;
import com.liferay.portal.configuration.persistence.listener.ConfigurationModelListener;
import com.liferay.portal.configuration.persistence.listener.ConfigurationModelListenerException;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.feature.flag.FeatureFlagManagerUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.CompanyLocalService;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.LocaleThreadLocal;
import com.liferay.portal.kernel.util.ResourceBundleUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.security.service.access.policy.service.SAPEntryLocalService;

import java.util.Arrays;
import java.util.Dictionary;
import java.util.List;
import java.util.Objects;
import java.util.ResourceBundle;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Pedro Victor Silvestre
 * @author Rafael Praxedes
 */
@Component(
	property = "model.class.name=com.liferay.ai.hub.cell.configuration.AIHubCellConfiguration",
	service = ConfigurationModelListener.class
)
public class AIHubCellConfigurationModelListener
	implements ConfigurationModelListener {

	@Override
	public void onAfterSave(String pid, Dictionary<String, Object> properties) {
		long companyId = GetterUtil.getLong(properties.get("companyId"));

		Company company = _companyLocalService.fetchCompany(companyId);

		if (company == null) {
			return;
		}

		_aiHubCellProvisioner.provision(
			companyId, GetterUtil.getString(properties.get("serviceURL")));

		if (FeatureFlagManagerUtil.isEnabled(companyId, "LPD-62272") &&
			FeatureFlagManagerUtil.isEnabled(companyId, "LPD-63311") &&
			FeatureFlagManagerUtil.isEnabled(companyId, "LPD-65213")) {

			_addOrUpdateMCPOAuth2Application(
				company, GetterUtil.getString(properties.get("serviceURL")));
		}
	}

	@Override
	public void onBeforeSave(String pid, Dictionary<String, Object> properties)
		throws ConfigurationModelListenerException {

		String serviceURL = GetterUtil.getString(properties.get("serviceURL"));

		if (serviceURL.endsWith(StringPool.SLASH)) {
			throw new ConfigurationModelListenerException(
				_getMessage(
					"please-enter-a-service-url-that-does-not-end-with-a-" +
						"slash"),
				AIHubCellConfiguration.class, getClass(), properties);
		}
	}

	@Activate
	protected void activate() {
		_aiHubCellProvisioner = new AIHubCellProvisioner(
			_companyLocalService, _configurationProvider,
			_oAuth2ApplicationLocalService,
			_oAuth2ApplicationScopeAliasesLocalService, _sapEntryLocalService,
			_scopeLocator, _userLocalService);
	}

	@Deactivate
	protected void deactivate() {
		_aiHubCellProvisioner.stopWaitingForScopeAliases();
	}

	private void _addOrUpdateMCPOAuth2Application(
		Company company, String serviceURL) {

		if (Validator.isNull(serviceURL)) {
			return;
		}

		List<String> redirectURIsList = Arrays.asList(
			serviceURL + "/o/ai-hub-mcp/oauth2");

		try {
			OAuth2Application oAuth2Application =
				_oAuth2ApplicationLocalService.
					fetchOAuth2ApplicationByExternalReferenceCode(
						"AI-HUB-MCP", company.getCompanyId());

			if (oAuth2Application != null) {
				if (!Objects.equals(
						oAuth2Application.getRedirectURIsList(),
						redirectURIsList)) {

					oAuth2Application.setRedirectURIsList(redirectURIsList);

					_oAuth2ApplicationLocalService.updateOAuth2Application(
						oAuth2Application);
				}

				return;
			}

			User user = _userLocalService.fetchUserByScreenName(
				company.getCompanyId(), "default-service-account");

			if (user == null) {
				return;
			}

			_oAuth2ApplicationLocalService.addOrUpdateOAuth2Application(
				"AI-HUB-MCP", user.getUserId(), user.getScreenName(),
				Arrays.asList(GrantType.AUTHORIZATION_CODE_PKCE), "none",
				user.getUserId(), "ai-hub-mcp",
				ClientProfile.USER_AGENT_APPLICATION.id(), null, null, null,
				null, 0, null, "AI Hub MCP", null, redirectURIsList, false,
				Arrays.asList("Liferay.MCP.Server.everything"), false,
				new ServiceContext());
		}
		catch (PortalException portalException) {
			_log.error(
				"Unable to add or update MCP OAuth2 application for company " +
					company.getCompanyId(),
				portalException);
		}
	}

	private String _getMessage(String key) {
		try {
			return ResourceBundleUtil.getString(_getResourceBundle(), key);
		}
		catch (Exception exception) {
			if (_log.isDebugEnabled()) {
				_log.debug(exception);
			}

			return null;
		}
	}

	private ResourceBundle _getResourceBundle() {
		return ResourceBundleUtil.getBundle(
			"content.Language", LocaleThreadLocal.getThemeDisplayLocale(),
			getClass());
	}

	private static final Log _log = LogFactoryUtil.getLog(
		AIHubCellConfigurationModelListener.class);

	private AIHubCellProvisioner _aiHubCellProvisioner;

	@Reference
	private CompanyLocalService _companyLocalService;

	@Reference
	private ConfigurationProvider _configurationProvider;

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