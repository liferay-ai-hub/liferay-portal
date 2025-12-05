/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.workflow.kaleo.runtime.node.util;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;

import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.PropsValues;

import java.io.ByteArrayInputStream;

/**
 * @author João Victor Alves
 */
public class CredentialsUtil {

	public static GoogleCredentials createGoogleCredentials() {
		String serviceAccountKey = JSONUtil.put(
			"auth_provider_x509_cert_url",
			"https://www.googleapis.com/oauth2/v1/certs"
		).put(
			"auth_uri", "https://accounts.google.com/o/oauth2/auth"
		).put(
			"client_email", PropsValues.VERTEX_AI_GOOGLE_CLOUD_CLIENT_EMAIL
		).put(
			"client_id", PropsValues.VERTEX_AI_GOOGLE_CLOUD_CLIENT_ID
		).put(
			"client_x509_cert_url",
			PropsValues.VERTEX_AI_GOOGLE_CLOUD_CLIENT_X509_CERT_URL
		).put(
			"private_key", PropsValues.VERTEX_AI_GOOGLE_CLOUD_PRIVATE_KEY
		).put(
			"private_key_id", PropsValues.VERTEX_AI_GOOGLE_CLOUD_PRIVATE_KEY_ID
		).put(
			"project_id", PropsValues.VERTEX_AI_GOOGLE_CLOUD_PROJECT_ID
		).put(
			"token_uri", "https://oauth2.googleapis.com/token"
		).put(
			"type", "service_account"
		).toString();

		try {
			return ServiceAccountCredentials.fromStream(
				new ByteArrayInputStream(serviceAccountKey.getBytes()));
		}
		catch (Exception exception) {
			_log.error(exception);
		}

		return null;
	}

	private static final Log _log = LogFactoryUtil.getLog(
		CredentialsUtil.class);

}