/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.configuration;

import aQute.bnd.annotation.metatype.Meta;

import com.liferay.portal.configuration.metatype.annotations.ExtendedObjectClassDefinition;

/**
 * @author Guilherme Camacho
 */
@ExtendedObjectClassDefinition(
	category = "ai-hub", featureFlagKey = "LPD-62272",
	scope = ExtendedObjectClassDefinition.Scope.COMPANY
)
@Meta.OCD(
	id = "com.liferay.ai.hub.configuration.OnePasswordConfiguration",
	localization = "content/Language", name = "one-password-configuration-name"
)
public interface OnePasswordConfiguration {

	@Meta.AD(name = "access-token", required = false, type = Meta.Type.Password)
	public String accessToken();

	@Meta.AD(name = "service-url", required = false)
	public String serviceURL();

	@Meta.AD(deflt = "7", name = "share-expiration-days", required = false)
	public int shareExpirationDays();

}