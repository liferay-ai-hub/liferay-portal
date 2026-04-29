/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.tools;

import com.liferay.ai.hub.internal.memory.SessionVariablesUtil;
import com.liferay.ai.hub.rest.resource.v1_0.util.SseUtil;
import com.liferay.oauth2.provider.model.OAuth2Application;
import com.liferay.oauth2.provider.model.OAuth2Authorization;
import com.liferay.oauth2.provider.service.OAuth2ApplicationLocalServiceUtil;
import com.liferay.oauth2.provider.service.OAuth2AuthorizationLocalServiceUtil;
import com.liferay.petra.lang.SafeCloseable;
import com.liferay.petra.reflect.ReflectionUtil;
import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.security.auth.CompanyThreadLocal;
import com.liferay.portal.kernel.servlet.HttpHeaders;
import com.liferay.portal.kernel.util.ContentTypes;
import com.liferay.portal.kernel.util.Http;
import com.liferay.portal.kernel.util.HttpUtil;
import com.liferay.portal.kernel.util.Validator;

import dev.langchain4j.agent.tool.P;
import dev.langchain4j.agent.tool.Tool;

import java.nio.charset.StandardCharsets;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author Mahmoud Tayem
 */
public class SiteBuilderTools {

	public SiteBuilderTools(
		String accessToken, long companyId, String sseEventSinkKey,
		String userToken) {

		_accessToken = accessToken;
		_companyId = companyId;
		_sseEventSinkKey = sseEventSinkKey;
		_userToken = userToken;
	}

	@Tool("Cache the site plan JSON in the current session")
	public String cacheSitePlan(
		@P("Site plan JSON") String sitePlan) {

		_emitToolProgress("Drafting the site plan...");

		sitePlan = _stripMarkdownFences(sitePlan);
		sitePlan = _repairJSON(sitePlan);

		SessionVariablesUtil.putVariable(
			_sseEventSinkKey, "sitePlan", sitePlan);

		return sitePlan;
	}

	@Tool("Create a new Liferay site using the cached site plan. Returns the created site JSON.")
	public String createSite() {
		_emitToolProgress("Creating the site...");

		try (SafeCloseable safeCloseable =
				CompanyThreadLocal.setCompanyIdWithSafeCloseable(_companyId)) {

			return _createSite();
		}
		catch (Exception exception) {
			return ReflectionUtil.throwException(exception);
		}
	}

	@Tool("Cache the enriched site plan with generated fragments in the current session")
	public String cacheFragments(
		@P("Enriched site plan JSON with html/css/js in customFragments")
			String enrichedSitePlan) {

		_emitToolProgress("Designing the fragments...");

		enrichedSitePlan = _stripMarkdownFences(enrichedSitePlan);
		enrichedSitePlan = _repairJSON(enrichedSitePlan);

		try {
			enrichedSitePlan = _fixDuplicateEditableIds(enrichedSitePlan);
		}
		catch (Exception exception) {
			_log.error("Failed to fix duplicate editable IDs", exception);
		}

		SessionVariablesUtil.putVariable(
			_sseEventSinkKey, "enrichedSitePlan", enrichedSitePlan);

		return enrichedSitePlan;
	}

	@Tool("Create the fragment set and all fragments on the site using the cached enriched site plan")
	public String createFragments() {
		_emitToolProgress("Generating the fragments...");

		try (SafeCloseable safeCloseable =
				CompanyThreadLocal.setCompanyIdWithSafeCloseable(_companyId)) {

			return _createFragments();
		}
		catch (Exception exception) {
			return ReflectionUtil.throwException(exception);
		}
	}

	@Tool("Create all site pages from the cached enriched site plan, converting each page IR to a Liferay page specification")
	public String createPages(
		@P("Blog entries JSON array") String blogEntries) {

		_emitToolProgress("Building the pages...");

		try (SafeCloseable safeCloseable =
				CompanyThreadLocal.setCompanyIdWithSafeCloseable(_companyId)) {

			return _createPages(blogEntries);
		}
		catch (Exception exception) {
			return ReflectionUtil.throwException(exception);
		}
	}

	@Tool("Post batch engine artifacts for site, asset library, connected site, fragment set, fragments, and pages to the current run.")
	public String writeBatchFiles() {
		try (SafeCloseable safeCloseable =
				CompanyThreadLocal.setCompanyIdWithSafeCloseable(_companyId)) {

			return _writeBatchFiles(null);
		}
		catch (Exception exception) {
			return ReflectionUtil.throwException(exception);
		}
	}

	@Tool("Mark the current run as ready. Call this once after every artifact has been posted, signalling the user can press Generate.")
	public String markRunReady() {
		try (SafeCloseable safeCloseable =
				CompanyThreadLocal.setCompanyIdWithSafeCloseable(_companyId)) {

			_patchRunStatus("ready");

			SseUtil.send(
				"ready", "Run Updated", null, _sseEventSinkKey);

			return "Run marked ready.";
		}
		catch (Exception exception) {
			return ReflectionUtil.throwException(exception);
		}
	}

	@Tool("Retrieve the cached site plan JSON from the current session")
	public String getCachedSitePlan() {
		String value = SessionVariablesUtil.getVariable(
			_sseEventSinkKey, "sitePlan");

		if (value == null) {
			return "";
		}

		return value;
	}

	private String _createFragments() throws Exception {
		return "Fragments will be created via batch files.";
	}

