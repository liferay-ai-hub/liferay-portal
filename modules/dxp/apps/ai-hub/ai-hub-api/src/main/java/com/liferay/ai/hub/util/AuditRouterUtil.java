/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.util;

import com.liferay.account.model.AccountEntry;
import com.liferay.account.service.AccountEntryLocalServiceUtil;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.audit.AuditMessage;
import com.liferay.portal.kernel.audit.AuditRouter;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.util.PortalUtil;

import java.util.Date;

/**
 * @author Pedro Leite
 */
public class AuditRouterUtil {

	public static void route(
			JSONObject additionalInfoJSONObject, AuditRouter auditRouter,
			String className, long classPK, long companyId, String eventType,
			long userId)
		throws Exception {

		AccountEntry accountEntry = AccountEntryUtil.getUserAccountEntry(
			userId);

		if (accountEntry == null) {
			accountEntry =
				AccountEntryLocalServiceUtil.
					fetchAccountEntryByExternalReferenceCode(
						"L_AI_HUB", companyId);
		}

		long accountEntryGroupId = 0;
		long accountEntryId = 0;

		if (accountEntry != null) {
			accountEntryGroupId = accountEntry.getAccountEntryGroupId();
			accountEntryId = accountEntry.getAccountEntryId();
		}

		auditRouter.route(
			new AuditMessage(
				accountEntryGroupId, companyId, userId,
				PortalUtil.getUserName(userId, StringPool.BLANK), new Date(),
				accountEntryId, additionalInfoJSONObject, className,
				String.valueOf(classPK), null, eventType, null));
	}

}