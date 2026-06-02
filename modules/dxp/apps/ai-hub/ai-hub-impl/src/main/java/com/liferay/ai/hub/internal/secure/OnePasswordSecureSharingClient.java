/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.secure;

import com.liferay.ai.hub.configuration.OnePasswordConfiguration;
import com.liferay.ai.hub.secure.CredentialSecureSharingClient;
import com.liferay.petra.string.StringBundler;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.configuration.module.configuration.ConfigurationProvider;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.json.JSONFactory;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.json.JSONUtil;
import com.liferay.portal.kernel.servlet.HttpHeaders;
import com.liferay.portal.kernel.util.ContentTypes;
import com.liferay.portal.kernel.util.Http;
import com.liferay.portal.kernel.util.Validator;

import java.net.HttpURLConnection;

import java.util.Map;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Guilherme Camacho
 */
@Component(service = CredentialSecureSharingClient.class)
public class OnePasswordSecureSharingClient
	implements CredentialSecureSharingClient {

	@Override
	public String share(
			long companyId, Map<String, String> fields,
			String recipientEmailAddress)
		throws Exception {

		OnePasswordConfiguration onePasswordConfiguration =
			_configurationProvider.getCompanyConfiguration(
				OnePasswordConfiguration.class, companyId);

		String serviceURL = onePasswordConfiguration.serviceURL();

		if (Validator.isBlank(serviceURL)) {
			throw new IllegalStateException(
				"The secure sharing service URL is not configured");
		}

		JSONObject fieldsJSONObject = _jsonFactory.createJSONObject();

		for (Map.Entry<String, String> entry : fields.entrySet()) {
			fieldsJSONObject.put(entry.getKey(), entry.getValue());
		}

		Http.Options options = new Http.Options();

		options.addHeader(
			HttpHeaders.AUTHORIZATION,
			"Bearer " + onePasswordConfiguration.accessToken());
		options.addHeader(
			HttpHeaders.CONTENT_TYPE, ContentTypes.APPLICATION_JSON);
		options.setBody(
			JSONUtil.put(
				"expiresInDays", onePasswordConfiguration.shareExpirationDays()
			).put(
				"fields", fieldsJSONObject
			).put(
				"recipientEmailAddress", recipientEmailAddress
			).toString(),
			ContentTypes.APPLICATION_JSON, StringPool.UTF8);
		options.setLocation(serviceURL + "/share");
		options.setPost(true);

		String response = _http.URLtoString(options);

		Http.Response httpResponse = options.getResponse();

		if (httpResponse.getResponseCode() != HttpURLConnection.HTTP_OK) {
			throw new PortalException(
				StringBundler.concat(
					"The secure sharing service responded with code ",
					httpResponse.getResponseCode(), ": ", response));
		}

		JSONObject responseJSONObject = _jsonFactory.createJSONObject(response);

		return responseJSONObject.getString("url");
	}

	@Reference
	private ConfigurationProvider _configurationProvider;

	@Reference
	private Http _http;

	@Reference
	private JSONFactory _jsonFactory;

}