	private Map<String, String> _deduplicateEditableIds(String html) {
		Map<String, String> renamedIds = new HashMap<>();

		if (html == null) {
			return renamedIds;
		}

		Map<String, Integer> idCounts = new HashMap<>();

		Matcher counter = _editableIdPattern.matcher(html);

		Map<String, Integer> totalOccurrences = new HashMap<>();

		while (counter.find()) {
			String id = counter.group(1);

			totalOccurrences.merge(id, 1, Integer::sum);
		}

		Matcher matcher = _editableIdPattern.matcher(html);

		while (matcher.find()) {
			String id = matcher.group(1);

			if (totalOccurrences.getOrDefault(id, 0) <= 1) {
				continue;
			}

			int count = idCounts.getOrDefault(id, 0);

			idCounts.put(id, count + 1);

			if (count > 0) {
				renamedIds.put(id + ":" + count, id + "-" + (count + 1));
			}
		}

		return renamedIds;
	}

	private String _fixDuplicateEditableIds(String enrichedSitePlan)
		throws Exception {

		JSONObject planJSON = JSONFactoryUtil.createJSONObject(enrichedSitePlan);

		JSONArray customFragments = planJSON.getJSONArray("customFragments");

		if ((customFragments == null) || (customFragments.length() == 0)) {
			return enrichedSitePlan;
		}

		JSONArray pages = planJSON.getJSONArray("pages");

		for (int i = 0; i < customFragments.length(); i++) {
			JSONObject fragment = customFragments.getJSONObject(i);

			String html = fragment.getString("html");

			if (Validator.isNull(html)) {
				continue;
			}

			String fragmentKey = fragment.getString("key");

			// Find duplicate IDs

			Map<String, Integer> idCounts = new HashMap<>();

			Matcher matcher = _editableIdPattern.matcher(html);

			Map<String, Integer> totalOccurrences = new HashMap<>();

			while (matcher.find()) {
				totalOccurrences.merge(matcher.group(1), 1, Integer::sum);
			}

			boolean hasDuplicates = false;

			for (int count : totalOccurrences.values()) {
				if (count > 1) {
					hasDuplicates = true;

					break;
				}
			}

			if (!hasDuplicates) {
				continue;
			}

			// Fix HTML — rename duplicate occurrences

			Map<String, String> oldToNewIds = new HashMap<>();

			matcher = _editableIdPattern.matcher(html);

			StringBuffer sb = new StringBuffer();

			while (matcher.find()) {
				String id = matcher.group(1);

				if (totalOccurrences.getOrDefault(id, 0) <= 1) {
					matcher.appendReplacement(
						sb,
						Matcher.quoteReplacement(matcher.group()));

					continue;
				}

				int count = idCounts.getOrDefault(id, 0);

				idCounts.put(id, count + 1);

				if (count > 0) {
					String newId = id + "-" + (count + 1);

					oldToNewIds.put(id + "##" + count, newId);

					matcher.appendReplacement(
						sb,
						Matcher.quoteReplacement(
							"data-lfr-editable-id=\"" + newId + "\""));

				}
				else {
					matcher.appendReplacement(
						sb,
						Matcher.quoteReplacement(matcher.group()));
				}
			}

			matcher.appendTail(sb);

			fragment.put("html", sb.toString());

			// Fix editables array — add new IDs

			JSONArray editables = fragment.getJSONArray("editables");

			if (editables != null) {
				JSONArray fixedEditables = JSONFactoryUtil.createJSONArray();

				for (int e = 0; e < editables.length(); e++) {
					JSONObject editable = editables.getJSONObject(e);

					fixedEditables.put(editable);

					String editableId = editable.getString("id");

					if (totalOccurrences.getOrDefault(editableId, 0) > 1) {
						int total = totalOccurrences.get(editableId);

						for (int d = 2; d <= total; d++) {
							JSONObject newEditable =
								JSONFactoryUtil.createJSONObject();

							newEditable.put("id", editableId + "-" + d);
							newEditable.put(
								"type", editable.getString("type"));

							fixedEditables.put(newEditable);
						}
					}
				}

				fragment.put("editables", fixedEditables);
			}

			// Fix page IR content references

			if (pages != null) {
				for (int p = 0; p < pages.length(); p++) {
					JSONObject page = pages.getJSONObject(p);

					JSONObject ir = page.getJSONObject("ir");

					if (ir != null) {
						_fixContentReferences(
							ir.getJSONArray("elements"), fragmentKey,
							totalOccurrences);
					}
				}
			}
		}

		String fixedPlan = planJSON.toString();

		return fixedPlan;
	}

	private void _fixContentReferences(
		JSONArray elements, String fragmentKey,
		Map<String, Integer> totalOccurrences) {

		if (elements == null) {
			return;
		}

		for (int i = 0; i < elements.length(); i++) {
			JSONObject element = elements.getJSONObject(i);

			if (element == null) {
				continue;
			}

			String type = element.getString("type");

			if ("fragment".equals(type) &&
				fragmentKey.equals(element.getString("key"))) {

				JSONObject content = element.getJSONObject("content");

				if (content != null) {
					JSONObject fixedContent =
						JSONFactoryUtil.createJSONObject();

					for (String editableId : content.keySet()) {
						fixedContent.put(editableId, content.get(editableId));

						if (totalOccurrences.getOrDefault(
								editableId, 0) > 1) {

							int total = totalOccurrences.get(editableId);

							for (int d = 2; d <= total; d++) {
								fixedContent.put(
									editableId + "-" + d,
									content.get(editableId));
							}
						}
					}

					element.put("content", fixedContent);
				}
			}

			// Recurse into children/columns

			JSONArray children = element.getJSONArray("children");

			if (children != null) {
				_fixContentReferences(
					children, fragmentKey, totalOccurrences);
			}

			JSONArray columns = element.getJSONArray("columns");

			if (columns != null) {
				for (int c = 0; c < columns.length(); c++) {
					JSONObject column = columns.getJSONObject(c);

					if (column != null) {
						_fixContentReferences(
							column.getJSONArray("children"), fragmentKey,
							totalOccurrences);
					}
				}
			}
		}
	}

	private String _createPages(String blogEntries) throws Exception {
		return _writeBatchFiles(blogEntries);
	}

