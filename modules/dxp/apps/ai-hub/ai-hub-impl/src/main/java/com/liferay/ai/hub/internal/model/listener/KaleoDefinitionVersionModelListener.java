/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.model.listener;

import com.liferay.ai.hub.audit.constants.AIHubEventTypes;
import com.liferay.object.constants.ObjectDefinitionConstants;
import com.liferay.object.model.ObjectDefinition;
import com.liferay.object.model.ObjectEntry;
import com.liferay.object.rest.filter.factory.FilterFactory;
import com.liferay.object.service.ObjectDefinitionLocalService;
import com.liferay.object.service.ObjectEntryLocalService;
import com.liferay.petra.sql.dsl.expression.Predicate;
import com.liferay.petra.string.StringBundler;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.audit.AuditRouter;
import com.liferay.portal.kernel.dao.orm.QueryUtil;
import com.liferay.portal.kernel.exception.ModelListenerException;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.feature.flag.FeatureFlagManagerUtil;
import com.liferay.portal.kernel.model.BaseModelListener;
import com.liferay.portal.kernel.model.ModelListener;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.ListUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.security.audit.event.generators.util.Attribute;
import com.liferay.portal.security.audit.event.generators.util.AuditMessageBuilder;
import com.liferay.portal.workflow.kaleo.model.KaleoDefinitionVersion;
import com.liferay.portal.workflow.kaleo.service.KaleoDefinitionVersionLocalService;

import java.util.List;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Pedro Leite
 */
@Component(service = ModelListener.class)
public class KaleoDefinitionVersionModelListener
	extends BaseModelListener<KaleoDefinitionVersion> {

	@Override
	public void onAfterCreate(KaleoDefinitionVersion kaleoDefinitionVersion)
		throws ModelListenerException {

		try {
			int[] versionParts = StringUtil.split(
				kaleoDefinitionVersion.getVersion(), StringPool.PERIOD, 0);

			int version = GetterUtil.getInteger(versionParts[0]);

			if ((version <= 1) ||
				!FeatureFlagManagerUtil.isEnabled(
					kaleoDefinitionVersion.getCompanyId(), "LPD-62272")) {

				return;
			}

			ObjectEntry objectEntry = _fetchObjectEntry(
				kaleoDefinitionVersion.getCompanyId(),
				kaleoDefinitionVersion.getName());

			if (objectEntry == null) {
				return;
			}

			KaleoDefinitionVersion originalKaleoDefinitionVersion =
				_kaleoDefinitionVersionLocalService.fetchKaleoDefinitionVersion(
					kaleoDefinitionVersion.getCompanyId(),
					kaleoDefinitionVersion.getName(), (version - 1) + ".0");

			if (originalKaleoDefinitionVersion == null) {
				return;
			}

			_auditRouter.route(
				AuditMessageBuilder.buildAuditMessage(
					AIHubEventTypes.AI_HUB_AGENT_CONFIG_CHANGE, objectEntry,
					List.of(
						new Attribute(
							"workflowDefinitionVersion", version, version - 1),
						new Attribute(
							"workflowDefinitionVersionContent",
							kaleoDefinitionVersion.getContent(),
							originalKaleoDefinitionVersion.getContent()))));
		}
		catch (PortalException portalException) {
			throw new ModelListenerException(portalException);
		}
	}

	private ObjectEntry _fetchObjectEntry(
			long companyId, String workflowDefinitionName)
		throws PortalException {

		ObjectDefinition objectDefinition =
			_objectDefinitionLocalService.
				fetchObjectDefinitionByExternalReferenceCode(
					"L_AI_HUB_AGENT_DEFINITION", companyId);

		if (objectDefinition == null) {
			return null;
		}

		List<Long> primaryKeys = _objectEntryLocalService.getPrimaryKeys(
			new Long[0], companyId, 0L,
			objectDefinition.getObjectDefinitionId(),
			_filterFactory.create(
				StringBundler.concat(
					"(workflowDefinitionName eq '", workflowDefinitionName,
					"')"),
				objectDefinition),
			false, null, QueryUtil.ALL_POS, QueryUtil.ALL_POS, null);

		if (ListUtil.isEmpty(primaryKeys)) {
			return null;
		}

		return _objectEntryLocalService.fetchObjectEntry(primaryKeys.get(0));
	}

	@Reference
	private AuditRouter _auditRouter;

	@Reference(
		target = "(filter.factory.key=" + ObjectDefinitionConstants.STORAGE_TYPE_DEFAULT + ")"
	)
	private FilterFactory<Predicate> _filterFactory;

	@Reference
	private KaleoDefinitionVersionLocalService
		_kaleoDefinitionVersionLocalService;

	@Reference
	private ObjectDefinitionLocalService _objectDefinitionLocalService;

	@Reference
	private ObjectEntryLocalService _objectEntryLocalService;

}