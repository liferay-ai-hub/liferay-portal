/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.web.internal.filter;

import com.liferay.ai.hub.web.internal.constants.AIHubFDSNames;
import com.liferay.frontend.data.set.filter.BaseSelectionFDSFilter;
import com.liferay.frontend.data.set.filter.FDSFilter;
import com.liferay.frontend.data.set.filter.SelectionFDSFilterItem;
import com.liferay.portal.kernel.dao.orm.DynamicQuery;
import com.liferay.portal.kernel.dao.orm.ProjectionFactoryUtil;
import com.liferay.portal.kernel.dao.orm.RestrictionsFactoryUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.security.auth.CompanyThreadLocal;
import com.liferay.portal.workflow.kaleo.service.KaleoLogLocalService;

import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Eugenio Ortiz
 */
@Component(
	property = "frontend.data.set.name=" + AIHubFDSNames.METRICS_ACTIVITIES,
	service = FDSFilter.class
)
public class MetricsActivityUserSelectionFDSFilter
	extends BaseSelectionFDSFilter {

	@Override
	public String getId() {
		return "userName";
	}

	@Override
	public String getLabel() {
		return "user";
	}

	@Override
	public List<SelectionFDSFilterItem> getSelectionFDSFilterItems(
		Locale locale) {

		try {
			DynamicQuery dynamicQuery = _kaleoLogLocalService.dynamicQuery();

			dynamicQuery.add(
				RestrictionsFactoryUtil.eq(
					"companyId", CompanyThreadLocal.getCompanyId()));
			dynamicQuery.add(
				RestrictionsFactoryUtil.eq("type", _NODE_USAGE_METADATA_TYPE));
			dynamicQuery.setProjection(
				ProjectionFactoryUtil.distinct(
					ProjectionFactoryUtil.property("userName")));

			List<String> userNames = _kaleoLogLocalService.dynamicQuery(
				dynamicQuery);

			return userNames.stream(
			).filter(
				name -> name != null && !name.isEmpty()
			).sorted(
			).map(
				name -> new SelectionFDSFilterItem(name, name)
			).collect(
				Collectors.toList()
			);
		}
		catch (Exception exception) {
			_log.error(exception);

			return Collections.emptyList();
		}
	}

	@Override
	public boolean isMultiple() {
		return false;
	}

	private static final String _NODE_USAGE_METADATA_TYPE =
		"NODE_USAGE_METADATA";

	private static final Log _log = LogFactoryUtil.getLog(
		MetricsActivityUserSelectionFDSFilter.class);

	@Reference
	private KaleoLogLocalService _kaleoLogLocalService;

}