	private String _writeBatchFiles(String blogEntries) throws Exception {
		String enrichedSitePlan = SessionVariablesUtil.getVariable(
			_sseEventSinkKey, "enrichedSitePlan");

		if (Validator.isNull(enrichedSitePlan)) {
			return "Error: No cached enriched site plan found in session.";
		}

		JSONObject planJSON = JSONFactoryUtil.createJSONObject(enrichedSitePlan);

		JSONObject siteJSON = planJSON.getJSONObject("site");

		if (siteJSON == null) {
			return "Error: Enriched site plan does not contain a 'site' object.";
		}

		String siteERC = siteJSON.getString("externalReferenceCode");
		String siteTitle = siteJSON.getString("name");

		StringBuilder results = new StringBuilder();

		// 01-site

		JSONObject siteBatch = _createBatchWrapper(
			"com.liferay.headless.admin.site.dto.v1_0.Site", false, siteERC,
			false);

		JSONObject siteItem = JSONFactoryUtil.createJSONObject();

		siteItem.put("active", true);
		siteItem.put("description", siteJSON.getString("description"));
		siteItem.put("externalReferenceCode", siteERC);
		siteItem.put("membershipType", "open");
		siteItem.put("name", siteTitle);

		siteBatch.put(
			"items", JSONFactoryUtil.createJSONArray().put(siteItem));

		_postArtifact(1, "01-site.batch-engine-data.json", siteBatch);

		results.append("Posted 01-site.batch-engine-data.json\n");

		// 02-asset-library

		String assetLibraryERC = siteERC + "-space";

		JSONObject assetLibraryBatch = _createBatchWrapper(
			"com.liferay.headless.asset.library.dto.v1_0.AssetLibrary",
			false, siteERC, false);

		JSONObject assetLibraryItem = JSONFactoryUtil.createJSONObject();

		assetLibraryItem.put("assetLibraryKey", assetLibraryERC);
		assetLibraryItem.put("externalReferenceCode", assetLibraryERC);
		assetLibraryItem.put("name", siteTitle + " Space");
		assetLibraryItem.put(
			"name_i18n", _createI18nJSON("en-US", siteTitle + " Space"));

		// AssetLibraryResourceImpl._putUnicodeProperties returns null when
		// settings is null; the upsert path then NPEs in
		// UnicodePropertiesBuilder.putAll. Send an empty settings object to
		// take the non-null branch with default values.

		assetLibraryItem.put("settings", JSONFactoryUtil.createJSONObject());
		assetLibraryItem.put("type", "Space");

		assetLibraryBatch.put(
			"items",
			JSONFactoryUtil.createJSONArray().put(assetLibraryItem));

		_postArtifact(
			2, "02-asset-library.batch-engine-data.json", assetLibraryBatch);

		results.append("Posted 02-asset-library.batch-engine-data.json\n");

		// 03-connected-site

		JSONObject connectedSiteBatch = JSONFactoryUtil.createJSONObject();

		JSONObject connectedSiteConfig =
			JSONFactoryUtil.createJSONObject();

		connectedSiteConfig.put(
			"className",
			"com.liferay.headless.asset.library.dto.v1_0.ConnectedSite");
		connectedSiteConfig.put("multiCompany", true);
		connectedSiteConfig.put("taskItemDelegateName", "DEFAULT");

		JSONObject connectedSiteParams =
			JSONFactoryUtil.createJSONObject();

		connectedSiteParams.put(
			"assetLibraryExternalReferenceCode", assetLibraryERC);
		connectedSiteParams.put("containsHeaders", "true");
		connectedSiteParams.put("createStrategy", "UPSERT");
		connectedSiteParams.put("importStrategy", "ON_ERROR_FAIL");

		connectedSiteConfig.put("parameters", connectedSiteParams);

		connectedSiteBatch.put("configuration", connectedSiteConfig);

		JSONObject connectedSiteItem =
			JSONFactoryUtil.createJSONObject();

		connectedSiteItem.put("descriptiveName", siteTitle);
		connectedSiteItem.put("externalReferenceCode", siteERC);
		connectedSiteItem.put("name", siteTitle);
		connectedSiteItem.put("searchable", true);

		connectedSiteBatch.put(
			"items",
			JSONFactoryUtil.createJSONArray().put(connectedSiteItem));

		_postArtifact(
			3, "03-connected-site.batch-engine-data.json",
			connectedSiteBatch);

		results.append(
			"Posted 03-connected-site.batch-engine-data.json\n");

		// 04-fragment-set

		String fragmentSetERC = siteERC + "-fragments";

		JSONObject fragmentSetBatch = _createBatchWrapper(
			"com.liferay.headless.admin.fragment.dto.v1_0.FragmentSet", true,
			siteERC, false);

		JSONObject fragmentSetItem = JSONFactoryUtil.createJSONObject();

		fragmentSetItem.put("externalReferenceCode", fragmentSetERC);
		fragmentSetItem.put("key", fragmentSetERC);
		fragmentSetItem.put("name", siteTitle + " Fragments");

		fragmentSetBatch.put(
			"items", JSONFactoryUtil.createJSONArray().put(fragmentSetItem));

		_postArtifact(
			4, "04-fragment-set.batch-engine-data.json", fragmentSetBatch);

		results.append("Posted 04-fragment-set.batch-engine-data.json\n");

		// 05-fragments

		JSONArray customFragments = planJSON.getJSONArray("customFragments");

		JSONObject fragmentsBatch = _createBatchWrapper(
			"com.liferay.headless.admin.fragment.dto.v1_0.Fragment", true,
			siteERC, false);

		JSONArray fragmentItems = JSONFactoryUtil.createJSONArray();

		if ((customFragments != null) && (customFragments.length() > 0)) {
			for (int i = 0; i < customFragments.length(); i++) {
				JSONObject fragment = customFragments.getJSONObject(i);

				String fragmentKey = fragment.getString("key");

				JSONObject fragmentItem = JSONFactoryUtil.createJSONObject();

				fragmentItem.put("externalReferenceCode", fragmentKey);
				fragmentItem.put(
					"fragmentSetExternalReferenceCode", fragmentSetERC);
				fragmentItem.put("key", fragmentKey);
				fragmentItem.put("name", fragment.getString("name"));
				fragmentItem.put("type", "Component");

				JSONArray fragmentVersions =
					JSONFactoryUtil.createJSONArray();

				JSONObject approvedVersion =
					JSONFactoryUtil.createJSONObject();

				approvedVersion.put("css", fragment.getString("css"));
				approvedVersion.put(
					"html",
					_fixImageEditables(fragment.getString("html")));
				approvedVersion.put("js", fragment.getString("js"));
				approvedVersion.put("status", "Approved");

				if (fragment.getBoolean("isNavigationMenu")) {
					approvedVersion.put(
						"configuration", _NAV_MENU_CONFIGURATION);
				}

				fragmentVersions.put(approvedVersion);

				fragmentItem.put("fragmentVersions", fragmentVersions);

				fragmentItems.put(fragmentItem);
			}
		}

		fragmentsBatch.put("items", fragmentItems);

		_postArtifact(
			5, "05-fragments.batch-engine-data.json", fragmentsBatch);

		results.append("Posted 05-fragments.batch-engine-data.json\n");

		// 06-pages

		JSONArray pages = planJSON.getJSONArray("pages");

		JSONObject pagesBatch = _createBatchWrapper(
			"com.liferay.headless.admin.site.dto.v1_0.SitePage", true,
			siteERC, true);

		JSONArray pageItems = JSONFactoryUtil.createJSONArray();

		if ((pages != null) && (pages.length() > 0)) {
			String fragmentsCatalog = "[]";

			if ((customFragments != null) &&
				(customFragments.length() > 0)) {

				JSONArray catalog = JSONFactoryUtil.createJSONArray();

				for (int f = 0; f < customFragments.length(); f++) {
					JSONObject fragment =
						customFragments.getJSONObject(f);

					JSONObject catalogEntry =
						JSONFactoryUtil.createJSONObject();

					if (fragment.getBoolean("isNavigationMenu")) {
						catalogEntry.put(
							"configuration", _NAV_MENU_CONFIGURATION);
					}

					catalogEntry.put("css", fragment.getString("css"));
					catalogEntry.put(
						"editables",
						fragment.getJSONArray("editables"));
					catalogEntry.put(
						"externalReferenceCode",
						fragment.getString("key"));
					catalogEntry.put("html", fragment.getString("html"));
					catalogEntry.put("js", fragment.getString("js"));

					catalog.put(catalogEntry);
				}

				fragmentsCatalog = catalog.toString();
			}

			IRToPageSpecTools irToPageSpecTools = new IRToPageSpecTools(
				fragmentsCatalog);

			for (int i = 0; i < pages.length(); i++) {
				JSONObject page = pages.getJSONObject(i);

				String pageTitle = page.getString("title");
				String pageERC = page.getString("externalReferenceCode");

				JSONObject ir = page.getJSONObject("ir");

				JSONArray pageElements = JSONFactoryUtil.createJSONArray();

				if (ir != null) {
					String approvedSpecStr =
						irToPageSpecTools.convertToPageSpec(
							ir.toString(), pageERC, pageERC + "-default",
							"en-US");

					if (!approvedSpecStr.startsWith("Error")) {
						JSONObject specJSON =
							JSONFactoryUtil.createJSONObject(
								approvedSpecStr);

						JSONArray experiences = specJSON.getJSONArray(
							"pageExperiences");

						if ((experiences != null) &&
							(experiences.length() > 0)) {

							pageElements =
								experiences.getJSONObject(
									0).getJSONArray("pageElements");
						}
					}
				}

				// Approved spec

				JSONObject approvedExp =
					JSONFactoryUtil.createJSONObject();

				approvedExp.put(
					"externalReferenceCode", pageERC + "-default");
				approvedExp.put("key", "DEFAULT");
				approvedExp.put(
					"name_i18n", _createI18nJSON("en-US", "Default"));
				approvedExp.put("pageElements", pageElements);
				approvedExp.put("priority", 0);

				JSONObject approvedSpec =
					JSONFactoryUtil.createJSONObject();

				approvedSpec.put(
					"draftContentPageSpecificationExternalReferenceCode",
					pageERC + "-draft");
				approvedSpec.put("externalReferenceCode", pageERC);
				approvedSpec.put(
					"pageExperiences",
					JSONFactoryUtil.createJSONArray().put(approvedExp));
				approvedSpec.put("settings", _createThemeSettings());
				approvedSpec.put("status", "Approved");
				approvedSpec.put("type", "ContentPageSpecification");

				// Draft spec

				JSONArray draftPageElements =
					JSONFactoryUtil.createJSONArray();

				if (pageElements.length() > 0) {
					draftPageElements = JSONFactoryUtil.createJSONArray(
						pageElements.toString());

					_appendDraftSuffix(draftPageElements);
				}

				JSONObject draftExp = JSONFactoryUtil.createJSONObject();

				draftExp.put(
					"externalReferenceCode",
					pageERC + "-draft-default");
				draftExp.put("key", "DEFAULT");
				draftExp.put(
					"name_i18n", _createI18nJSON("en-US", "Default"));
				draftExp.put("pageElements", draftPageElements);
				draftExp.put("priority", 0);

				JSONObject draftSpec = JSONFactoryUtil.createJSONObject();

				draftSpec.put(
					"externalReferenceCode", pageERC + "-draft");
				draftSpec.put(
					"pageExperiences",
					JSONFactoryUtil.createJSONArray().put(draftExp));
				draftSpec.put("settings", _createThemeSettings());
				draftSpec.put("status", "Draft");
				draftSpec.put("type", "ContentPageSpecification");

				// Page body

				JSONObject pageBody = JSONFactoryUtil.createJSONObject();

				pageBody.put("externalReferenceCode", pageERC);
				pageBody.put(
					"name_i18n", _createI18nJSON("en-US", pageTitle));
				pageBody.put(
					"pageSettings",
					JSONFactoryUtil.createJSONObject().put(
						"type", "ContentPageSettings"));
				pageBody.put(
					"pageSpecifications",
					JSONFactoryUtil.createJSONArray().put(
						approvedSpec).put(draftSpec));
				pageBody.put("type", "ContentPage");

				pageItems.put(pageBody);
			}
		}

		pagesBatch.put("items", pageItems);

		_postArtifact(6, "06-pages.batch-engine-data.json", pagesBatch);

		results.append("Posted 06-pages.batch-engine-data.json\n");

		// 07-blogs

		if (Validator.isNotNull(blogEntries)) {
			blogEntries = _stripMarkdownFences(blogEntries);
			blogEntries = _repairJSON(blogEntries);

			String trimmed = blogEntries.trim();

			JSONArray blogArray = null;

			try {
				if (trimmed.startsWith("[")) {
					blogArray = JSONFactoryUtil.createJSONArray(trimmed);
				}
				else if (trimmed.startsWith("{")) {
					JSONObject wrapper = JSONFactoryUtil.createJSONObject(
						trimmed);

					for (String key : wrapper.keySet()) {
						Object value = wrapper.get(key);

						if (value instanceof JSONArray) {
							blogArray = (JSONArray)value;

							break;
						}
					}
				}
			}
			catch (Exception exception) {
				_log.error(
					"Unable to parse blogEntries as JSON; skipping 07-blogs",
					exception);
			}

			if (blogArray != null) {
				_sanitizeBlogKeywords(blogArray);

				JSONObject blogsBatch = JSONFactoryUtil.createJSONObject();

				JSONObject blogsConfig = JSONFactoryUtil.createJSONObject();

				blogsConfig.put(
					"className",
					"com.liferay.object.rest.dto.v1_0.ObjectEntry");
				blogsConfig.put("multiCompany", true);
				blogsConfig.put("taskItemDelegateName", "CMSBlog");

				JSONObject blogsParams = JSONFactoryUtil.createJSONObject();

				blogsParams.put("containsHeaders", "true");
				blogsParams.put("createStrategy", "UPSERT");
				blogsParams.put("featureFlag", "LPD-17564");
				blogsParams.put("importStrategy", "ON_ERROR_FAIL");
				blogsParams.put("scopeKey", siteERC + "-space");
				blogsParams.put("updateStrategy", "UPDATE");

				blogsConfig.put("parameters", blogsParams);

				blogsBatch.put("configuration", blogsConfig);
				blogsBatch.put("items", blogArray);

				_postArtifact(
					7, "07-blogs.batch-engine-data.json", blogsBatch);

				results.append("Posted 07-blogs.batch-engine-data.json\n");
			}
			else {
				_log.error(
					"Failed to parse blogEntries as JSON array. Raw:\n" +
						blogEntries);
			}
		}

		return results.toString();
	}

