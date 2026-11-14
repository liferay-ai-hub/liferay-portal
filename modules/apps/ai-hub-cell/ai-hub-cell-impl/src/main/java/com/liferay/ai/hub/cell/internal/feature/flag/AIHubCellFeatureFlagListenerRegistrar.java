/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.internal.feature.flag;

import com.liferay.ai.hub.cell.configuration.AIHubCellConfiguration;
import com.liferay.ai.hub.cell.internal.oauth2.AIHubCellMCPOAuth2ApplicationUtil;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalService;
import com.liferay.portal.configuration.module.configuration.ConfigurationProvider;
import com.liferay.portal.kernel.feature.flag.FeatureFlag;
import com.liferay.portal.kernel.feature.flag.FeatureFlagListener;
import com.liferay.portal.kernel.feature.flag.FeatureFlagManager;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.module.configuration.ConfigurationException;
import com.liferay.portal.kernel.service.CompanyLocalService;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.util.ArrayUtil;
import com.liferay.portal.kernel.util.MapUtil;

import java.util.List;

import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Iliyan Peychev
 */
@Component(service = {})
public class AIHubCellFeatureFlagListenerRegistrar {

	@Activate
	protected void activate(BundleContext bundleContext) {
		_serviceRegistration = bundleContext.registerService(
			FeatureFlagListener.class, new AIHubCellFeatureFlagListener(),
			MapUtil.singletonDictionary(
				"feature.flag.key", _FEATURE_FLAG_KEYS));
	}

	@Deactivate
	protected void deactivate() {
		_serviceRegistration.unregister();
	}

	private static final String[] _FEATURE_FLAG_KEYS = {
		"LPD-62272", "LPD-63311", "LPD-65213"
	};

	private static final Log _log = LogFactoryUtil.getLog(
		AIHubCellFeatureFlagListenerRegistrar.class);

	@Reference
	private CompanyLocalService _companyLocalService;

	@Reference
	private ConfigurationProvider _configurationProvider;

	@Reference
	private FeatureFlagManager _featureFlagManager;

	@Reference
	private OAuth2ApplicationLocalService _oAuth2ApplicationLocalService;

	private ServiceRegistration<FeatureFlagListener> _serviceRegistration;

	@Reference
	private UserLocalService _userLocalService;

	private class AIHubCellFeatureFlagListener implements FeatureFlagListener {

		@Override
		public void onValue(
			long companyId, String featureFlagKey, boolean enabled) {

			if (!enabled) {
				return;
			}

			Company company = _companyLocalService.fetchCompany(companyId);

			if (company == null) {
				return;
			}

			List<FeatureFlag> featureFlags =
				_featureFlagManager.getFeatureFlags(
					companyId,
					featureFlag ->
						featureFlag.isEnabled() &&
						ArrayUtil.contains(
							_FEATURE_FLAG_KEYS, featureFlag.getKey()));

			if (featureFlags.size() != _FEATURE_FLAG_KEYS.length) {
				return;
			}

			try {
				AIHubCellConfiguration aiHubCellConfiguration =
					_configurationProvider.getCompanyConfiguration(
						AIHubCellConfiguration.class, companyId);

				AIHubCellMCPOAuth2ApplicationUtil.
					addOrUpdateMCPOAuth2Application(
						companyId, aiHubCellConfiguration.serviceURL(),
						_oAuth2ApplicationLocalService, _userLocalService);
			}
			catch (ConfigurationException configurationException) {
				_log.error(configurationException);
			}
		}

	}

}