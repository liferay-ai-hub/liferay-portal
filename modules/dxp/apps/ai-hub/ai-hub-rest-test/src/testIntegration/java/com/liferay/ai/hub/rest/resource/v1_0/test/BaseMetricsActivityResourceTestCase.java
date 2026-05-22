/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.rest.resource.v1_0.test;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.util.ISO8601DateFormat;

import com.liferay.ai.hub.rest.client.dto.v1_0.MetricsActivity;
import com.liferay.ai.hub.rest.client.http.HttpInvoker;
import com.liferay.ai.hub.rest.client.pagination.Page;
import com.liferay.ai.hub.rest.client.pagination.Pagination;
import com.liferay.ai.hub.rest.client.resource.v1_0.MetricsActivityResource;
import com.liferay.ai.hub.rest.client.serdes.v1_0.MetricsActivitySerDes;
import com.liferay.petra.function.UnsafeTriConsumer;
import com.liferay.petra.function.transform.TransformUtil;
import com.liferay.petra.reflect.ReflectionUtil;
import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.service.CompanyLocalServiceUtil;
import com.liferay.portal.kernel.test.util.GroupTestUtil;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.test.util.UserTestUtil;
import com.liferay.portal.kernel.util.ArrayUtil;
import com.liferay.portal.kernel.util.FastDateFormatFactoryUtil;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.util.PropsValues;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.util.Time;
import com.liferay.portal.odata.entity.EntityField;
import com.liferay.portal.odata.entity.EntityModel;
import com.liferay.portal.test.rule.Inject;
import com.liferay.portal.test.rule.LiferayIntegrationTestRule;
import com.liferay.portal.vulcan.resource.EntityModelResource;

import jakarta.annotation.Generated;

import jakarta.ws.rs.core.MultivaluedHashMap;

import java.lang.reflect.Method;

import java.text.Format;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;

/**
 * @author Feliphe Marinho
 * @generated
 */
@Generated("")
public abstract class BaseMetricsActivityResourceTestCase {

	@ClassRule
	@Rule
	public static final LiferayIntegrationTestRule liferayIntegrationTestRule =
		new LiferayIntegrationTestRule();

	@BeforeClass
	public static void setUpClass() throws Exception {
		_format = FastDateFormatFactoryUtil.getSimpleDateFormat(
			"yyyy-MM-dd'T'HH:mm:ss'Z'");
	}

	@Before
	public void setUp() throws Exception {
		irrelevantGroup = GroupTestUtil.addGroup();
		testGroup = GroupTestUtil.addGroup();

		testCompany = CompanyLocalServiceUtil.getCompany(
			testGroup.getCompanyId());

		_metricsActivityResource.setContextCompany(testCompany);

		_testCompanyAdminUser = UserTestUtil.getAdminUser(
			testCompany.getCompanyId());

		metricsActivityResource = MetricsActivityResource.builder(
		).authentication(
			_testCompanyAdminUser.getEmailAddress(),
			PropsValues.DEFAULT_ADMIN_PASSWORD
		).endpoint(
			testCompany.getVirtualHostname(),
			PortalUtil.getPortalServerPort(false), "http"
		).locale(
			LocaleUtil.getDefault()
		).build();
	}

	@After
	public void tearDown() throws Exception {
		GroupTestUtil.deleteGroup(irrelevantGroup);
		GroupTestUtil.deleteGroup(testGroup);
	}

	@Test
	public void testClientSerDesToDTO() throws Exception {
		ObjectMapper objectMapper = getClientSerDesObjectMapper();

		MetricsActivity metricsActivity1 = randomMetricsActivity();

		String json = objectMapper.writeValueAsString(metricsActivity1);

		MetricsActivity metricsActivity2 = MetricsActivitySerDes.toDTO(json);

		Assert.assertTrue(equals(metricsActivity1, metricsActivity2));
	}

	@Test
	public void testClientSerDesToJSON() throws Exception {
		ObjectMapper objectMapper = getClientSerDesObjectMapper();

		MetricsActivity metricsActivity = randomMetricsActivity();

		String json1 = objectMapper.writeValueAsString(metricsActivity);
		String json2 = MetricsActivitySerDes.toJSON(metricsActivity);

		Assert.assertEquals(
			objectMapper.readTree(json1), objectMapper.readTree(json2));
	}

