/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.rest.client.dto.v1_0;

import com.liferay.ai.hub.rest.client.function.UnsafeSupplier;
import com.liferay.ai.hub.rest.client.serdes.v1_0.MetricsActivitySerDes;

import jakarta.annotation.Generated;

import java.io.Serializable;

import java.util.Date;
import java.util.Objects;

/**
 * @author Feliphe Marinho
 * @generated
 */
@Generated("")
public class MetricsActivity implements Cloneable, Serializable {

	public static MetricsActivity toDTO(String json) {
		return MetricsActivitySerDes.toDTO(json);
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public void setAgentName(
		UnsafeSupplier<String, Exception> agentNameUnsafeSupplier) {

		try {
			agentName = agentNameUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String agentName;

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public void setDate(UnsafeSupplier<Date, Exception> dateUnsafeSupplier) {
		try {
			date = dateUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Date date;

	public Long getDuration() {
		return duration;
	}

	public void setDuration(Long duration) {
		this.duration = duration;
	}

	public void setDuration(
		UnsafeSupplier<Long, Exception> durationUnsafeSupplier) {

		try {
			duration = durationUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Long duration;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setId(UnsafeSupplier<Long, Exception> idUnsafeSupplier) {
		try {
			id = idUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Long id;

	public Integer getInputTokensCount() {
		return inputTokensCount;
	}

	public void setInputTokensCount(Integer inputTokensCount) {
		this.inputTokensCount = inputTokensCount;
	}

	public void setInputTokensCount(
		UnsafeSupplier<Integer, Exception> inputTokensCountUnsafeSupplier) {

		try {
			inputTokensCount = inputTokensCountUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Integer inputTokensCount;

	public String getNodeName() {
		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public void setNodeName(
		UnsafeSupplier<String, Exception> nodeNameUnsafeSupplier) {

		try {
			nodeName = nodeNameUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String nodeName;

	public String getOutput() {
		return output;
	}

	public void setOutput(String output) {
		this.output = output;
	}

	public void setOutput(
		UnsafeSupplier<String, Exception> outputUnsafeSupplier) {

		try {
			output = outputUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String output;

	public Integer getOutputTokensCount() {
		return outputTokensCount;
	}

	public void setOutputTokensCount(Integer outputTokensCount) {
		this.outputTokensCount = outputTokensCount;
	}

	public void setOutputTokensCount(
		UnsafeSupplier<Integer, Exception> outputTokensCountUnsafeSupplier) {

		try {
			outputTokensCount = outputTokensCountUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Integer outputTokensCount;

	public String getPromptInput() {
		return promptInput;
	}

	public void setPromptInput(String promptInput) {
		this.promptInput = promptInput;
	}

	public void setPromptInput(
		UnsafeSupplier<String, Exception> promptInputUnsafeSupplier) {

		try {
			promptInput = promptInputUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String promptInput;

	public Integer getTotalTokenCount() {
		return totalTokenCount;
	}

	public void setTotalTokenCount(Integer totalTokenCount) {
		this.totalTokenCount = totalTokenCount;
	}

	public void setTotalTokenCount(
		UnsafeSupplier<Integer, Exception> totalTokenCountUnsafeSupplier) {

		try {
			totalTokenCount = totalTokenCountUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected Integer totalTokenCount;

	public String getDurationDisplay() {
		return durationDisplay;
	}

	public void setDurationDisplay(String durationDisplay) {
		this.durationDisplay = durationDisplay;
	}

	public void setDurationDisplay(
		UnsafeSupplier<String, Exception> durationDisplayUnsafeSupplier) {

		try {
			durationDisplay = durationDisplayUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String durationDisplay;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setType(
		UnsafeSupplier<String, Exception> typeUnsafeSupplier) {

		try {
			type = typeUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String type;

	public String getUserMessage() {
		return userMessage;
	}

	public void setUserMessage(String userMessage) {
		this.userMessage = userMessage;
	}

	public void setUserMessage(
		UnsafeSupplier<String, Exception> userMessageUnsafeSupplier) {

		try {
			userMessage = userMessageUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String userMessage;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setUserName(
		UnsafeSupplier<String, Exception> userNameUnsafeSupplier) {

		try {
			userName = userNameUnsafeSupplier.get();
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected String userName;

	@Override
	public MetricsActivity clone() throws CloneNotSupportedException {
		return (MetricsActivity)super.clone();
	}

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
		return MetricsActivitySerDes.toJSON(this);
	}

}
// LIFERAY-REST-BUILDER-HASH:1169122432