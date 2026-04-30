/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.web.internal.display.context;

import com.liferay.account.model.AccountEntry;
import com.liferay.ai.hub.cell.configuration.AIHubCellConfiguration;
import com.liferay.ai.hub.util.AccountEntryUtil;
import com.liferay.ai.hub.web.internal.util.ActionUtil;
import com.liferay.portal.configuration.module.configuration.ConfigurationProvider;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.module.configuration.ConfigurationException;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.util.WebKeys;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

/**
 * @author José Abelenda
 */
public class EditChatbotDisplayContext {

	public EditChatbotDisplayContext(
		ConfigurationProvider configurationProvider,
		HttpServletRequest httpServletRequest) {

		_configurationProvider = configurationProvider;
		_httpServletRequest = httpServletRequest;

		_themeDisplay = (ThemeDisplay)httpServletRequest.getAttribute(
			WebKeys.THEME_DISPLAY);
	}

	public Map<String, Object> getReactData() throws Exception {
		return HashMapBuilder.<String, Object>put(
			"accountEntryExternalReferenceCode",
			() -> {
				AccountEntry accountEntry =
					AccountEntryUtil.getUserAccountEntry(
						_themeDisplay.getUserId());

				if (accountEntry == null) {
					return null;
				}

				return accountEntry.getExternalReferenceCode();
			}
		).put(
			"backURL", ActionUtil.getAIHubURL(_themeDisplay) + "/chatbots"
		).put(
			"externalReferenceCode",
			_httpServletRequest.getParameter("externalReferenceCode")
		).put(
			"serviceURL", _getServiceURL()
		).build();
	}

	private String _getServiceURL() {
		try {
			AIHubCellConfiguration aiHubCellConfiguration =
				_configurationProvider.getCompanyConfiguration(
					AIHubCellConfiguration.class, _themeDisplay.getCompanyId());

			String serviceURL = aiHubCellConfiguration.serviceURL();

			if (Validator.isNotNull(serviceURL) && serviceURL.endsWith("/")) {
				serviceURL = serviceURL.substring(0, serviceURL.length() - 1);
			}

			return serviceURL;
		}
		catch (ConfigurationException configurationException) {
			_log.error(configurationException);

			return "";
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(
		EditChatbotDisplayContext.class);

	private final ConfigurationProvider _configurationProvider;
	private final HttpServletRequest _httpServletRequest;
	private final ThemeDisplay _themeDisplay;

}