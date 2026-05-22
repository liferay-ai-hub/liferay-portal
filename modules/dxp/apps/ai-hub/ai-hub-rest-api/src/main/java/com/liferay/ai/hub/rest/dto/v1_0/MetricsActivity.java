/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.rest.dto.v1_0;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.liferay.petra.function.UnsafeSupplier;
import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.vulcan.graphql.annotation.GraphQLField;
import com.liferay.portal.vulcan.graphql.annotation.GraphQLName;
import com.liferay.portal.vulcan.util.ObjectMapperUtil;

import jakarta.annotation.Generated;

import jakarta.xml.bind.annotation.XmlRootElement;

import java.io.Serializable;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Supplier;

/**
 * @author Feliphe Marinho
 * @generated
 */
@Generated("")
@GraphQLName("MetricsActivity")
@JsonFilter("Liferay.Vulcan")
@XmlRootElement(name = "MetricsActivity")
public class MetricsActivity implements Serializable {

	public static MetricsActivity toDTO(String json) {
		return ObjectMapperUtil.readValue(MetricsActivity.class, json);
	}

	public static MetricsActivity unsafeToDTO(String json) {
		return ObjectMapperUtil.unsafeReadValue(MetricsActivity.class, json);
	}

	@io.swagger.v3.oas.annotations.media.Schema
	public String getAgentName() {
		if (_agentNameSupplier != null) {
			agentName = _agentNameSupplier.get();

			_agentNameSupplier = null;
		}

		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;

		_agentNameSupplier = null;
	}

