/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.model.listener;

import com.liferay.account.model.AccountEntry;
import com.liferay.account.service.AccountEntryUserRelLocalService;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.exception.ModelListenerException;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.model.BaseModelListener;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.ModelListener;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.model.UserConstants;
import com.liferay.portal.kernel.service.CompanyLocalService;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.util.LocaleUtil;

import java.util.Calendar;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Feliphe Marinho
 */
@Component(service = ModelListener.class)
public class AccountEntryModelListener extends BaseModelListener<AccountEntry> {

	@Override
	public void onAfterCreate(AccountEntry accountEntry)
		throws ModelListenerException {

		try {
			Company company = _companyLocalService.getCompany(
				accountEntry.getCompanyId());

			String screenName =
				accountEntry.getExternalReferenceCode() + "-service-account";

			User user = _userLocalService.addUser(
				UserConstants.USER_ID_DEFAULT, company.getCompanyId(), true,
				null, null, false, screenName,
				screenName + StringPool.AT + company.getMx(),
				LocaleUtil.getDefault(), screenName, StringPool.BLANK,
				screenName, 0, 0, true, Calendar.JANUARY, 1, 1970,
				StringPool.BLANK, UserConstants.TYPE_SERVICE_ACCOUNT, null,
				null, null, null, false, new ServiceContext());

			user.setPasswordReset(false);
			user.setEmailAddressVerified(true);

			user = _userLocalService.updateUser(user);

			ServiceContext serviceContext = new ServiceContext();

			serviceContext.setCompanyId(company.getCompanyId());
			serviceContext.setLanguageId(user.getLanguageId());
			serviceContext.setUserId(user.getUserId());

			// TODO it is not relating, probably due to cache

			/*_accountEntryUserRelLocalService.addAccountEntryUserRel(
				accountEntry.getAccountEntryId(), user.getUserId());*/
		}
		catch (PortalException portalException) {
			throw new ModelListenerException(portalException);
		}
	}

	@Reference
	private AccountEntryUserRelLocalService _accountEntryUserRelLocalService;

	@Reference
	private CompanyLocalService _companyLocalService;

	@Reference
	private UserLocalService _userLocalService;

}