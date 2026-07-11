/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.rest.resource.v1_0.util;

import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.util.PortalRunMode;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.uuid.PortalUUIDUtil;

import jakarta.ws.rs.sse.Sse;
import jakarta.ws.rs.sse.SseEventSink;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author Feliphe Marinho
 */
public class SseUtil {

	public static void closeAll() {
		if (_sseEventSinks.isEmpty() || !PortalRunMode.isTestMode()) {
			return;
		}

		_sseEventSinks.forEach((__, sseEventSink) -> sseEventSink.close());

		_sseEventSinks = new ConcurrentHashMap<>();
		_sses = new ConcurrentHashMap<>();
	}

	public static Set<String> getSSEEventSinksKeys() {
		if (!PortalRunMode.isTestMode()) {
			return null;
		}

		return _sseEventSinks.keySet();
	}

	public static void initialize(Sse sse, SseEventSink sseEventSink) {
		String sseEventSinkKey = PortalUUIDUtil.generate();

		_sseEventSinks.put(sseEventSinkKey, sseEventSink);
		_sses.put(sseEventSinkKey, sse);

		sseEventSink.send(
			sse.newEventBuilder(
			).data(
				String.class, sseEventSinkKey
			).name(
				"Subscribe"
			).build());
	}

	public static void send(
		String data, String name, String nodeName, String sseEventSinkKey) {

		send(null, data, name, nodeName, sseEventSinkKey);
	}

	public static void send(
		String[] agentDefinitionExternalReferenceCodes, String data,
		String name, String nodeName, JSONObject propertiesJSONObject,
		String sseEventSinkKey, String type) {

		if (Validator.isBlank(sseEventSinkKey)) {
			return;
		}

		JSONObject jsonObject = propertiesJSONObject;

		if (jsonObject == null) {
			jsonObject = JSONFactoryUtil.createJSONObject();
		}

		jsonObject.put(
			"agentDefinitionExternalReferenceCodes",
			() -> {
				if (agentDefinitionExternalReferenceCodes == null) {
					return null;
				}

				return JSONUtil.putAll(agentDefinitionExternalReferenceCodes);
			}
		).put(
			"data", data
		).put(
			"nodeName", nodeName
		).put(
			"type", type
		);

		Sse sse = _sses.get(sseEventSinkKey);
		SseEventSink sseEventSink = _sseEventSinks.get(sseEventSinkKey);

		sseEventSink.send(
			sse.newEventBuilder(
			).data(
				String.class, jsonObject.toString()
			).name(
				Validator.isBlank(name) ? nodeName : name
			).build());
	}

	public static void send(
		String[] agentDefinitionExternalReferenceCodes, String data,
		String name, String nodeName, String sseEventSinkKey) {

		send(
			agentDefinitionExternalReferenceCodes, data, name, nodeName, null,
			sseEventSinkKey, "text");
	}

	private static Map<String, SseEventSink> _sseEventSinks =
		new ConcurrentHashMap<>();
	private static Map<String, Sse> _sses = new ConcurrentHashMap<>();

}