	private JSONObject _createBatchWrapper(
			String className, boolean includeSiteERC, String siteERC,
			boolean includePrivateLayout)
		throws Exception {

		JSONObject wrapper = JSONFactoryUtil.createJSONObject();

		JSONObject configuration = JSONFactoryUtil.createJSONObject();

		configuration.put("className", className);
		configuration.put("multiCompany", true);

		JSONObject parameters = JSONFactoryUtil.createJSONObject();

		parameters.put("containsHeaders", "true");
		parameters.put("createStrategy", "UPSERT");
		parameters.put("featureFlag", "LPD-39244");
		parameters.put("importStrategy", "ON_ERROR_FAIL");

		if (includeSiteERC) {
			parameters.put("siteExternalReferenceCode", siteERC);
		}

		if (includePrivateLayout) {
			parameters.put("privateLayout", "false");
		}

		configuration.put("parameters", parameters);
		configuration.put("taskItemDelegateName", "DEFAULT");

		wrapper.put("configuration", configuration);

		return wrapper;
	}

	private String _postArtifact(
			int loadOrder, String fileName, JSONObject envelope)
		throws Exception {

		JSONObject configuration = envelope.getJSONObject("configuration");

		JSONArray items = envelope.getJSONArray("items");

		int itemCount = (items != null) ? items.length() : 0;

		String previewItem = "";

		if (itemCount > 0) {
			JSONObject firstItem = items.getJSONObject(0);

			previewItem = _stripMetadata(firstItem).toString();
		}

		String languages = _detectLanguages(items, fileName);

		String uniqueFileName = StringBundler.concat(
			_sseEventSinkKey, "-", System.currentTimeMillis(), "-", fileName);

		JSONObject artifactBody = JSONFactoryUtil.createJSONObject();

		artifactBody.put("className", configuration.getString("className"));
		artifactBody.put(
			"delegateName", configuration.getString("taskItemDelegateName"));
		artifactBody.put("fileName", fileName);
		artifactBody.put("itemCount", itemCount);
		artifactBody.put(
			"json",
			JSONUtil.put(
				"fileBase64",
				Base64.getEncoder(
				).encodeToString(
					envelope.toString(
					).getBytes(StandardCharsets.UTF_8)
				)
			).put(
				"name", uniqueFileName
			));
		artifactBody.put("languages", languages);
		artifactBody.put("loadOrder", loadOrder);
		artifactBody.put("previewItem", previewItem);
		artifactBody.put(
			"r_artifacts_l_contentGeneratorRunERC", _sseEventSinkKey);

		Http.Options options = new Http.Options();

		options.addHeader(
			HttpHeaders.CONTENT_TYPE, ContentTypes.APPLICATION_JSON);
		options.addHeader("Liferay-AI-Hub-Cell-On-Behalf-Of", _userToken);
		options.setBody(
			artifactBody.toString(), ContentTypes.APPLICATION_JSON, "UTF-8");
		options.setLocation(
			_getBaseURL() + "/o/content-site-generator/artifacts/");
		options.setMethod(Http.Method.POST);

		String responseBody = HttpUtil.URLtoString(options);

		int responseCode = options.getResponse(
		).getResponseCode();

		if ((responseCode < 200) || (responseCode >= 300)) {
			throw new Exception(
				StringBundler.concat(
					"POST artifact ", fileName, " failed with HTTP ",
					responseCode, ". Response: ", responseBody));
		}

		JSONObject responseJSONObject = JSONFactoryUtil.createJSONObject(
			responseBody);

		SseUtil.send(fileName, "Artifacts Updated", null, _sseEventSinkKey);

		_emitToolProgress("Posted artifact " + loadOrder + ": " + fileName);

		return responseJSONObject.getString("externalReferenceCode");
	}

