/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.secure;

import java.util.Map;

/**
 * @author Guilherme Camacho
 */
public interface CredentialSecureSharingClient {

	public String share(
			long companyId, Map<String, String> fields,
			String recipientEmailAddress)
		throws Exception;

}