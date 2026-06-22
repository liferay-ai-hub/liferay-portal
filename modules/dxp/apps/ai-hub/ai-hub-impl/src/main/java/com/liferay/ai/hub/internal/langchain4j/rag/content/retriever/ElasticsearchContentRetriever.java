/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.langchain4j.rag.content.retriever;

import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.MapUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.search.engine.adapter.SearchEngineAdapter;
import com.liferay.portal.search.engine.adapter.search.SearchSearchRequest;
import com.liferay.portal.search.engine.adapter.search.SearchSearchResponse;
import com.liferay.portal.search.highlight.FieldConfigBuilderFactory;
import com.liferay.portal.search.highlight.HighlightBuilderFactory;
import com.liferay.portal.search.highlight.HighlightField;
import com.liferay.portal.search.hits.SearchHit;
import com.liferay.portal.search.hits.SearchHits;
import com.liferay.portal.search.query.QueriesUtil;

import dev.langchain4j.data.document.Metadata;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.rag.content.Content;
import dev.langchain4j.rag.query.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Feliphe Marinho
 */
public class ElasticsearchContentRetriever extends BaseContentRetriever {

	public ElasticsearchContentRetriever(
		FieldConfigBuilderFactory fieldConfigBuilderFactory,
		HighlightBuilderFactory highlightBuilderFactory, String[] indexNames,
		SearchEngineAdapter searchEngineAdapter, long userId,
		long workflowInstanceId) {

		super(userId, workflowInstanceId);

		_fieldConfigBuilderFactory = fieldConfigBuilderFactory;
		_highlightBuilderFactory = highlightBuilderFactory;
		_indexNames = indexNames;
		_searchEngineAdapter = searchEngineAdapter;
	}

	@Override
	protected String getSearchTarget() {
		return StringUtil.merge(_indexNames);
	}

	@Override
	protected List<Content> search(Query query) {
		List<Content> contents = new ArrayList<>();

		SearchSearchRequest searchSearchRequest = new SearchSearchRequest();

		searchSearchRequest.setFetchSource(false);
		searchSearchRequest.setHighlight(
			_highlightBuilderFactory.builder(
			).addFieldConfig(
				_fieldConfigBuilderFactory.builder(
					"text_embedding"
				).build()
			).build());

		if (_log.isDebugEnabled()) {
			_log.debug(
				StringBundler.concat(
					"Searching index names ", StringUtil.merge(_indexNames),
					" with query text: ", query.text()));
		}

		searchSearchRequest.setIndexNames(_indexNames);
		searchSearchRequest.setQuery(
			QueriesUtil.wrapper(
				JSONUtil.put(
					"semantic",
					JSONUtil.put(
						"field", "text_embedding"
					).put(
						"query", query.text()
					)
				).toString()));
		searchSearchRequest.setStoredFields("text_embedding");

		SearchSearchResponse searchSearchResponse =
			_searchEngineAdapter.execute(searchSearchRequest);

		SearchHits searchHits = searchSearchResponse.getSearchHits();

		List<SearchHit> searchHitList = searchHits.getSearchHits();

		if (_log.isDebugEnabled()) {
			_log.debug(
				StringBundler.concat(
					"Search returned ", searchHitList.size(),
					" hits out of ", searchHits.getTotalHits(),
					" total matches"));
		}

		for (SearchHit searchHit : searchHitList) {
			Map<String, HighlightField> highlightFields =
				searchHit.getHighlightFieldsMap();

			if (_log.isDebugEnabled()) {
				_log.debug(
					StringBundler.concat(
						"Hit ", searchHit.getId(), " (score ",
						searchHit.getScore(), ") has highlight fields ",
						highlightFields.keySet()));
			}

			HighlightField highlightField = highlightFields.get(
				"text_embedding");

			if (highlightField == null) {
				if (_log.isDebugEnabled()) {
					_log.debug(
						StringBundler.concat(
							"No \"text_embedding\" highlight field for hit ",
							searchHit.getId(),
							"; skipping. Available highlight fields: ",
							highlightFields.keySet()));
				}

				continue;
			}

			Metadata metadata = Metadata.from(
				"url", MapUtil.getString(searchHit.getSourcesMap(), "url"));

			for (String fragment : highlightField.getFragments()) {
				if (_log.isDebugEnabled()) {
					_log.debug("Highlight field fragment: " + fragment);
				}

				contents.add(
					Content.from(TextSegment.from(fragment, metadata)));
			}
		}

		if (_log.isDebugEnabled()) {
			_log.debug("Contents size: " + contents.size());
		}

		return contents;
	}

	private static final Log _log = LogFactoryUtil.getLog(
		ElasticsearchContentRetriever.class);

	private final FieldConfigBuilderFactory _fieldConfigBuilderFactory;
	private final HighlightBuilderFactory _highlightBuilderFactory;
	private final String[] _indexNames;
	private final SearchEngineAdapter _searchEngineAdapter;

}