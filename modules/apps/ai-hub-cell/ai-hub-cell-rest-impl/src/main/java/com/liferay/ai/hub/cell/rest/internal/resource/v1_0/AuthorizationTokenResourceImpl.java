/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.rest.internal.resource.v1_0;

import com.liferay.ai.hub.cell.configuration.AIHubCellConfiguration;
import com.liferay.ai.hub.cell.exception.AIHubCellConfigurationException;
import com.liferay.ai.hub.cell.rest.dto.v1_0.AuthorizationToken;
import com.liferay.ai.hub.cell.rest.internal.security.JWTTokenUtil;
import com.liferay.ai.hub.cell.rest.internal.web.cache.AIHubCellAccessTokenWebCacheItem;
import com.liferay.ai.hub.cell.rest.resource.v1_0.AuthorizationTokenResource;
import com.liferay.portal.configuration.module.configuration.ConfigurationProvider;
import com.liferay.portal.kernel.feature.flag.FeatureFlagManagerUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.util.Validator;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ServiceScope;

/**
 * @author Feliphe Marinho
 */
@Component(
	properties = "OSGI-INF/liferay/rest/v1_0/authorization-token.properties",
	scope = ServiceScope.PROTOTYPE, service = AuthorizationTokenResource.class
)
public class AuthorizationTokenResourceImpl
	extends BaseAuthorizationTokenResourceImpl {

	@Override
	public AuthorizationToken postAuthorizationToken() throws Exception {
		if (!FeatureFlagManagerUtil.isEnabled(
				contextCompany.getCompanyId(), "LPD-62272")) {

			throw new UnsupportedOperationException(
				"AI Hub feature is not enabled");
		}

		AIHubCellConfiguration aiHubCellConfiguration =
			_configurationProvider.getCompanyConfiguration(
				AIHubCellConfiguration.class, contextCompany.getCompanyId());

		if (Validator.isBlank(aiHubCellConfiguration.serviceURL()) ||
			Validator.isBlank(aiHubCellConfiguration.clientId()) ||
			Validator.isBlank(aiHubCellConfiguration.clientSecret())) {

			throw new AIHubCellConfigurationException(
				"AI Hub Cell is not configured. Please check service URL, " +
					"client ID, and client secret in System Settings.");
		}

		JSONObject jsonObject = AIHubCellAccessTokenWebCacheItem.get(
			aiHubCellConfiguration, contextCompany.getCompanyId());

		if (jsonObject == null) {
			throw new AIHubCellConfigurationException(
				"Unable to obtain access token from AI Hub service. Please " +
					"verify the service URL and credentials in System " +
						"Settings.");
		}

		return new AuthorizationToken() {
			{
				setAccessToken(() -> jsonObject.getString("access_token"));
				setScope(() -> jsonObject.getString("scope"));
				setServiceURL(aiHubCellConfiguration::serviceURL);
				setUserToken(JWTTokenUtil::generateToken);
			}
		};
	}

	@Reference
	private ConfigurationProvider _configurationProvider;

}