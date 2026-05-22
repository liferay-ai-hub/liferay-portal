/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.rest.client.serdes.v1_0;

import com.liferay.ai.hub.rest.client.dto.v1_0.MetricsActivity;
import com.liferay.ai.hub.rest.client.json.BaseJSONParser;

import jakarta.annotation.Generated;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeMap;

/**
 * @author Feliphe Marinho
 * @generated
 */
@Generated("")
public class MetricsActivitySerDes {

	public static MetricsActivity toDTO(String json) {
		MetricsActivityJSONParser metricsActivityJSONParser =
			new MetricsActivityJSONParser();

		return metricsActivityJSONParser.parseToDTO(json);
	}

	public static MetricsActivity[] toDTOs(String json) {
		MetricsActivityJSONParser metricsActivityJSONParser =
			new MetricsActivityJSONParser();

		return metricsActivityJSONParser.parseToDTOs(json);
	}

	public static String toJSON(MetricsActivity metricsActivity) {
		if (metricsActivity == null) {
			return "null";
		}

		StringBuilder sb = new StringBuilder();

		sb.append("{");

		DateFormat liferayToJSONDateFormat = new SimpleDateFormat(
			"yyyy-MM-dd'T'HH:mm:ssXX");

		if (metricsActivity.getAgentName() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"agentName\": ");

			sb.append("\"");

			sb.append(_escape(metricsActivity.getAgentName()));

			sb.append("\"");
		}

		if (metricsActivity.getDate() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"date\": ");

			sb.append("\"");

			sb.append(
				liferayToJSONDateFormat.format(metricsActivity.getDate()));