	private String _detectLanguages(JSONArray items, String fileName) {
		Set<String> locales = new TreeSet<>();

		if ((items != null) && (items.length() > 0)) {
			Matcher i18nMatcher = _i18nBlockPattern.matcher(items.toString());

			while (i18nMatcher.find()) {
				Matcher localeMatcher = _localeKeyPattern.matcher(
					i18nMatcher.group(1));

				while (localeMatcher.find()) {
					locales.add(localeMatcher.group(1).toLowerCase());
				}
			}
		}

		if (locales.isEmpty()) {
			Matcher matcher = _fileNameLanguagePattern.matcher(fileName);

			if (matcher.find()) {
				locales.add(matcher.group(1).toLowerCase());
			}
		}

		return String.join(",", locales);
	}

	private void _emitToolProgress(String label) {
		SseUtil.send(label, "Tool Progress", null, _sseEventSinkKey);
	}

	private void _patchRunStatus(String runStatus) throws Exception {
		JSONObject body = JSONFactoryUtil.createJSONObject();

		body.put("runStatus", runStatus);

		Http.Options options = new Http.Options();

		options.addHeader(
			HttpHeaders.CONTENT_TYPE, ContentTypes.APPLICATION_JSON);
		options.addHeader("Liferay-AI-Hub-Cell-On-Behalf-Of", _userToken);
		options.setBody(
			body.toString(), ContentTypes.APPLICATION_JSON, "UTF-8");
		options.setLocation(
			StringBundler.concat(
				_getBaseURL(),
				"/o/content-site-generator/runs/by-external-reference-code/",
				_sseEventSinkKey));
		options.setMethod(Http.Method.PATCH);

		String responseBody = HttpUtil.URLtoString(options);

		int responseCode = options.getResponse(
		).getResponseCode();

		if ((responseCode < 200) || (responseCode >= 300)) {
			throw new Exception(
				StringBundler.concat(
					"PATCH run ", _sseEventSinkKey, " runStatus=", runStatus,
					" failed with HTTP ", responseCode, ". Response: ",
					responseBody));
		}
	}

