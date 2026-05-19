/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.model.listener.test;

import com.liferay.account.model.AccountEntry;
import com.liferay.ai.hub.audit.constants.AIHubEventTypes;
import com.liferay.arquillian.extension.junit.bridge.junit.Arquillian;
import com.liferay.portal.kernel.audit.AuditMessage;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.model.ModelListener;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.test.util.TestPropsValues;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.MapUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.workflow.WorkflowDefinition;
import com.liferay.portal.test.rule.FeatureFlag;
import com.liferay.portal.test.rule.Inject;
import com.liferay.portal.workflow.constants.WorkflowDefinitionConstants;
import com.liferay.portal.workflow.manager.WorkflowDefinitionManager;

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
public class KaleoDefinitionVersionModelListenerTest
	extends BaseModelListenerTestCase {

	@Test
	public void testOnAfterCreate() throws Exception {
		String workflowDefinitionName = MapUtil.getString(
			objectEntry.getValues(), "workflowDefinitionName");

		WorkflowDefinition workflowDefinition =
			_workflowDefinitionManager.getLatestWorkflowDefinition(
				TestPropsValues.getCompanyId(), workflowDefinitionName);

		String content = StringUtil.replaceFirst(
			workflowDefinition.getContent(), "</prompt>",
			"<![CDATA[" + RandomTestUtil.randomString() + "]]></prompt>");

		AccountEntry accountEntry =
			accountEntryLocalService.getAccountEntryByExternalReferenceCode(
				"L_AI_HUB", TestPropsValues.getCompanyId());

		_workflowDefinitionManager.deployWorkflowDefinition(
			content.getBytes(), TestPropsValues.getCompanyId(), null,
			accountEntry.getAccountEntryGroupId(), workflowDefinitionName,
			WorkflowDefinitionConstants.SCOPE_AI, workflowDefinition.getTitle(),
			TestPropsValues.getUserId());

		AuditMessage auditMessage = auditMessages.poll();

		JSONAssert.assertEquals(
			JSONUtil.put(
				"attributes",
				JSONUtil.putAll(
					JSONUtil.put(
						"name", "workflowDefinitionVersion"
					).put(
						"newValue", 2
					).put(
						"oldValue", 1
					),
					JSONUtil.put(
						"name", "workflowDefinitionVersionContent"
					).put(
						"newValue", content
					).put(
						"oldValue", workflowDefinition.getContent()
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
		return _modelListener;
	}

	@Inject(
		filter = "component.name=com.liferay.ai.hub.internal.model.listener.KaleoDefinitionVersionModelListener"
	)
	private ModelListener<?> _modelListener;

	@Inject
	private WorkflowDefinitionManager _workflowDefinitionManager;

}