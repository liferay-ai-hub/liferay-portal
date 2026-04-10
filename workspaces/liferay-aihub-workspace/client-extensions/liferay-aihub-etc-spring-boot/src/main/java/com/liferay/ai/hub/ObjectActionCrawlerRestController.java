/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub;

import com.liferay.client.extension.util.spring.boot3.BaseRestController;
import com.liferay.petra.string.StringBundler;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.beans.factory.annotation.Value;
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
@RequestMapping("/object/action/crawl")
@RestController
public class ObjectActionCrawlerRestController extends BaseRestController {

	@PostMapping
	public ResponseEntity<String> post(
		@AuthenticationPrincipal Jwt jwt, @RequestBody String json) {

		log(jwt, _log, json);

		Path crawlerConfigPath = null;

		try {
			crawlerConfigPath = Files.createTempFile("crawler-config-", ".yml");

			Files.writeString(
				crawlerConfigPath,
				StringBundler.concat(
					"domains:\n", "  -   url: ", _crawlerDomainUrl, "\n",
					"      seed_urls:\n", "          - ", _crawlerSeedUrl, "\n",
					"max_crawl_depth: ", _crawlerMaxCrawlDepth, "\n",
					"max_duration: ", _crawlerMaxDuration, "\n",
					"output_sink: ", _crawlerOutputSink, "\n", "output_index: ",
					_crawlerOutputIndex, "\n\n", "elasticsearch:\n", "  host: ",
					_crawlerElasticsearchHost, "\n", "  port: ",
					_crawlerElasticsearchPort, "\n", "  pipeline: ",
					_crawlerElasticsearchPipeline, "\n", "  pipeline_enabled: ",
					_crawlerElasticsearchPipelineEnabled),
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

				String line;

				while ((line = bufferedReader.readLine()) != null) {
					_log(jwt, "[crawler] " + line);
				}
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

		String logMessage = StringBundler.concat(
			"[JWT Subject: ", jwt.getSubject(), "] ", message);

		_log.info(logMessage);
	}

	private static final Log _log = LogFactory.getLog(
		ObjectActionCrawlerRestController.class);

	@Value("${liferay.ai.hub.crawler.domain.url}")
	private String _crawlerDomainUrl;

	@Value("${liferay.ai.hub.crawler.elasticsearch.host}")
	private String _crawlerElasticsearchHost;

	@Value("${liferay.ai.hub.crawler.elasticsearch.pipeline}")
	private String _crawlerElasticsearchPipeline;

	@Value("${liferay.ai.hub.crawler.elasticsearch.pipeline.enabled}")
	private boolean _crawlerElasticsearchPipelineEnabled;

	@Value("${liferay.ai.hub.crawler.elasticsearch.port}")
	private int _crawlerElasticsearchPort;

	@Value("${liferay.ai.hub.crawler.max.crawl.depth}")
	private int _crawlerMaxCrawlDepth;

	@Value("${liferay.ai.hub.crawler.max.duration}")
	private int _crawlerMaxDuration;

	@Value("${liferay.ai.hub.crawler.output.index}")
	private String _crawlerOutputIndex;

	@Value("${liferay.ai.hub.crawler.output.sink}")
	private String _crawlerOutputSink;

	@Value("${liferay.ai.hub.crawler.seed.url}")
	private String _crawlerSeedUrl;

}