	private void _appendDraftSuffix(JSONArray elements) {
		for (int i = 0; i < elements.length(); i++) {
			JSONObject element = elements.getJSONObject(i);

			String erc = element.getString("externalReferenceCode");

			if (Validator.isNotNull(erc)) {
				element.put("externalReferenceCode", erc + "-draft");
			}

			String parentERC = element.getString(
				"parentExternalReferenceCode");

			if (Validator.isNotNull(parentERC)) {
				element.put(
					"parentExternalReferenceCode", parentERC + "-draft");
			}

			JSONObject definition = element.getJSONObject(
				"pageElementDefinition");

			if (definition != null) {
				JSONObject fragmentInstance = definition.getJSONObject(
					"fragmentInstance");

				if (fragmentInstance != null) {
					String instERC = fragmentInstance.getString(
						"fragmentInstanceExternalReferenceCode");

					if (Validator.isNotNull(instERC)) {
						fragmentInstance.put(
							"fragmentInstanceExternalReferenceCode",
							instERC + "-draft");
					}
				}
			}

			JSONArray children = element.getJSONArray("pageElements");

			if ((children != null) && (children.length() > 0)) {
				_appendDraftSuffix(children);
			}
		}
	}

	private JSONObject _createThemeSettings() throws Exception {
		JSONObject settings = JSONFactoryUtil.createJSONObject();

		settings.put("colorSchemeName", "01");
		settings.put("themeName", "classic_WAR_classictheme");

		JSONObject themeSettings = JSONFactoryUtil.createJSONObject();

		themeSettings.put("lfr-theme:regular:show-header", "false");
		themeSettings.put(
			"lfr-theme:regular:wrap-widget-page-content", "false");
		themeSettings.put("lfr-theme:regular:show-header-search", "false");
		themeSettings.put("lfr-theme:regular:show-footer", "false");

		settings.put("themeSettings", themeSettings);

		return settings;
	}

	private JSONObject _createI18nJSON(String locale, String value) {
		JSONObject json = JSONFactoryUtil.createJSONObject();

		json.put(locale, value);

		return json;
	}

