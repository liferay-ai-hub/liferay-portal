/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.model.listener.test;

import com.liferay.ai.hub.audit.constants.AIHubEventTypes;
import com.liferay.arquillian.extension.junit.bridge.junit.Arquillian;
import com.liferay.object.model.listener.RelevantObjectEntryModelListener;
import com.liferay.portal.kernel.audit.AuditMessage;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.model.ModelListener;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.test.util.ServiceContextTestUtil;
import com.liferay.portal.kernel.test.util.TestPropsValues;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.HashMapBuilder;
import com.liferay.portal.kernel.util.MapUtil;
import com.liferay.portal.test.rule.FeatureFlag;
import com.liferay.portal.test.rule.Inject;

import java.io.Serializable;

import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;

/**
 * @author Pedro Leite
 */
@FeatureFlag("LPD-62272")
@RunWith(Arquillian.class)
public class AgentDefinitionObjectEntryModelListenerTest
	extends BaseModelListenerTestCase {

	@Test
	public void testOnAfterUpdate() throws Exception {
		Map<String, Serializable> values = objectEntry.getValues();

		String description = RandomTestUtil.randomString();
		String inputVariables = RandomTestUtil.randomString();
		String outputVariable = RandomTestUtil.randomString();
		String title = RandomTestUtil.randomString();

		objectEntryLocalService.partialUpdateObjectEntry(
			TestPropsValues.getUserId(), objectEntry.getObjectEntryId(), 0L,
			HashMapBuilder.<String, Serializable>put(
				"description", description
			).put(
				"inputVariables", inputVariables
			).put(
				"outputVariable", outputVariable
			).put(
				"title_i18n",
				HashMapBuilder.put(
					"en_US", title
				).build()
			).build(),
			ServiceContextTestUtil.getServiceContext());

		AuditMessage auditMessage = auditMessages.poll();

		JSONAssert.assertEquals(
			JSONUtil.put(
				"attributes",
				JSONUtil.putAll(
					JSONUtil.put(
						"name", "description"
					).put(
						"newValue", description
					).put(
						"oldValue", MapUtil.getString(values, "description")
					),
					JSONUtil.put(
						"name", "inputVariables"
					).put(
						"newValue", inputVariables
					).put(
						"oldValue", MapUtil.getString(values, "inputVariables")
					),
					JSONUtil.put(
						"name", "outputVariable"
					).put(
						"newValue", outputVariable
					).put(
						"oldValue", MapUtil.getString(values, "outputVariable")
					),
					JSONUtil.put(
						"name", "title"
					).put(
						"newValue", title
					).put(
						"oldValue", MapUtil.getString(values, "title")
					),
					JSONUtil.put(
						"name", "title_i18n"
					).put(
						"newValue",
						HashMapBuilder.put(
							"en_US", title
						).build()
					).put(
						"oldValue",
						HashMapBuilder.put(
							"en_US", MapUtil.getString(values, "title")
						).build()
					))
			).toString(),
			String.valueOf(auditMessage.getAdditionalInfo()),
			JSONCompareMode.LENIENT);

		Assert.assertEquals(
			AIHubEventTypes.AI_HUB_AGENT_CONFIG_CHANGE,
			auditMessage.getEventType());
		Assert.assertEquals(
			objectEntry.getModelClassName(), auditMessage.getClassName());
		Assert.assertEquals(
			objectEntry.getObjectEntryId(),
			GetterUtil.getLong(auditMessage.getClassPK()));
	}

	@Override
	protected ModelListener<?> getModelListener() {
		return _relevantObjectEntryModelListener;
	}

	@Inject(
		filter = "component.name=com.liferay.ai.hub.internal.model.listener.AgentDefinitionObjectEntryModelListener"
	)
	private RelevantObjectEntryModelListener _relevantObjectEntryModelListener;

}