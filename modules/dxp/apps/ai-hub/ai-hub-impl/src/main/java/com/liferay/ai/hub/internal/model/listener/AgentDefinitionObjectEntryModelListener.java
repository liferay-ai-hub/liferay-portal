/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.model.listener;

import com.liferay.ai.hub.audit.constants.AIHubEventTypes;
import com.liferay.object.model.ObjectEntry;
import com.liferay.object.model.listener.RelevantObjectEntryModelListener;
import com.liferay.portal.kernel.audit.AuditRouter;
import com.liferay.portal.kernel.exception.ModelListenerException;
import com.liferay.portal.kernel.feature.flag.FeatureFlagManagerUtil;
import com.liferay.portal.kernel.model.BaseModelListener;
import com.liferay.portal.security.audit.event.generators.util.Attribute;
import com.liferay.portal.security.audit.event.generators.util.AuditMessageBuilder;

import java.io.Serializable;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Pedro Leite
 */
@Component(service = RelevantObjectEntryModelListener.class)
public class AgentDefinitionObjectEntryModelListener
	extends BaseModelListener<ObjectEntry>
	implements RelevantObjectEntryModelListener {

	@Override
	public String getObjectDefinitionExternalReferenceCode() {
		return "L_AI_HUB_AGENT_DEFINITION";
	}

	@Override
	public void onAfterUpdate(
			ObjectEntry originalObjectEntry, ObjectEntry objectEntry)
		throws ModelListenerException {

		if (!FeatureFlagManagerUtil.isEnabled(
				objectEntry.getCompanyId(), "LPD-62272")) {

			return;
		}

		List<Attribute> attributes = _getModifiedAttributes(
			originalObjectEntry.getValues(), objectEntry.getValues());

		if (attributes.isEmpty()) {
			return;
		}

		try {
			_auditRouter.route(
				AuditMessageBuilder.buildAuditMessage(
					AIHubEventTypes.AI_HUB_AGENT_CONFIG_CHANGE, objectEntry,
					attributes));
		}
		catch (Exception exception) {
			throw new ModelListenerException(exception);
		}
	}

	private List<Attribute> _getModifiedAttributes(
		Map<String, Serializable> originalValues,
		Map<String, Serializable> values) {

		List<Attribute> attributes = new ArrayList<>();

		for (Map.Entry<String, Serializable> entry : values.entrySet()) {
			Serializable originalValue = originalValues.get(entry.getKey());
			Serializable value = entry.getValue();

			if (!Objects.equals(originalValue, value)) {
				attributes.add(
					new Attribute(entry.getKey(), value, originalValue));
			}
		}

		return attributes;
	}

	@Reference
	private AuditRouter _auditRouter;

}