	private String _createSite() throws Exception {
		String sitePlan = SessionVariablesUtil.getVariable(
			_sseEventSinkKey, "sitePlan");

		if (Validator.isNull(sitePlan)) {
			return "Error: No cached site plan found in session.";
		}

		sitePlan = _stripMarkdownFences(sitePlan);

		JSONObject sitePlanJSON;

		try {
			sitePlanJSON = JSONFactoryUtil.createJSONObject(sitePlan);
		}
		catch (Exception exception) {
			_log.error(
				"Failed to parse sitePlan JSON: " + exception.getMessage() +
					"\nRaw sitePlan:\n" + sitePlan);

			return "Error: Site plan is not valid JSON - " +
				exception.getMessage();
		}

		JSONObject siteJSON = sitePlanJSON.getJSONObject("site");

		if (siteJSON == null) {
			return "Error: Site plan does not contain a 'site' object.";
		}

		JSONObject body = JSONFactoryUtil.createJSONObject();

		body.put("active", true);
		body.put("description", siteJSON.getString("description"));
		body.put(
			"externalReferenceCode",
			siteJSON.getString("externalReferenceCode"));
		body.put("membershipType", "open");
		body.put("name", siteJSON.getString("name"));

		String location = _getBaseURL() + "/o/headless-admin-site/v1.0/sites";

		Http.Options options = new Http.Options();

		options.addHeader("Authorization", _accessToken);
		options.addHeader(
			HttpHeaders.CONTENT_TYPE, ContentTypes.APPLICATION_JSON);
		options.addHeader("Liferay-AI-Hub-Cell-On-Behalf-Of", _userToken);
		options.setBody(
			body.toString(), ContentTypes.APPLICATION_JSON, "UTF-8");
		options.setLocation(location);
		options.setMethod(Http.Method.POST);

		String responseBody = HttpUtil.URLtoString(options);

		int responseCode = options.getResponse(
		).getResponseCode();

		if ((responseCode < 200) || (responseCode >= 300)) {
			_log.error(
				StringBundler.concat(
					"createSite failed with HTTP ", responseCode,
					". Request body: ", body.toString(),
					". Response body: ", responseBody));

			return StringBundler.concat(
				"Error: HTTP ", responseCode, ". ", responseBody);
		}

		return responseBody;
	}

	private String _httpPOST(String location, String body) throws Exception {
		Http.Options options = new Http.Options();

		options.addHeader("Authorization", _accessToken);
		options.addHeader(
			HttpHeaders.CONTENT_TYPE, ContentTypes.APPLICATION_JSON);
		options.addHeader("Liferay-AI-Hub-Cell-On-Behalf-Of", _userToken);
		options.setBody(body, ContentTypes.APPLICATION_JSON, "UTF-8");
		options.setLocation(location);
		options.setMethod(Http.Method.POST);

		String responseBody = HttpUtil.URLtoString(options);

		int responseCode = options.getResponse(
		).getResponseCode();

		if ((responseCode < 200) || (responseCode >= 300)) {
			_log.error(
				StringBundler.concat(
					"POST ", location, " failed with HTTP ", responseCode,
					". Response: ", responseBody));

			return StringBundler.concat(
				"Error: HTTP ", responseCode, ". ", responseBody);
		}

		return responseBody;
	}

	private String _httpPUT(String location, String body) throws Exception {
		Http.Options options = new Http.Options();

		options.addHeader("Authorization", _accessToken);
		options.addHeader(
			HttpHeaders.CONTENT_TYPE, ContentTypes.APPLICATION_JSON);
		options.addHeader("Liferay-AI-Hub-Cell-On-Behalf-Of", _userToken);
		options.setBody(body, ContentTypes.APPLICATION_JSON, "UTF-8");
		options.setLocation(location);
		options.setMethod(Http.Method.PUT);

		String responseBody = HttpUtil.URLtoString(options);

		int responseCode = options.getResponse(
		).getResponseCode();

		if ((responseCode < 200) || (responseCode >= 300)) {
			_log.error(
				StringBundler.concat(
					"PUT ", location, " failed with HTTP ", responseCode,
					". Response: ", responseBody));

			return StringBundler.concat(
				"Error: HTTP ", responseCode, ". ", responseBody);
		}

		return responseBody;
	}

	private String _getBaseURL() throws Exception {
		if (Validator.isNull(_accessToken) ||
			!_accessToken.startsWith("Bearer ")) {

			throw new IllegalArgumentException("Invalid access token");
		}

		OAuth2Authorization oAuth2Authorization =
			OAuth2AuthorizationLocalServiceUtil.
				getOAuth2AuthorizationByAccessTokenContent(
					_accessToken.substring(7));

		OAuth2Application oAuth2Application =
			OAuth2ApplicationLocalServiceUtil.getOAuth2Application(
				oAuth2Authorization.getOAuth2ApplicationId());

		return oAuth2Application.getHomePageURL();
	}

	private static String _fixImageEditables(String html) {
		if (html == null) {
			return html;
		}

		// Find image editable elements that are not <img> tags and
		// don't contain <img> tags — replace them with <img> tags

		Matcher matcher = _nonImgImageEditablePattern.matcher(html);

		StringBuffer sb = new StringBuffer();

		while (matcher.find()) {
			String tag = matcher.group(1);
			String editableId = matcher.group(2);
			String afterAttrs = matcher.group(3);

			String replacement =
				"<img data-lfr-editable-id=\"" + editableId +
					"\" data-lfr-editable-type=\"image\"" + afterAttrs +
					" alt=\"\" src=\"\">";

			matcher.appendReplacement(
				sb, Matcher.quoteReplacement(replacement));
		}

		matcher.appendTail(sb);

		return sb.toString();
	}