			sb.append("\"");
		}

		if (metricsActivity.getDuration() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"duration\": ");

			sb.append(metricsActivity.getDuration());
		}

		if (metricsActivity.getId() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"id\": ");

			sb.append(metricsActivity.getId());
		}

		if (metricsActivity.getInputTokensCount() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"inputTokensCount\": ");

			sb.append(metricsActivity.getInputTokensCount());
		}

		if (metricsActivity.getNodeName() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"nodeName\": ");

			sb.append("\"");

			sb.append(_escape(metricsActivity.getNodeName()));

			sb.append("\"");
		}

		if (metricsActivity.getOutput() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"output\": ");

			sb.append("\"");

			sb.append(_escape(metricsActivity.getOutput()));

			sb.append("\"");
		}

		if (metricsActivity.getOutputTokensCount() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"outputTokensCount\": ");

			sb.append(metricsActivity.getOutputTokensCount());
		}

		if (metricsActivity.getPromptInput() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"promptInput\": ");

			sb.append("\"");

			sb.append(_escape(metricsActivity.getPromptInput()));

			sb.append("\"");
		}

		if (metricsActivity.getTotalTokenCount() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"totalTokenCount\": ");

			sb.append(metricsActivity.getTotalTokenCount());
		}

		if (metricsActivity.getUserMessage() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"userMessage\": ");

			sb.append("\"");

			sb.append(_escape(metricsActivity.getUserMessage()));

			sb.append("\"");
		}

		if (metricsActivity.getUserName() != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"userName\": ");

			sb.append("\"");

			sb.append(_escape(metricsActivity.getUserName()));

			sb.append("\"");
		}

		sb.append("}");

		return sb.toString();
	}

	public static Map<String, Object> toMap(String json) {
		MetricsActivityJSONParser metricsActivityJSONParser =
			new MetricsActivityJSONParser();

		return metricsActivityJSONParser.parseToMap(json);
	}

	public static Map<String, String> toMap(MetricsActivity metricsActivity) {
		if (metricsActivity == null) {
			return null;
		}

		Map<String, String> map = new TreeMap<>();

		DateFormat liferayToJSONDateFormat = new SimpleDateFormat(
			"yyyy-MM-dd'T'HH:mm:ssXX");

		if (metricsActivity.getAgentName() == null) {
			map.put("agentName", null);
		}
		else {
			map.put(
				"agentName", String.valueOf(metricsActivity.getAgentName()));
		}

		if (metricsActivity.getDate() == null) {
			map.put("date", null);
		}
		else {
			map.put(
				"date",
				liferayToJSONDateFormat.format(metricsActivity.getDate()));
		}

		if (metricsActivity.getDuration() == null) {
			map.put("duration", null);
		}
		else {
			map.put("duration", String.valueOf(metricsActivity.getDuration()));
		}

		if (metricsActivity.getId() == null) {
			map.put("id", null);
		}
		else {
			map.put("id", String.valueOf(metricsActivity.getId()));
		}

		if (metricsActivity.getInputTokensCount() == null) {
			map.put("inputTokensCount", null);
		}
		else {
			map.put(
				"inputTokensCount",
				String.valueOf(metricsActivity.getInputTokensCount()));
		}

		if (metricsActivity.getNodeName() == null) {
			map.put("nodeName", null);
		}
		else {
			map.put("nodeName", String.valueOf(metricsActivity.getNodeName()));
		}

		if (metricsActivity.getOutput() == null) {
			map.put("output", null);
		}
		else {
			map.put("output", String.valueOf(metricsActivity.getOutput()));
		}

		if (metricsActivity.getOutputTokensCount() == null) {
			map.put("outputTokensCount", null);
		}
		else {
			map.put(
				"outputTokensCount",
				String.valueOf(metricsActivity.getOutputTokensCount()));
		}

		if (metricsActivity.getPromptInput() == null) {
			map.put("promptInput", null);
		}
		else {
			map.put(
				"promptInput",
				String.valueOf(metricsActivity.getPromptInput()));
		}

		if (metricsActivity.getTotalTokenCount() == null) {
			map.put("totalTokenCount", null);
		}
		else {
			map.put(
				"totalTokenCount",
				String.valueOf(metricsActivity.getTotalTokenCount()));
		}

		if (metricsActivity.getUserMessage() == null) {
			map.put("userMessage", null);
		}
		else {
			map.put(
				"userMessage",
				String.valueOf(metricsActivity.getUserMessage()));
		}

		if (metricsActivity.getUserName() == null) {
			map.put("userName", null);
		}
		else {
			map.put("userName", String.valueOf(metricsActivity.getUserName()));
		}

		return map;
	}

	public static class MetricsActivityJSONParser
		extends BaseJSONParser<MetricsActivity> {

		@Override
		protected MetricsActivity createDTO() {
			return new MetricsActivity();
		}

		@Override
		protected MetricsActivity[] createDTOArray(int size) {
			return new MetricsActivity[size];
		}

		@Override
		protected boolean parseMaps(String jsonParserFieldName) {
			if (Objects.equals(jsonParserFieldName, "agentName")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "date")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "duration")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "id")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "inputTokensCount")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "nodeName")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "output")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "outputTokensCount")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "promptInput")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "totalTokenCount")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "userMessage")) {
				return false;
			}
			else if (Objects.equals(jsonParserFieldName, "userName")) {
				return false;
			}

			return false;
		}

		@Override
		protected void setField(
			MetricsActivity metricsActivity, String jsonParserFieldName,
			Object jsonParserFieldValue) {

			if (Objects.equals(jsonParserFieldName, "agentName")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setAgentName((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "date")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setDate(
						toDate((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "duration")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setDuration(
						Long.valueOf((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "id")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setId(
						Long.valueOf((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "inputTokensCount")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setInputTokensCount(
						Integer.valueOf((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "nodeName")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setNodeName((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "output")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setOutput((String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "outputTokensCount")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setOutputTokensCount(
						Integer.valueOf((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "promptInput")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setPromptInput(
						(String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "totalTokenCount")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setTotalTokenCount(
						Integer.valueOf((String)jsonParserFieldValue));
				}
			}
			else if (Objects.equals(jsonParserFieldName, "userMessage")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setUserMessage(
						(String)jsonParserFieldValue);
				}
			}
			else if (Objects.equals(jsonParserFieldName, "userName")) {
				if (jsonParserFieldValue != null) {
					metricsActivity.setUserName((String)jsonParserFieldValue);
				}
			}
		}

	}

	private static String _escape(Object object) {
		String string = String.valueOf(object);

		for (String[] strings : BaseJSONParser.JSON_ESCAPE_STRINGS) {
			string = string.replace(strings[0], strings[1]);
		}

		return string;
	}

	private static String _toJSON(Map<String, ?> map) {
		StringBuilder sb = new StringBuilder("{");

		@SuppressWarnings("unchecked")
		Set set = map.entrySet();

		@SuppressWarnings("unchecked")
		Iterator<Map.Entry<String, ?>> iterator = set.iterator();

		while (iterator.hasNext()) {
			Map.Entry<String, ?> entry = iterator.next();

			sb.append("\"");
			sb.append(entry.getKey());
			sb.append("\": ");

			Object value = entry.getValue();

			sb.append(_toJSON(value));

			if (iterator.hasNext()) {
				sb.append(", ");
			}
		}

		sb.append("}");

		return sb.toString();
	}

	private static String _toJSON(Object value) {
		if (value == null) {
			return "null";
		}

		if (value instanceof Map) {
			return _toJSON((Map)value);
		}

		Class<?> clazz = value.getClass();

		if (clazz.isArray()) {
			StringBuilder sb = new StringBuilder("[");

			Object[] values = (Object[])value;

			for (int i = 0; i < values.length; i++) {
				sb.append(_toJSON(values[i]));

				if ((i + 1) < values.length) {
					sb.append(", ");
				}
			}

			sb.append("]");

			return sb.toString();
		}

		if (value instanceof String) {
			return "\"" + _escape(value) + "\"";
		}

		return String.valueOf(value);
	}

}
// LIFERAY-REST-BUILDER-HASH:-662723484