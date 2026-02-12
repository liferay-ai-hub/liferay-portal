/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.web.internal.display.context;

import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.GroupConstants;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.Portal;
import com.liferay.portal.kernel.util.WebKeys;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

/**
 * @author Davyson Melo
 */
public class EditAgentDefinitionDisplayContext {

	public EditAgentDefinitionDisplayContext(
		HttpServletRequest httpServletRequest, Portal portal) {

		_httpServletRequest = httpServletRequest;
		_portal = portal;

		_themeDisplay = (ThemeDisplay)httpServletRequest.getAttribute(
			WebKeys.THEME_DISPLAY);
	}

	public String getAPIURL() {
		return "/o/ai-hub/v1.0/create-agent";
	}

	public String getBackURL(Company company) throws Exception {
		String basePortalURL = company.getPortalURL(
			GroupConstants.DEFAULT_PARENT_GROUP_ID);
		String path = "/web/ai-hub/ai-tasks";

		return basePortalURL + path;
	}

	public Map<String, Object> getReactData() throws Exception {
		return HashMapBuilder.<String, Object>put(
			"backURL", getBackURL(_themeDisplay.getCompany())
		).build();
	}

	private final HttpServletRequest _httpServletRequest;
	private final Portal _portal;
	private final ThemeDisplay _themeDisplay;

}