	private static String _repairJSON(String json) {
		try {
			JSONFactoryUtil.createJSONObject(json);

			return json;
		}
		catch (Exception exception) {
		}

		// Step 1: Fix truncated strings (unclosed quotes)

		StringBuilder fixed = new StringBuilder();

		boolean inString = false;
		char prev = 0;

		for (int i = 0; i < json.length(); i++) {
			char c = json.charAt(i);

			if (inString) {
				if ((c == '"') && (prev != '\\')) {
					inString = false;
				}
				else if ((c == '\n') || (c == '\r')) {

					// Newline inside a string means truncated — close it

					fixed.append('"');

					inString = false;
				}
			}
			else if (c == '"') {
				inString = true;
			}

			fixed.append(c);

			prev = c;
		}

		// If still in a string at end, close it

		if (inString) {
			fixed.append('"');
		}

		String repaired = fixed.toString();

		// Step 2: Remove trailing commas before } or ]

		repaired = _trailingCommaPattern.matcher(repaired).replaceAll("$1");

		// Step 3: Add missing commas between "value""key" patterns

		repaired = _missingCommaPattern.matcher(repaired).replaceAll(
			"$1,$2");

		// Step 4: Balance unclosed braces and brackets

		int braces = 0;
		int brackets = 0;

		inString = false;
		prev = 0;

		for (int i = 0; i < repaired.length(); i++) {
			char c = repaired.charAt(i);

			if (inString) {
				if ((c == '"') && (prev != '\\')) {
					inString = false;
				}
			}
			else {
				if (c == '"') {
					inString = true;
				}
				else if (c == '{') {
					braces++;
				}
				else if (c == '}') {
					braces--;
				}
				else if (c == '[') {
					brackets++;
				}
				else if (c == ']') {
					brackets--;
				}
			}

			prev = c;
		}

		StringBuilder sb = new StringBuilder(repaired);

		while (brackets > 0) {
			sb.append(']');
			brackets--;
		}

		while (braces > 0) {
			sb.append('}');
			braces--;
		}

		repaired = sb.toString();

		try {
			JSONFactoryUtil.createJSONObject(repaired);

			if (_log.isWarnEnabled()) {
				_log.warn("Repaired malformed JSON");
			}

			return repaired;
		}
		catch (Exception exception) {
			_log.warn("JSON repair failed: " + exception.getMessage());

			return json;
		}
	}

	private static String _stripMarkdownFences(String text) {
		if (text == null) {
			return text;
		}

		text = text.trim();

		if (text.startsWith("```")) {
			int firstNewline = text.indexOf('\n');

			if (firstNewline != -1) {
				text = text.substring(firstNewline + 1);
			}
		}

		if (text.endsWith("```")) {
			text = text.substring(0, text.length() - 3);
		}

		return text.trim();
	}

	private static void _sanitizeBlogKeywords(JSONArray blogArray) {

		// Asset tag validation rejects ~26 special characters (see
		// AssetTagLocalServiceImpl). LLM-emitted keywords with characters like
		// '&', '/', or "'" would otherwise fail the entire batch under
		// ON_ERROR_FAIL. Strip invalid characters; drop keywords that go blank.

		for (int i = 0; i < blogArray.length(); i++) {
			JSONObject blog = blogArray.getJSONObject(i);

			if (blog == null) {
				continue;
			}

			JSONArray keywords = blog.getJSONArray("keywords");

			if (keywords == null) {
				continue;
			}

			JSONArray sanitized = JSONFactoryUtil.createJSONArray();

			for (int j = 0; j < keywords.length(); j++) {
				String keyword = keywords.getString(j);

				if (Validator.isNull(keyword)) {
					continue;
				}

				StringBuilder sb = new StringBuilder(keyword.length());

				for (int k = 0; k < keyword.length(); k++) {
					char c = keyword.charAt(k);

					if (_INVALID_ASSET_TAG_CHARS.indexOf(c) < 0) {
						sb.append(c);
					}
				}

				String cleaned = sb.toString().trim();

				if (!cleaned.isEmpty()) {
					sanitized.put(cleaned);
				}
			}

			blog.put("keywords", sanitized);
		}
	}

	private static JSONObject _stripMetadata(JSONObject item) {
		JSONObject stripped = JSONFactoryUtil.createJSONObject();

		for (String key : item.keySet()) {
			if (_METADATA_KEYS.contains(key)) {
				continue;
			}

			stripped.put(key, item.get(key));
		}

		return stripped;
	}

	private static final String _INVALID_ASSET_TAG_CHARS =
		"&'@\\]}:,=>/<\n[{%|+#`?\"\r;*~";

	private static final Set<String> _METADATA_KEYS = Set.of(
		"actions", "classNameId", "classPK", "createDate", "creator",
		"dateCreated", "dateModified", "externalReferenceCode", "groupId", "id",
		"modifiedDate", "parentExternalReferenceCode", "priority", "siteId",
		"sortOrder", "status", "userId");

	private static final String _NAV_MENU_CONFIGURATION =
		"{\"fieldSets\":[{\"fields\":[{\"name\":\"source\"," +
			"\"label\":\"source\",\"type\":\"navigationMenuSelector\"}]}]}";

	private static final Pattern _editableIdPattern = Pattern.compile(
		"data-lfr-editable-id=\"([^\"]+)\"");

	private static final Pattern _fileNameLanguagePattern = Pattern.compile(
		"-([a-z]{2})(?:[-_][A-Z]{2})?\\.json$");

	private static final Pattern _i18nBlockPattern = Pattern.compile(
		"\"[a-zA-Z]+_i18n\"\\s*:\\s*\\{([^{}]*)\\}");

	private static final Pattern _localeKeyPattern = Pattern.compile(
		"\"([a-z]{2})(?:_[A-Z]{2})?\"\\s*:");

	private static final Pattern _missingCommaPattern = Pattern.compile(
		"(\"\\s*(?:\"[^\"]*\"|\\d+(?:\\.\\d+)?|true|false|null|\\}|\\]))\\s*(\"[^\"]*\"\\s*:)");

	private static final Pattern _nonImgImageEditablePattern = Pattern.compile(
		"<(?!img)(\\w+)\\s+[^>]*?data-lfr-editable-id=\"([^\"]+)\"\\s+" +
			"data-lfr-editable-type=\"image\"([^>]*?)>");

	private static final Pattern _trailingCommaPattern = Pattern.compile(
		",\\s*([}\\]])");

	private static final Log _log = LogFactoryUtil.getLog(
		SiteBuilderTools.class);

	private final String _accessToken;
	private final long _companyId;
	private final String _sseEventSinkKey;
	private final String _userToken;

}
