/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.internal.oauth2;

import com.liferay.oauth2.provider.constants.ClientProfile;
import com.liferay.oauth2.provider.constants.GrantType;
import com.liferay.oauth2.provider.model.OAuth2Application;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalService;
import com.liferay.petra.string.StringBundler;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.util.Validator;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

/**
 * @author Iliyan Peychev
 */
public class AIHubCellMCPOAuth2ApplicationUtil {

	public static void addOrUpdateMCPOAuth2Application(
		long companyId, String serviceURL,
		OAuth2ApplicationLocalService oAuth2ApplicationLocalService,
		UserLocalService userLocalService) {

		if (Validator.isNull(serviceURL)) {
			return;
		}

		if (serviceURL.endsWith(StringPool.SLASH)) {
			serviceURL = serviceURL.substring(0, serviceURL.length() - 1);
		}

		try {
			List<String> redirectURIsList = Arrays.asList(
				serviceURL + "/o/ai-hub-mcp/oauth2");

			OAuth2Application oAuth2Application =
				oAuth2ApplicationLocalService.
					fetchOAuth2ApplicationByExternalReferenceCode(
						"AI-HUB-MCP", companyId);

			if (oAuth2Application != null) {
				if (!Objects.equals(
						oAuth2Application.getRedirectURIsList(),
						redirectURIsList)) {

					oAuth2Application.setRedirectURIsList(redirectURIsList);

					oAuth2ApplicationLocalService.updateOAuth2Application(
						oAuth2Application);
				}

				return;
			}

			User user = userLocalService.fetchUserByScreenName(
				companyId, "default-service-account");

			if (user == null) {
				if (_log.isWarnEnabled()) {
					_log.warn(
						StringBundler.concat(
							"Unable to add OAuth 2 application with client ID ",
							"\"ai-hub-mcp\" because company ", companyId,
							" has no default service account"));
				}

				return;
			}

			oAuth2ApplicationLocalService.addOrUpdateOAuth2Application(
				"AI-HUB-MCP", user.getUserId(), user.getScreenName(),
				Arrays.asList(GrantType.AUTHORIZATION_CODE_PKCE), "none",
				user.getUserId(), "ai-hub-mcp",
				ClientProfile.USER_AGENT_APPLICATION.id(), null, null, null,
				null, 0, null, "AI Hub MCP", null, redirectURIsList, false,
				Arrays.asList("Liferay.MCP.Server.everything"), false,
				new ServiceContext());
		}
		catch (Exception exception) {
			OAuth2Application oAuth2Application =
				oAuth2ApplicationLocalService.
					fetchOAuth2ApplicationByExternalReferenceCode(
						"AI-HUB-MCP", companyId);

			if (oAuth2Application != null) {
				if (_log.isDebugEnabled()) {
					_log.debug(
						"OAuth 2 application with client ID \"ai-hub-mcp\" " +
							"was added by another node for company " +
								companyId,
						exception);
				}

				return;
			}

			_log.error(
				"Unable to add or update OAuth 2 application with client ID " +
					"\"ai-hub-mcp\" for company " + companyId,
				exception);
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(
		AIHubCellMCPOAuth2ApplicationUtil.class);

}