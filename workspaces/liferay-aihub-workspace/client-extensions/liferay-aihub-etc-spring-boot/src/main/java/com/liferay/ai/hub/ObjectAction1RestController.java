/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub;

import com.liferay.client.extension.util.spring.boot3.BaseRestController;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import java.util.stream.Stream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Joshua Cords
 */
@RequestMapping("/object/action/1")
@RestController
public class ObjectAction1RestController extends BaseRestController {

	@PostMapping
	public ResponseEntity<String> post(
		@AuthenticationPrincipal Jwt jwt, @RequestBody String json) {

		log(jwt, _log, json);

		Path crawlerConfigPath = null;

		try {
			crawlerConfigPath = Files.createTempFile("crawler-config-", ".yml");

			Files.writeString(
				crawlerConfigPath, _DEFAULT_CRAWLER_CONFIG,
				StandardCharsets.UTF_8);

			ProcessBuilder processBuilder = new ProcessBuilder(
				"bundle", "exec", "jruby", "bin/crawler", "crawl",
				crawlerConfigPath.toAbsolutePath(
				).toString());

			processBuilder.directory(new File("/opt/liferay/crawler"));

			processBuilder.environment(
			).put(
				"BUNDLE_GEMFILE", "/opt/liferay/crawler/Gemfile"
			);
			processBuilder.environment(
			).put(
				"BUNDLE_PATH", "vendor/bundle"
			);

			processBuilder.redirectErrorStream(true);

			_log(
				jwt,
				"Launching crawler command: " +
					String.join(" ", processBuilder.command()));

			Process process = processBuilder.start();

			try (BufferedReader bufferedReader = new BufferedReader(
					new InputStreamReader(
						process.getInputStream(), StandardCharsets.UTF_8))) {

				Stream<String> lines = bufferedReader.lines();

				lines.forEach(line -> _log(jwt, "[crawler] " + line));
			}

			int exitValue = process.waitFor();

			String message =
				"Crawler finished with exit code " + exitValue + ".";

			_log(jwt, message);

			if (exitValue == 0) {
				return ResponseEntity.ok(message);
			}

			return new ResponseEntity<>(
				message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		catch (InterruptedException | IOException exception) {
			if (exception instanceof InterruptedException) {
				Thread.currentThread(
				).interrupt();
			}

			String errorMessage =
				"Crawler execution failed: " + exception.getMessage();

			_log(jwt, errorMessage);

			return new ResponseEntity<>(
				errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		finally {
			if (crawlerConfigPath != null) {
				try {
					Files.deleteIfExists(crawlerConfigPath);
				}
				catch (IOException ioException) {
					_log(
						jwt,
						"Unable to delete temporary crawler config: " +
							ioException.getMessage());
				}
			}
		}
	}

	private void _log(Jwt jwt, String message) {
		if (!_log.isInfoEnabled()) {
			return;
		}

		String logMessage =
			"[JWT Subject: " + jwt.getSubject() + "] " + message;

		_log.info(logMessage);
	}

	// TODO: replace url and possibly seed_urls from Object
	// The index (output_index) should be targeted by some information from ObjectDefinition - sync with Feliphe about how the index
	// name is generated.
	// max_crawl_depth and max_duration (in seconds) need to be set to reasonable values

	private static final String _DEFAULT_CRAWLER_CONFIG =
		"domains:\n" + "  -   url: https://en.wikipedia.org\n" +
			"      seed_urls:\n" +
				"          - https://en.wikipedia.org/wiki/F%C3%BCr_Elise\n" +
					"max_crawl_depth: 1\n" + "max_duration: 30\n" +
						"output_sink: elasticsearch\n" +
							"output_index: google-vertex-ai-embeddings-2\n" +
								"\n" + "elasticsearch:\n" +
									"  host: http://elasticsearch\n" +
										"  port: 9200\n" +
											"  pipeline: vertex-embed-web-crawl-2\n" +
												"  pipeline_enabled: true";

	private static final Log _log = LogFactory.getLog(
		ObjectAction1RestController.class);

}