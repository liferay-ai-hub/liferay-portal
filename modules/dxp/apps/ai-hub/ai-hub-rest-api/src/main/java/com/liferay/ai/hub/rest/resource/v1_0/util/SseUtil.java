/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.rest.resource.v1_0.util;

import com.liferay.portal.kernel.cluster.ClusterExecutorUtil;
import com.liferay.portal.kernel.cluster.ClusterRequest;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.MethodHandler;
import com.liferay.portal.kernel.util.MethodKey;
import com.liferay.portal.kernel.util.PortalRunMode;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.uuid.PortalUUIDUtil;

import jakarta.ws.rs.sse.Sse;
import jakarta.ws.rs.sse.SseEventSink;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletionStage;
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

		if (Validator.isBlank(sseEventSinkKey) ||
			_send(data, name, nodeName, sseEventSinkKey) ||
			!ClusterExecutorUtil.isEnabled()) {

			return;
		}

		ClusterRequest clusterRequest = ClusterRequest.createMulticastRequest(
			new MethodHandler(
				_sendMethodKey, data, name, nodeName, sseEventSinkKey),
			true);

		clusterRequest.setFireAndForget(true);

		ClusterExecutorUtil.execute(clusterRequest);
	}

	public static Set<String> sendHeartbeats() {
		Set<String> reapedSseEventSinkKeys = new HashSet<>();

		for (Map.Entry<String, SseEventSink> entry :
				_sseEventSinks.entrySet()) {

			String sseEventSinkKey = entry.getKey();

			SseEventSink sseEventSink = entry.getValue();
			Sse sse = _sses.get(sseEventSinkKey);

			if ((sse == null) || (sseEventSink == null) ||
				sseEventSink.isClosed()) {

				_close(sseEventSinkKey, sseEventSink);

				reapedSseEventSinkKeys.add(sseEventSinkKey);

				continue;
			}

			try {
				CompletionStage<?> completionStage = sseEventSink.send(
					sse.newEventBuilder(
					).comment(
						"heartbeat"
					).build());

				completionStage.whenComplete(
					(result, throwable) -> {
						if (throwable != null) {
							_close(sseEventSinkKey, sseEventSink);
						}
					});
			}
			catch (RuntimeException runtimeException) {
				_close(sseEventSinkKey, sseEventSink);

				reapedSseEventSinkKeys.add(sseEventSinkKey);

				if (_log.isWarnEnabled()) {
					_log.warn(
						"Closed SSE event sink " + sseEventSinkKey +
							" after a failed heartbeat",
						runtimeException);
				}
			}
		}

		return reapedSseEventSinkKeys;
	}

	private static void _close(
		String sseEventSinkKey, SseEventSink sseEventSink) {

		_remove(sseEventSinkKey);

		if ((sseEventSink == null) || sseEventSink.isClosed()) {
			return;
		}

		try {
			sseEventSink.close();
		}
		catch (RuntimeException runtimeException) {
			if (_log.isWarnEnabled()) {
				_log.warn(
					"Unable to close SSE event sink " + sseEventSinkKey,
					runtimeException);
			}
		}
	}

	private static void _remove(String sseEventSinkKey) {
		_sseEventSinks.remove(sseEventSinkKey);
		_sses.remove(sseEventSinkKey);
	}

	private static boolean _send(
		String data, String name, String nodeName, String sseEventSinkKey) {

		Sse sse = _sses.get(sseEventSinkKey);
		SseEventSink sseEventSink = _sseEventSinks.get(sseEventSinkKey);

		if ((sse == null) || (sseEventSink == null) ||
			sseEventSink.isClosed()) {

			_close(sseEventSinkKey, sseEventSink);

			return false;
		}

		try {
			sseEventSink.send(
				sse.newEventBuilder(
				).data(
					String.class,
					JSONUtil.put(
						"data", data
					).put(
						"nodeName", nodeName
					).toString()
				).name(
					Validator.isBlank(name) ? nodeName : name
				).build());

			return true;
		}
		catch (RuntimeException runtimeException) {
			_close(sseEventSinkKey, sseEventSink);

			if (_log.isWarnEnabled()) {
				_log.warn(
					"Closed SSE event sink " + sseEventSinkKey +
						" after a failed send",
					runtimeException);
			}

			return false;
		}
	}

	private static final Log _log = LogFactoryUtil.getLog(SseUtil.class);

	private static final MethodKey _sendMethodKey = new MethodKey(
		SseUtil.class, "_send", String.class, String.class, String.class,
		String.class);
	private static Map<String, SseEventSink> _sseEventSinks =
		new ConcurrentHashMap<>();
	private static Map<String, Sse> _sses = new ConcurrentHashMap<>();

}