	protected ObjectMapper getClientSerDesObjectMapper() {
		return new ObjectMapper() {
			{
				configure(MapperFeature.SORT_PROPERTIES_ALPHABETICALLY, true);
				configure(
					SerializationFeature.WRITE_ENUMS_USING_TO_STRING, true);
				enable(SerializationFeature.INDENT_OUTPUT);
				setDateFormat(new ISO8601DateFormat());
				setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
				setSerializationInclusion(JsonInclude.Include.NON_NULL);
				setVisibility(
					PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
				setVisibility(
					PropertyAccessor.GETTER, JsonAutoDetect.Visibility.NONE);
			}
		};
	}

	@Test
	public void testEscapeRegexInStringFields() throws Exception {
		String regex = "^[0-9]+(\\.[0-9]{1,2})\"?";

		MetricsActivity metricsActivity = randomMetricsActivity();

		metricsActivity.setAgentName(regex);
		metricsActivity.setNodeName(regex);
		metricsActivity.setOutput(regex);
		metricsActivity.setPromptInput(regex);
		metricsActivity.setUserMessage(regex);
		metricsActivity.setUserName(regex);

		String json = MetricsActivitySerDes.toJSON(metricsActivity);

		Assert.assertFalse(json.contains(regex));

		metricsActivity = MetricsActivitySerDes.toDTO(json);

		Assert.assertEquals(regex, metricsActivity.getAgentName());
		Assert.assertEquals(regex, metricsActivity.getNodeName());
		Assert.assertEquals(regex, metricsActivity.getOutput());
		Assert.assertEquals(regex, metricsActivity.getPromptInput());
		Assert.assertEquals(regex, metricsActivity.getUserMessage());
		Assert.assertEquals(regex, metricsActivity.getUserName());
	}

	@Test
	public void testGetMetricActivitiesPage() throws Exception {
		Page<MetricsActivity> page =
			metricsActivityResource.getMetricActivitiesPage(
				Pagination.of(1, 10), null);

		long totalCount = page.getTotalCount();

		MetricsActivity metricsActivity1 =
			testGetMetricActivitiesPage_addMetricsActivity(
				randomMetricsActivity());

		MetricsActivity metricsActivity2 =
			testGetMetricActivitiesPage_addMetricsActivity(
				randomMetricsActivity());

		page = metricsActivityResource.getMetricActivitiesPage(
			Pagination.of(1, 10), null);

		Assert.assertEquals(totalCount + 2, page.getTotalCount());

		assertContains(
			metricsActivity1, (List<MetricsActivity>)page.getItems());
		assertContains(
			metricsActivity2, (List<MetricsActivity>)page.getItems());
		assertValid(page, testGetMetricActivitiesPage_getExpectedActions());
	}

	protected Map<String, Map<String, String>>
			testGetMetricActivitiesPage_getExpectedActions()
		throws Exception {

		Map<String, Map<String, String>> expectedActions = new HashMap<>();

		return expectedActions;
	}

	@Test
	public void testGetMetricActivitiesPageWithPagination() throws Exception {
		Page<MetricsActivity> metricsActivitiesPage =
			metricsActivityResource.getMetricActivitiesPage(null, null);

		int totalCount = GetterUtil.getInteger(
			metricsActivitiesPage.getTotalCount());

		MetricsActivity metricsActivity1 =
			testGetMetricActivitiesPage_addMetricsActivity(
				randomMetricsActivity());

		MetricsActivity metricsActivity2 =
			testGetMetricActivitiesPage_addMetricsActivity(
				randomMetricsActivity());

		MetricsActivity metricsActivity3 =
			testGetMetricActivitiesPage_addMetricsActivity(
				randomMetricsActivity());

		// See com.liferay.portal.vulcan.internal.configuration.HeadlessAPICompanyConfiguration#pageSizeLimit

		int pageSizeLimit = 500;

		if (totalCount >= (pageSizeLimit - 2)) {
			Page<MetricsActivity> page1 =
				metricsActivityResource.getMetricActivitiesPage(
					Pagination.of(
						(int)Math.ceil((totalCount + 1.0) / pageSizeLimit),
						pageSizeLimit),
					null);

			Assert.assertEquals(totalCount + 3, page1.getTotalCount());

			assertContains(
				metricsActivity1, (List<MetricsActivity>)page1.getItems());

			Page<MetricsActivity> page2 =
				metricsActivityResource.getMetricActivitiesPage(
					Pagination.of(
						(int)Math.ceil((totalCount + 2.0) / pageSizeLimit),
						pageSizeLimit),
					null);

			assertContains(
				metricsActivity2, (List<MetricsActivity>)page2.getItems());

			Page<MetricsActivity> page3 =
				metricsActivityResource.getMetricActivitiesPage(
					Pagination.of(
						(int)Math.ceil((totalCount + 3.0) / pageSizeLimit),
						pageSizeLimit),
					null);

			assertContains(
				metricsActivity3, (List<MetricsActivity>)page3.getItems());
		}
		else {
			Page<MetricsActivity> page1 =
				metricsActivityResource.getMetricActivitiesPage(
					Pagination.of(1, totalCount + 2), null);

			List<MetricsActivity> metricsActivities1 =
				(List<MetricsActivity>)page1.getItems();

			Assert.assertEquals(
				metricsActivities1.toString(), totalCount + 2,
				metricsActivities1.size());

			Page<MetricsActivity> page2 =
				metricsActivityResource.getMetricActivitiesPage(
					Pagination.of(2, totalCount + 2), null);

			Assert.assertEquals(totalCount + 3, page2.getTotalCount());

			List<MetricsActivity> metricsActivities2 =
				(List<MetricsActivity>)page2.getItems();

			Assert.assertEquals(
				metricsActivities2.toString(), 1, metricsActivities2.size());

			Page<MetricsActivity> page3 =
				metricsActivityResource.getMetricActivitiesPage(
					Pagination.of(1, (int)totalCount + 3), null);

			assertContains(
				metricsActivity1, (List<MetricsActivity>)page3.getItems());
			assertContains(
				metricsActivity2, (List<MetricsActivity>)page3.getItems());
			assertContains(
				metricsActivity3, (List<MetricsActivity>)page3.getItems());
		}
	}

	@Test
	public void testGetMetricActivitiesPageWithSortDateTime() throws Exception {
		testGetMetricActivitiesPageWithSort(
			EntityField.Type.DATE_TIME,
			(entityField, metricsActivity1, metricsActivity2) -> {
				BeanTestUtil.setProperty(
					metricsActivity1, entityField.getName(),
					new Date(System.currentTimeMillis() - (2 * Time.MINUTE)));
			});
	}

	@Test
	public void testGetMetricActivitiesPageWithSortDouble() throws Exception {
		testGetMetricActivitiesPageWithSort(
			EntityField.Type.DOUBLE,
			(entityField, metricsActivity1, metricsActivity2) -> {
				BeanTestUtil.setProperty(
					metricsActivity1, entityField.getName(), 0.1);
				BeanTestUtil.setProperty(
					metricsActivity2, entityField.getName(), 0.5);
			});
	}

	@Test
	public void testGetMetricActivitiesPageWithSortInteger() throws Exception {
		testGetMetricActivitiesPageWithSort(
			EntityField.Type.INTEGER,
			(entityField, metricsActivity1, metricsActivity2) -> {
				BeanTestUtil.setProperty(
					metricsActivity1, entityField.getName(), 0);
				BeanTestUtil.setProperty(
					metricsActivity2, entityField.getName(), 1);
			});
	}

	@Test
	public void testGetMetricActivitiesPageWithSortString() throws Exception {
		testGetMetricActivitiesPageWithSort(
			EntityField.Type.STRING,
			(entityField, metricsActivity1, metricsActivity2) -> {
				Class<?> clazz = metricsActivity1.getClass();

				String entityFieldName = entityField.getName();

				Method method = clazz.getMethod(
					"get" + StringUtil.upperCaseFirstLetter(entityFieldName));

				Class<?> returnType = method.getReturnType();

				if (returnType.isAssignableFrom(Map.class)) {
					BeanTestUtil.setProperty(
						metricsActivity1, entityFieldName,
						Collections.singletonMap("Aaa", "Aaa"));
					BeanTestUtil.setProperty(
						metricsActivity2, entityFieldName,
						Collections.singletonMap("Bbb", "Bbb"));
				}
				else if (entityFieldName.contains("email")) {
					BeanTestUtil.setProperty(
						metricsActivity1, entityFieldName,
						"aaa" +
							StringUtil.toLowerCase(
								RandomTestUtil.randomString()) +
									"@liferay.com");
					BeanTestUtil.setProperty(
						metricsActivity2, entityFieldName,
						"bbb" +
							StringUtil.toLowerCase(
								RandomTestUtil.randomString()) +
									"@liferay.com");
				}
				else {
					BeanTestUtil.setProperty(
						metricsActivity1, entityFieldName,
						"aaa" +
							StringUtil.toLowerCase(
								RandomTestUtil.randomString()));
					BeanTestUtil.setProperty(
						metricsActivity2, entityFieldName,
						"bbb" +
							StringUtil.toLowerCase(
								RandomTestUtil.randomString()));
				}
			});
	}

	protected void testGetMetricActivitiesPageWithSort(
			EntityField.Type type,
			UnsafeTriConsumer
				<EntityField, MetricsActivity, MetricsActivity, Exception>
					unsafeTriConsumer)
		throws Exception {

		List<EntityField> entityFields = getEntityFields(type);

		if (entityFields.isEmpty()) {
			return;
		}

		MetricsActivity metricsActivity1 = randomMetricsActivity();
		MetricsActivity metricsActivity2 = randomMetricsActivity();

		for (EntityField entityField : entityFields) {
			unsafeTriConsumer.accept(
				entityField, metricsActivity1, metricsActivity2);
		}

		metricsActivity1 = testGetMetricActivitiesPage_addMetricsActivity(
			metricsActivity1);

		metricsActivity2 = testGetMetricActivitiesPage_addMetricsActivity(
			metricsActivity2);

		Page<MetricsActivity> page =
			metricsActivityResource.getMetricActivitiesPage(null, null);

		for (EntityField entityField : entityFields) {
			Page<MetricsActivity> ascPage =
				metricsActivityResource.getMetricActivitiesPage(
					Pagination.of(1, (int)page.getTotalCount() + 1),
					entityField.getName() + ":asc");

			assertContains(
				metricsActivity1, (List<MetricsActivity>)ascPage.getItems());
			assertContains(
				metricsActivity2, (List<MetricsActivity>)ascPage.getItems());

			Page<MetricsActivity> descPage =
				metricsActivityResource.getMetricActivitiesPage(
					Pagination.of(1, (int)page.getTotalCount() + 1),
					entityField.getName() + ":desc");

			assertContains(
				metricsActivity2, (List<MetricsActivity>)descPage.getItems());
			assertContains(
				metricsActivity1, (List<MetricsActivity>)descPage.getItems());
		}
	}

	protected MetricsActivity testGetMetricActivitiesPage_addMetricsActivity(
			MetricsActivity metricsActivity)
		throws Exception {

		throw new UnsupportedOperationException(
			"This method needs to be implemented");
	}

	@Test
	public void testBatchEngineDeleteImportTask() throws Exception {
		Assert.assertTrue(true);
	}

	protected void assertContains(
		MetricsActivity metricsActivity,
		List<MetricsActivity> metricsActivities) {

		boolean contains = false;

		for (MetricsActivity item : metricsActivities) {
			if (equals(metricsActivity, item)) {
				contains = true;

				break;
			}
		}

		Assert.assertTrue(
			metricsActivities + " does not contain " + metricsActivity,
			contains);
	}

	protected void assertHttpResponseStatusCode(
		int expectedHttpResponseStatusCode,
		HttpInvoker.HttpResponse actualHttpResponse) {

		Assert.assertEquals(
			expectedHttpResponseStatusCode, actualHttpResponse.getStatusCode());
	}

	protected void assertEquals(
		MetricsActivity metricsActivity1, MetricsActivity metricsActivity2) {

		Assert.assertTrue(
			metricsActivity1 + " does not equal " + metricsActivity2,
			equals(metricsActivity1, metricsActivity2));
	}

	protected void assertEquals(
		List<MetricsActivity> metricsActivities1,
		List<MetricsActivity> metricsActivities2) {

		Assert.assertEquals(
			metricsActivities1.size(), metricsActivities2.size());

		for (int i = 0; i < metricsActivities1.size(); i++) {
			MetricsActivity metricsActivity1 = metricsActivities1.get(i);
			MetricsActivity metricsActivity2 = metricsActivities2.get(i);

			assertEquals(metricsActivity1, metricsActivity2);
		}
	}

	protected void assertEqualsIgnoringOrder(
		List<MetricsActivity> metricsActivities1,
		List<MetricsActivity> metricsActivities2) {

		Assert.assertEquals(
			metricsActivities1.size(), metricsActivities2.size());

		for (MetricsActivity metricsActivity1 : metricsActivities1) {
			boolean contains = false;

			for (MetricsActivity metricsActivity2 : metricsActivities2) {
				if (equals(metricsActivity1, metricsActivity2)) {
					contains = true;

					break;
				}
			}

			Assert.assertTrue(
				metricsActivities2 + " does not contain " + metricsActivity1,
				contains);
		}
	}

	protected void assertValid(MetricsActivity metricsActivity)
		throws Exception {

		boolean valid = true;

		if (metricsActivity.getId() == null) {
			valid = false;
		}

		for (String additionalAssertFieldName :
				getAdditionalAssertFieldNames()) {

			if (Objects.equals("agentName", additionalAssertFieldName)) {
				if (metricsActivity.getAgentName() == null) {
					valid = false;
				}

				continue;
			}

			if (Objects.equals("date", additionalAssertFieldName)) {
				if (metricsActivity.getDate() == null) {
					valid = false;
				}

				continue;
			}

			if (Objects.equals("duration", additionalAssertFieldName)) {
				if (metricsActivity.getDuration() == null) {
					valid = false;
				}

				continue;
			}

			if (Objects.equals("inputTokensCount", additionalAssertFieldName)) {
				if (metricsActivity.getInputTokensCount() == null) {
					valid = false;
				}

				continue;
			}

			if (Objects.equals("nodeName", additionalAssertFieldName)) {
				if (metricsActivity.getNodeName() == null) {
					valid = false;
				}

				continue;
			}

			if (Objects.equals("output", additionalAssertFieldName)) {
				if (metricsActivity.getOutput() == null) {
					valid = false;
				}

				continue;
			}

			if (Objects.equals(
					"outputTokensCount", additionalAssertFieldName)) {

				if (metricsActivity.getOutputTokensCount() == null) {
					valid = false;
				}

				continue;
			}

			if (Objects.equals("promptInput", additionalAssertFieldName)) {
				if (metricsActivity.getPromptInput() == null) {
					valid = false;
				}

				continue;
			}

			if (Objects.equals("totalTokenCount", additionalAssertFieldName)) {
				if (metricsActivity.getTotalTokenCount() == null) {
					valid = false;
				}

				continue;
			}

			if (Objects.equals("userMessage", additionalAssertFieldName)) {
				if (metricsActivity.getUserMessage() == null) {
					valid = false;
				}

				continue;
			}

			if (Objects.equals("userName", additionalAssertFieldName)) {
				if (metricsActivity.getUserName() == null) {
					valid = false;
				}

				continue;
			}

			throw new IllegalArgumentException(
				"Invalid additional assert field name " +
					additionalAssertFieldName);
		}

		Assert.assertTrue(valid);
	}

	protected void assertValid(Page<MetricsActivity> page) {
		assertValid(page, Collections.emptyMap());
	}

	protected void assertValid(
		Page<MetricsActivity> page,
		Map<String, Map<String, String>> expectedActions) {

		boolean valid = false;

		java.util.Collection<MetricsActivity> metricsActivities =
			page.getItems();

		int size = metricsActivities.size();

		if ((page.getLastPage() > 0) && (page.getPage() > 0) &&
			(page.getPageSize() > 0) && (page.getTotalCount() > 0) &&
			(size > 0)) {

			valid = true;
		}

		Assert.assertTrue(valid);

		assertValid(page.getActions(), expectedActions);
	}

	protected void assertValid(
		Map<String, Map<String, String>> actions1,
		Map<String, Map<String, String>> actions2) {

		for (String key : actions2.keySet()) {
			Map action = actions1.get(key);

			Assert.assertNotNull(key + " does not contain an action", action);

			Map<String, String> expectedAction = actions2.get(key);

			Assert.assertEquals(
				expectedAction.get("method"), action.get("method"));
			Assert.assertEquals(expectedAction.get("href"), action.get("href"));
		}
	}

	protected String[] getAdditionalAssertFieldNames() {
		return new String[0];
	}

	protected List<GraphQLField> getGraphQLFields() throws Exception {
		List<GraphQLField> graphQLFields = new ArrayList<>();

		graphQLFields.add(new GraphQLField("id"));

		for (java.lang.reflect.Field field :
				getDeclaredFields(
					com.liferay.ai.hub.rest.dto.v1_0.MetricsActivity.class)) {

			if (!ArrayUtil.contains(
					getAdditionalAssertFieldNames(), field.getName())) {

				continue;
			}

			graphQLFields.addAll(getGraphQLFields(field));
		}

		return graphQLFields;
	}

	protected List<GraphQLField> getGraphQLFields(
			java.lang.reflect.Field... fields)
		throws Exception {

		List<GraphQLField> graphQLFields = new ArrayList<>();

		for (java.lang.reflect.Field field : fields) {
			com.liferay.portal.vulcan.graphql.annotation.GraphQLField
				vulcanGraphQLField = field.getAnnotation(
					com.liferay.portal.vulcan.graphql.annotation.GraphQLField.
						class);

			if (vulcanGraphQLField != null) {
				Class<?> clazz = field.getType();

				if (clazz.isArray()) {
					clazz = clazz.getComponentType();
				}

				List<GraphQLField> childrenGraphQLFields = getGraphQLFields(
					getDeclaredFields(clazz));

				graphQLFields.add(
					new GraphQLField(field.getName(), childrenGraphQLFields));
			}
		}

		return graphQLFields;
	}

	protected String[] getIgnoredEntityFieldNames() {
		return new String[0];
	}

	protected boolean equals(
		MetricsActivity metricsActivity1, MetricsActivity metricsActivity2) {

		if (metricsActivity1 == metricsActivity2) {
			return true;
		}

		for (String additionalAssertFieldName :
				getAdditionalAssertFieldNames()) {

			if (Objects.equals("agentName", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getAgentName(),
						metricsActivity2.getAgentName())) {

					return false;
				}

				continue;
			}

			if (Objects.equals("date", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getDate(),
						metricsActivity2.getDate())) {

					return false;
				}

				continue;
			}

			if (Objects.equals("duration", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getDuration(),
						metricsActivity2.getDuration())) {

					return false;
				}

				continue;
			}

