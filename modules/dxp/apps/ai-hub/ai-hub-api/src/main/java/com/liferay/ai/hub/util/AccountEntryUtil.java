/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.util;

import com.liferay.account.model.AccountEntry;
import com.liferay.account.util.AccountEntryPermissionUtil;

import java.util.List;
import java.util.Objects;

/**
 * @author Feliphe Marinho
 */
public class AccountEntryUtil {

	public static AccountEntry getUserAccountEntry(long userId)
		throws Exception {

		List<AccountEntry> accountEntries =
			AccountEntryPermissionUtil.getUserAccountEntries(userId);

		if (accountEntries.isEmpty()) {
			return null;
		}

		for (AccountEntry accountEntry : accountEntries) {
			if (!Objects.equals(
					accountEntry.getExternalReferenceCode(), "L_AI_HUB")) {

				return accountEntry;
			}
		}

		return null;
	}

}