	@JsonIgnore
	public void setAgentName(
		UnsafeSupplier<String, Exception> agentNameUnsafeSupplier) {

		_agentNameSupplier = () -> {
			try {
				return agentNameUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected String agentName;

	@JsonIgnore
	private Supplier<String> _agentNameSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public Date getDate() {
		if (_dateSupplier != null) {
			date = _dateSupplier.get();

			_dateSupplier = null;
		}

		return date;
	}

	public void setDate(Date date) {
		this.date = date;

		_dateSupplier = null;
	}

	@JsonIgnore
	public void setDate(UnsafeSupplier<Date, Exception> dateUnsafeSupplier) {
		_dateSupplier = () -> {
			try {
				return dateUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected Date date;

	@JsonIgnore
	private Supplier<Date> _dateSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getDurationDisplay() {
		if (_durationDisplaySupplier != null) {
			durationDisplay = _durationDisplaySupplier.get();

			_durationDisplaySupplier = null;
		}

		return durationDisplay;
	}

	public void setDurationDisplay(String durationDisplay) {
		this.durationDisplay = durationDisplay;

		_durationDisplaySupplier = null;
	}

	@JsonIgnore
	public void setDurationDisplay(
		UnsafeSupplier<String, Exception> durationDisplayUnsafeSupplier) {

		_durationDisplaySupplier = () -> {
			try {
				return durationDisplayUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected String durationDisplay;

	@JsonIgnore
	private Supplier<String> _durationDisplaySupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public Long getDuration() {
		if (_durationSupplier != null) {
			duration = _durationSupplier.get();

			_durationSupplier = null;
		}

		return duration;
	}

	public void setDuration(Long duration) {
		this.duration = duration;

		_durationSupplier = null;
	}

	@JsonIgnore
	public void setDuration(
		UnsafeSupplier<Long, Exception> durationUnsafeSupplier) {

		_durationSupplier = () -> {
			try {
				return durationUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected Long duration;

	@JsonIgnore
	private Supplier<Long> _durationSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public Long getId() {
		if (_idSupplier != null) {
			id = _idSupplier.get();

			_idSupplier = null;
		}

		return id;
	}

	public void setId(Long id) {
		this.id = id;

		_idSupplier = null;
	}

	@JsonIgnore
	public void setId(UnsafeSupplier<Long, Exception> idUnsafeSupplier) {
		_idSupplier = () -> {
			try {
				return idUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected Long id;

	@JsonIgnore
	private Supplier<Long> _idSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public Integer getInputTokensCount() {
		if (_inputTokensCountSupplier != null) {
			inputTokensCount = _inputTokensCountSupplier.get();

			_inputTokensCountSupplier = null;
		}

		return inputTokensCount;
	}

	public void setInputTokensCount(Integer inputTokensCount) {
		this.inputTokensCount = inputTokensCount;

		_inputTokensCountSupplier = null;
	}

	@JsonIgnore
	public void setInputTokensCount(
		UnsafeSupplier<Integer, Exception> inputTokensCountUnsafeSupplier) {

		_inputTokensCountSupplier = () -> {
			try {
				return inputTokensCountUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected Integer inputTokensCount;

	@JsonIgnore
	private Supplier<Integer> _inputTokensCountSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getNodeName() {
		if (_nodeNameSupplier != null) {
			nodeName = _nodeNameSupplier.get();

			_nodeNameSupplier = null;
		}

		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;

		_nodeNameSupplier = null;
	}

	@JsonIgnore
	public void setNodeName(
		UnsafeSupplier<String, Exception> nodeNameUnsafeSupplier) {

		_nodeNameSupplier = () -> {
			try {
				return nodeNameUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected String nodeName;

	@JsonIgnore
	private Supplier<String> _nodeNameSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getOutput() {
		if (_outputSupplier != null) {
			output = _outputSupplier.get();

			_outputSupplier = null;
		}

		return output;
	}

	public void setOutput(String output) {
		this.output = output;

		_outputSupplier = null;
	}

	@JsonIgnore
	public void setOutput(
		UnsafeSupplier<String, Exception> outputUnsafeSupplier) {

		_outputSupplier = () -> {
			try {
				return outputUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected String output;

	@JsonIgnore
	private Supplier<String> _outputSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public Integer getOutputTokensCount() {
		if (_outputTokensCountSupplier != null) {
			outputTokensCount = _outputTokensCountSupplier.get();

			_outputTokensCountSupplier = null;
		}

		return outputTokensCount;
	}

	public void setOutputTokensCount(Integer outputTokensCount) {
		this.outputTokensCount = outputTokensCount;

		_outputTokensCountSupplier = null;
	}

	@JsonIgnore
	public void setOutputTokensCount(
		UnsafeSupplier<Integer, Exception> outputTokensCountUnsafeSupplier) {

		_outputTokensCountSupplier = () -> {
			try {
				return outputTokensCountUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected Integer outputTokensCount;

	@JsonIgnore
	private Supplier<Integer> _outputTokensCountSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getPromptInput() {
		if (_promptInputSupplier != null) {
			promptInput = _promptInputSupplier.get();

			_promptInputSupplier = null;
		}

		return promptInput;
	}

	public void setPromptInput(String promptInput) {
		this.promptInput = promptInput;

		_promptInputSupplier = null;
	}

	@JsonIgnore
	public void setPromptInput(
		UnsafeSupplier<String, Exception> promptInputUnsafeSupplier) {

		_promptInputSupplier = () -> {
			try {
				return promptInputUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected String promptInput;

	@JsonIgnore
	private Supplier<String> _promptInputSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public Integer getTotalTokenCount() {
		if (_totalTokenCountSupplier != null) {
			totalTokenCount = _totalTokenCountSupplier.get();

			_totalTokenCountSupplier = null;
		}

		return totalTokenCount;
	}

	public void setTotalTokenCount(Integer totalTokenCount) {
		this.totalTokenCount = totalTokenCount;

		_totalTokenCountSupplier = null;
	}

	@JsonIgnore
	public void setTotalTokenCount(
		UnsafeSupplier<Integer, Exception> totalTokenCountUnsafeSupplier) {

		_totalTokenCountSupplier = () -> {
			try {
				return totalTokenCountUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected Integer totalTokenCount;

	@JsonIgnore
	private Supplier<Integer> _totalTokenCountSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getType() {
		if (_typeSupplier != null) {
			type = _typeSupplier.get();

			_typeSupplier = null;
		}

		return type;
	}

	public void setType(String type) {
		this.type = type;

		_typeSupplier = null;
	}

	@JsonIgnore
	public void setType(UnsafeSupplier<String, Exception> typeUnsafeSupplier) {
		_typeSupplier = () -> {
			try {
				return typeUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected String type;

	@JsonIgnore
	private Supplier<String> _typeSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getUserMessage() {
		if (_userMessageSupplier != null) {
			userMessage = _userMessageSupplier.get();

			_userMessageSupplier = null;
		}

		return userMessage;
	}

	public void setUserMessage(String userMessage) {
		this.userMessage = userMessage;

		_userMessageSupplier = null;
	}

	@JsonIgnore
	public void setUserMessage(
		UnsafeSupplier<String, Exception> userMessageUnsafeSupplier) {

		_userMessageSupplier = () -> {
			try {
				return userMessageUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected String userMessage;

	@JsonIgnore
	private Supplier<String> _userMessageSupplier;

	@io.swagger.v3.oas.annotations.media.Schema
	public String getUserName() {
		if (_userNameSupplier != null) {
			userName = _userNameSupplier.get();

			_userNameSupplier = null;
		}

		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;

		_userNameSupplier = null;
	}

	@JsonIgnore
	public void setUserName(
		UnsafeSupplier<String, Exception> userNameUnsafeSupplier) {

		_userNameSupplier = () -> {
			try {
				return userNameUnsafeSupplier.get();
			}
			catch (RuntimeException runtimeException) {
				throw runtimeException;
			}
			catch (Exception exception) {
				throw new RuntimeException(exception);
			}
		};
	}

	@GraphQLField
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	protected String userName;

	@JsonIgnore
	private Supplier<String> _userNameSupplier;

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}

		if (!(object instanceof MetricsActivity)) {
			return false;
		}

		MetricsActivity metricsActivity = (MetricsActivity)object;

		return Objects.equals(toString(), metricsActivity.toString());
	}

	@Override
	public int hashCode() {
		String string = toString();

		return string.hashCode();
	}

	public String toString() {
		StringBundler sb = new StringBundler();

		sb.append("{");

		DateFormat liferayToJSONDateFormat = new SimpleDateFormat(
			"yyyy-MM-dd'T'HH:mm:ss'Z'");

		String agentName = getAgentName();

		if (agentName != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"agentName\": ");

			sb.append("\"");

			sb.append(_escape(agentName));

			sb.append("\"");
		}

		Date date = getDate();

		if (date != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"date\": ");

			sb.append("\"");

			sb.append(liferayToJSONDateFormat.format(date));

			sb.append("\"");
		}

		Long duration = getDuration();

		if (duration != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"duration\": ");

			sb.append(duration);
		}

		Long id = getId();

		if (id != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"id\": ");

			sb.append(id);
		}

		Integer inputTokensCount = getInputTokensCount();

		if (inputTokensCount != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"inputTokensCount\": ");

			sb.append(inputTokensCount);
		}

		String nodeName = getNodeName();

		if (nodeName != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"nodeName\": ");

			sb.append("\"");

			sb.append(_escape(nodeName));

			sb.append("\"");
		}

		String output = getOutput();

		if (output != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"output\": ");

			sb.append("\"");

			sb.append(_escape(output));

			sb.append("\"");
		}

		Integer outputTokensCount = getOutputTokensCount();

		if (outputTokensCount != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"outputTokensCount\": ");

			sb.append(outputTokensCount);
		}

		String promptInput = getPromptInput();

		if (promptInput != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"promptInput\": ");

			sb.append("\"");

			sb.append(_escape(promptInput));

			sb.append("\"");
		}

		Integer totalTokenCount = getTotalTokenCount();

		if (totalTokenCount != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"totalTokenCount\": ");

			sb.append(totalTokenCount);
		}

		String type = getType();

		if (type != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"type\": ");

			sb.append("\"");

			sb.append(_escape(type));

			sb.append("\"");
		}

		String userMessage = getUserMessage();

		if (userMessage != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"userMessage\": ");

			sb.append("\"");

			sb.append(_escape(userMessage));

			sb.append("\"");
		}

		String userName = getUserName();

		if (userName != null) {
			if (sb.length() > 1) {
				sb.append(", ");
			}

			sb.append("\"userName\": ");

			sb.append("\"");

			sb.append(_escape(userName));

			sb.append("\"");
		}

		sb.append("}");

		return sb.toString();
	}

	@io.swagger.v3.oas.annotations.media.Schema(
		accessMode = io.swagger.v3.oas.annotations.media.Schema.AccessMode.READ_ONLY,
		defaultValue = "com.liferay.ai.hub.rest.dto.v1_0.MetricsActivity",
		name = "x-class-name"
	)
	public String xClassName;

	private static String _escape(Object object) {
		return StringUtil.replace(
			String.valueOf(object), _JSON_ESCAPE_STRINGS[0],
			_JSON_ESCAPE_STRINGS[1]);
	}

	private static boolean _isArray(Object value) {
		if (value == null) {
			return false;
		}

		Class<?> clazz = value.getClass();

		return clazz.isArray();
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
			sb.append(_escape(entry.getKey()));
			sb.append("\": ");

			Object value = entry.getValue();

			if (_isArray(value)) {
				sb.append("[");

				Object[] valueArray = (Object[])value;

				for (int i = 0; i < valueArray.length; i++) {
					if (valueArray[i] instanceof Map) {
						sb.append(_toJSON((Map<String, ?>)valueArray[i]));
					}
					else if (valueArray[i] instanceof String) {
						sb.append("\"");
						sb.append(valueArray[i]);
						sb.append("\"");
					}
					else {
						sb.append(valueArray[i]);
					}

					if ((i + 1) < valueArray.length) {
						sb.append(", ");
					}
				}

				sb.append("]");
			}
			else if (value instanceof Map) {
				sb.append(_toJSON((Map<String, ?>)value));
			}
			else if (value instanceof String) {
				sb.append("\"");
				sb.append(_escape(value));
				sb.append("\"");
			}
			else {
				sb.append(value);
			}

			if (iterator.hasNext()) {
				sb.append(", ");
			}
		}

		sb.append("}");

		return sb.toString();
	}

	private static final String[][] _JSON_ESCAPE_STRINGS = {
		{"\\", "\"", "\b", "\f", "\n", "\r", "\t"},
		{"\\\\", "\\\"", "\\b", "\\f", "\\n", "\\r", "\\t"}
	};

	private Map<String, Serializable> _extendedProperties;

}
// LIFERAY-REST-BUILDER-HASH:-484553144