			if (Objects.equals("id", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getId(), metricsActivity2.getId())) {

					return false;
				}

				continue;
			}

			if (Objects.equals("inputTokensCount", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getInputTokensCount(),
						metricsActivity2.getInputTokensCount())) {

					return false;
				}

				continue;
			}

			if (Objects.equals("nodeName", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getNodeName(),
						metricsActivity2.getNodeName())) {

					return false;
				}

				continue;
			}

			if (Objects.equals("output", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getOutput(),
						metricsActivity2.getOutput())) {

					return false;
				}

				continue;
			}

			if (Objects.equals(
					"outputTokensCount", additionalAssertFieldName)) {

				if (!Objects.deepEquals(
						metricsActivity1.getOutputTokensCount(),
						metricsActivity2.getOutputTokensCount())) {

					return false;
				}

				continue;
			}

			if (Objects.equals("promptInput", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getPromptInput(),
						metricsActivity2.getPromptInput())) {

					return false;
				}

				continue;
			}

			if (Objects.equals("totalTokenCount", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getTotalTokenCount(),
						metricsActivity2.getTotalTokenCount())) {

					return false;
				}

				continue;
			}

			if (Objects.equals("userMessage", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getUserMessage(),
						metricsActivity2.getUserMessage())) {

					return false;
				}

				continue;
			}

			if (Objects.equals("userName", additionalAssertFieldName)) {
				if (!Objects.deepEquals(
						metricsActivity1.getUserName(),
						metricsActivity2.getUserName())) {

					return false;
				}

				continue;
			}

			throw new IllegalArgumentException(
				"Invalid additional assert field name " +
					additionalAssertFieldName);
		}

		return true;
	}

	protected boolean equals(
		Map<String, Object> map1, Map<String, Object> map2) {

		if (Objects.equals(map1.keySet(), map2.keySet())) {
			for (Map.Entry<String, Object> entry : map1.entrySet()) {
				if (entry.getValue() instanceof Map) {
					if (!equals(
							(Map)entry.getValue(),
							(Map)map2.get(entry.getKey()))) {

						return false;
					}
				}
				else if (!Objects.deepEquals(
							entry.getValue(), map2.get(entry.getKey()))) {

					return false;
				}
			}

			return true;
		}

		return false;
	}

	protected java.lang.reflect.Field[] getDeclaredFields(Class clazz)
		throws Exception {

		if (clazz.getClassLoader() == null) {
			return new java.lang.reflect.Field[0];
		}

		return TransformUtil.transform(
			ReflectionUtil.getDeclaredFields(clazz),
			field -> {
				if (field.isSynthetic()) {
					return null;
				}

				return field;
			},
			java.lang.reflect.Field.class);
	}

	protected java.util.Collection<EntityField> getEntityFields()
		throws Exception {

		if (!(_metricsActivityResource instanceof EntityModelResource)) {
			throw new UnsupportedOperationException(
				"Resource is not an instance of EntityModelResource");
		}

		EntityModelResource entityModelResource =
			(EntityModelResource)_metricsActivityResource;

		EntityModel entityModel = entityModelResource.getEntityModel(
			new MultivaluedHashMap());

		if (entityModel == null) {
			return Collections.emptyList();
		}

		Map<String, EntityField> entityFieldsMap =
			entityModel.getEntityFieldsMap();

		return entityFieldsMap.values();
	}

	protected List<EntityField> getEntityFields(EntityField.Type type)
		throws Exception {

		return TransformUtil.transform(
			getEntityFields(),
			entityField -> {
				if (!Objects.equals(entityField.getType(), type) ||
					ArrayUtil.contains(
						getIgnoredEntityFieldNames(), entityField.getName())) {

					return null;
				}

				return entityField;
			});
	}

	protected String getFilterString(
		EntityField entityField, String operator,
		MetricsActivity metricsActivity) {

		StringBundler sb = new StringBundler();

		String entityFieldName = entityField.getName();

		sb.append(entityFieldName);

		sb.append(" ");
		sb.append(operator);
		sb.append(" ");

		if (entityFieldName.equals("agentName")) {
			Object object = metricsActivity.getAgentName();

			String value = String.valueOf(object);

			if (operator.equals("contains")) {
				sb = new StringBundler();

				sb.append("contains(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 2)) {
					sb.append(value.substring(1, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else if (operator.equals("startswith")) {
				sb = new StringBundler();

				sb.append("startswith(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 1)) {
					sb.append(value.substring(0, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else {
				sb.append("'");
				sb.append(value);
				sb.append("'");
			}

			return sb.toString();
		}

		if (entityFieldName.equals("date")) {
			if (operator.equals("between")) {
				Date date = metricsActivity.getDate();

				sb = new StringBundler();

				sb.append("(");
				sb.append(entityFieldName);
				sb.append(" gt ");
				sb.append(_format.format(date.getTime() - (2 * Time.SECOND)));
				sb.append(" and ");
				sb.append(entityFieldName);
				sb.append(" lt ");
				sb.append(_format.format(date.getTime() + (2 * Time.SECOND)));
				sb.append(")");
			}
			else {
				sb.append(entityFieldName);

				sb.append(" ");
				sb.append(operator);
				sb.append(" ");

				sb.append(_format.format(metricsActivity.getDate()));
			}

			return sb.toString();
		}

		if (entityFieldName.equals("duration")) {
			throw new IllegalArgumentException(
				"Invalid entity field " + entityFieldName);
		}

		if (entityFieldName.equals("id")) {
			throw new IllegalArgumentException(
				"Invalid entity field " + entityFieldName);
		}

		if (entityFieldName.equals("inputTokensCount")) {
			sb.append(String.valueOf(metricsActivity.getInputTokensCount()));

			return sb.toString();
		}

		if (entityFieldName.equals("nodeName")) {
			Object object = metricsActivity.getNodeName();

			String value = String.valueOf(object);

			if (operator.equals("contains")) {
				sb = new StringBundler();

				sb.append("contains(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 2)) {
					sb.append(value.substring(1, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else if (operator.equals("startswith")) {
				sb = new StringBundler();

				sb.append("startswith(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 1)) {
					sb.append(value.substring(0, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else {
				sb.append("'");
				sb.append(value);
				sb.append("'");
			}

			return sb.toString();
		}

		if (entityFieldName.equals("output")) {
			Object object = metricsActivity.getOutput();

			String value = String.valueOf(object);

			if (operator.equals("contains")) {
				sb = new StringBundler();

				sb.append("contains(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 2)) {
					sb.append(value.substring(1, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else if (operator.equals("startswith")) {
				sb = new StringBundler();

				sb.append("startswith(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 1)) {
					sb.append(value.substring(0, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else {
				sb.append("'");
				sb.append(value);
				sb.append("'");
			}

			return sb.toString();
		}

		if (entityFieldName.equals("outputTokensCount")) {
			sb.append(String.valueOf(metricsActivity.getOutputTokensCount()));

			return sb.toString();
		}

		if (entityFieldName.equals("promptInput")) {
			Object object = metricsActivity.getPromptInput();

			String value = String.valueOf(object);

			if (operator.equals("contains")) {
				sb = new StringBundler();

				sb.append("contains(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 2)) {
					sb.append(value.substring(1, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else if (operator.equals("startswith")) {
				sb = new StringBundler();

				sb.append("startswith(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 1)) {
					sb.append(value.substring(0, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else {
				sb.append("'");
				sb.append(value);
				sb.append("'");
			}

			return sb.toString();
		}

		if (entityFieldName.equals("totalTokenCount")) {
			sb.append(String.valueOf(metricsActivity.getTotalTokenCount()));

			return sb.toString();
		}

		if (entityFieldName.equals("userMessage")) {
			Object object = metricsActivity.getUserMessage();

			String value = String.valueOf(object);

			if (operator.equals("contains")) {
				sb = new StringBundler();

				sb.append("contains(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 2)) {
					sb.append(value.substring(1, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else if (operator.equals("startswith")) {
				sb = new StringBundler();

				sb.append("startswith(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 1)) {
					sb.append(value.substring(0, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else {
				sb.append("'");
				sb.append(value);
				sb.append("'");
			}

			return sb.toString();
		}

		if (entityFieldName.equals("userName")) {
			Object object = metricsActivity.getUserName();

			String value = String.valueOf(object);

			if (operator.equals("contains")) {
				sb = new StringBundler();

				sb.append("contains(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 2)) {
					sb.append(value.substring(1, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else if (operator.equals("startswith")) {
				sb = new StringBundler();

				sb.append("startswith(");
				sb.append(entityFieldName);
				sb.append(",'");

				if ((object != null) && (value.length() > 1)) {
					sb.append(value.substring(0, value.length() - 1));
				}
				else {
					sb.append(value);
				}

				sb.append("')");
			}
			else {
				sb.append("'");
				sb.append(value);
				sb.append("'");
			}

			return sb.toString();
		}

		throw new IllegalArgumentException(
			"Invalid entity field " + entityFieldName);
	}

	protected String invoke(String query) throws Exception {
		HttpInvoker httpInvoker = HttpInvoker.newHttpInvoker();

		httpInvoker.body(
			JSONUtil.put(
				"query", query
			).toString(),
			"application/json");
		httpInvoker.httpMethod(HttpInvoker.HttpMethod.POST);
		httpInvoker.path(
			"http://localhost:" + PortalUtil.getPortalServerPort(false) +
				"/o/graphql");
		httpInvoker.userNameAndPassword(
			"test@liferay.com:" + PropsValues.DEFAULT_ADMIN_PASSWORD);

		HttpInvoker.HttpResponse httpResponse = httpInvoker.invoke();

		return httpResponse.getContent();
	}

	protected JSONObject invokeGraphQLMutation(GraphQLField graphQLField)
		throws Exception {

		GraphQLField mutationGraphQLField = new GraphQLField(
			"mutation", graphQLField);

		return JSONFactoryUtil.createJSONObject(
			invoke(mutationGraphQLField.toString()));
	}

	protected JSONObject invokeGraphQLQuery(GraphQLField graphQLField)
		throws Exception {

		GraphQLField queryGraphQLField = new GraphQLField(
			"query", graphQLField);

		return JSONFactoryUtil.createJSONObject(
			invoke(queryGraphQLField.toString()));
	}

	protected MetricsActivity randomMetricsActivity() throws Exception {
		return new MetricsActivity() {
			{
				agentName = StringUtil.toLowerCase(
					RandomTestUtil.randomString());
				date = RandomTestUtil.nextDate();
				duration = RandomTestUtil.randomLong();
				id = RandomTestUtil.randomLong();
				inputTokensCount = RandomTestUtil.randomInt();
				nodeName = StringUtil.toLowerCase(
					RandomTestUtil.randomString());
				output = StringUtil.toLowerCase(RandomTestUtil.randomString());
				outputTokensCount = RandomTestUtil.randomInt();
				promptInput = StringUtil.toLowerCase(
					RandomTestUtil.randomString());
				totalTokenCount = RandomTestUtil.randomInt();
				userMessage = StringUtil.toLowerCase(
					RandomTestUtil.randomString());
				userName = StringUtil.toLowerCase(
					RandomTestUtil.randomString());
			}
		};
	}

	protected MetricsActivity randomIrrelevantMetricsActivity()
		throws Exception {

		MetricsActivity randomIrrelevantMetricsActivity =
			randomMetricsActivity();

		return randomIrrelevantMetricsActivity;
	}

	protected MetricsActivity randomPatchMetricsActivity() throws Exception {
		return randomMetricsActivity();
	}

	protected MetricsActivityResource metricsActivityResource;
	protected com.liferay.portal.kernel.model.Group irrelevantGroup;
	protected com.liferay.portal.kernel.model.Company testCompany;
	protected com.liferay.portal.kernel.model.Group testGroup;

	protected static class BeanTestUtil {

		public static void copyProperties(Object source, Object target)
			throws Exception {

			Class<?> sourceClass = source.getClass();

			Class<?> targetClass = target.getClass();

			for (java.lang.reflect.Field field :
					_getAllDeclaredFields(sourceClass)) {

				if (field.isSynthetic()) {
					continue;
				}

				Method getMethod = _getMethod(
					sourceClass, field.getName(), "get");

				try {
					Method setMethod = _getMethod(
						targetClass, field.getName(), "set",
						getMethod.getReturnType());

					setMethod.invoke(target, getMethod.invoke(source));
				}
				catch (Exception e) {
					continue;
				}
			}
		}

		public static boolean hasProperty(Object bean, String name) {
			Method setMethod = _getMethod(
				bean.getClass(), "set" + StringUtil.upperCaseFirstLetter(name));

			if (setMethod != null) {
				return true;
			}

			return false;
		}

		public static void setProperty(Object bean, String name, Object value)
			throws Exception {

			Class<?> clazz = bean.getClass();

			Method setMethod = _getMethod(
				clazz, "set" + StringUtil.upperCaseFirstLetter(name));

			if (setMethod == null) {
				throw new NoSuchMethodException();
			}

			Class<?>[] parameterTypes = setMethod.getParameterTypes();

			setMethod.invoke(bean, _translateValue(parameterTypes[0], value));
		}

		private static List<java.lang.reflect.Field> _getAllDeclaredFields(
			Class<?> clazz) {

			List<java.lang.reflect.Field> fields = new ArrayList<>();

			while ((clazz != null) && (clazz != Object.class)) {
				for (java.lang.reflect.Field field :
						clazz.getDeclaredFields()) {

					fields.add(field);
				}

				clazz = clazz.getSuperclass();
			}

			return fields;
		}

		private static Method _getMethod(Class<?> clazz, String name) {
			for (Method method : clazz.getMethods()) {
				if (name.equals(method.getName()) &&
					(method.getParameterCount() == 1) &&
					_parameterTypes.contains(method.getParameterTypes()[0])) {

					return method;
				}
			}

			return null;
		}

		private static Method _getMethod(
				Class<?> clazz, String fieldName, String prefix,
				Class<?>... parameterTypes)
			throws Exception {

			return clazz.getMethod(
				prefix + StringUtil.upperCaseFirstLetter(fieldName),
				parameterTypes);
		}

		private static Object _translateValue(
			Class<?> parameterType, Object value) {

			if ((value instanceof Integer) &&
				parameterType.equals(Long.class)) {

				Integer intValue = (Integer)value;

				return intValue.longValue();
			}

			return value;
		}

		private static final Set<Class<?>> _parameterTypes = new HashSet<>(
			Arrays.asList(
				Boolean.class, Date.class, Double.class, Integer.class,
				Long.class, Map.class, String.class));

	}

	protected class GraphQLField {

		public GraphQLField(String key, GraphQLField... graphQLFields) {
			this(key, new HashMap<>(), graphQLFields);
		}

		public GraphQLField(String key, List<GraphQLField> graphQLFields) {
			this(key, new HashMap<>(), graphQLFields);
		}

		public GraphQLField(
			String key, Map<String, Object> parameterMap,
			GraphQLField... graphQLFields) {

			_key = key;
			_parameterMap = parameterMap;
			_graphQLFields = Arrays.asList(graphQLFields);
		}

		public GraphQLField(
			String key, Map<String, Object> parameterMap,
			List<GraphQLField> graphQLFields) {

			_key = key;
			_parameterMap = parameterMap;
			_graphQLFields = graphQLFields;
		}

		@Override
		public String toString() {
			StringBuilder sb = new StringBuilder(_key);

			if (!_parameterMap.isEmpty()) {
				sb.append("(");

				for (Map.Entry<String, Object> entry :
						_parameterMap.entrySet()) {

					sb.append(entry.getKey());
					sb.append(": ");
					sb.append(entry.getValue());
					sb.append(", ");
				}

				sb.setLength(sb.length() - 2);

				sb.append(")");
			}

			if (!_graphQLFields.isEmpty()) {
				sb.append("{");

				for (GraphQLField graphQLField : _graphQLFields) {
					sb.append(graphQLField.toString());
					sb.append(", ");
				}

				sb.setLength(sb.length() - 2);

				sb.append("}");
			}

			return sb.toString();
		}

		private final List<GraphQLField> _graphQLFields;
		private final String _key;
		private final Map<String, Object> _parameterMap;

	}

	private static final com.liferay.portal.kernel.log.Log _log =
		LogFactoryUtil.getLog(BaseMetricsActivityResourceTestCase.class);

	private static Format _format;

	private com.liferay.portal.kernel.model.User _testCompanyAdminUser;

	@Inject
	private com.liferay.ai.hub.rest.resource.v1_0.MetricsActivityResource
		_metricsActivityResource;

}
// LIFERAY-REST-BUILDER-HASH:454115586