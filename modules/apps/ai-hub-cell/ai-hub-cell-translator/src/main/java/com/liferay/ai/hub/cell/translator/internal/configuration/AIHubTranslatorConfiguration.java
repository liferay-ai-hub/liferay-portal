/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.translator.internal.configuration;

import aQute.bnd.annotation.metatype.Meta;

import com.liferay.portal.configuration.metatype.annotations.ExtendedObjectClassDefinition;

/**
 * @author Carolina Barbosa
 */
@ExtendedObjectClassDefinition(
	category = "translation", featureFlagKey = "LPD-62272",
	scope = ExtendedObjectClassDefinition.Scope.COMPANY
)
@Meta.OCD(
	id = "com.liferay.ai.hub.cell.translator.internal.configuration.AIHubTranslatorConfiguration",
	localization = "content/Language",
	name = "ai-hub-translator-configuration-name"
)
public interface AIHubTranslatorConfiguration {

	@Meta.AD(
		deflt = "false",
		description = "enabled-description[ai-hub-translation]",
		name = "enabled", required = false
	)
	public boolean enabled();

}