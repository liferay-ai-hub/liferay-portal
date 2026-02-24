/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.account.util;

import com.liferay.account.constants.AccountConstants;
import com.liferay.account.model.AccountEntry;
import com.liferay.account.service.AccountEntryLocalServiceUtil;
import com.liferay.portal.kernel.dao.orm.QueryUtil;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.util.ArrayUtil;
import com.liferay.portal.kernel.util.ListUtil;
import com.liferay.portal.kernel.workflow.WorkflowConstants;

import java.util.List;

/**
 * @author Feliphe Marinho
 */
public class AccountEntryPermissionUtil {

	public static List<AccountEntry> getUserAccountEntries(long userId)
		throws PortalException {

		return AccountEntryLocalServiceUtil.getUserAccountEntries(
			userId, AccountConstants.PARENT_ACCOUNT_ENTRY_ID_DEFAULT, null,
			AccountConstants.ACCOUNT_ENTRY_TYPES_DEFAULT_ALLOWED_TYPES,
			WorkflowConstants.STATUS_APPROVED, QueryUtil.ALL_POS,
			QueryUtil.ALL_POS);
	}

	public static boolean isUserAccountEntry(long accountEntryId, long userId)
		throws PortalException {

		return ArrayUtil.contains(
			ListUtil.toLongArray(
				getUserAccountEntries(userId), AccountEntry::getAccountEntryId),
			accountEntryId);
	}

}