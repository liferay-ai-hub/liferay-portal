/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.gradle.plugins.workspace;

import com.liferay.gradle.plugins.workspace.internal.util.GradleUtil;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;

import java.util.Enumeration;
import java.util.Properties;

import org.gradle.api.Plugin;
import org.gradle.api.Project;
import org.gradle.api.artifacts.Configuration;
import org.gradle.api.plugins.JavaPlugin;
import org.gradle.api.tasks.SourceSet;
import org.gradle.api.tasks.TaskContainer;
import org.gradle.api.tasks.testing.Test;

/**
 * Gives a workspace module the unit test classpath that
 * <code>LiferayOSGiDefaultsPlugin</code> gives a module inside
 * liferay-portal. Without it a module declaring its dependencies
 * <code>compileOnly</code>, per the OSGi contract, cannot see its own APIs
 * from <code>src/test</code>, and <code>LiferayUnitTestRule</code> has no
 * portal runtime to initialize the kernel utilities against.
 *
 * @author Davyson Melo
 */
public class LiferayWorkspaceUnitTestPlugin implements Plugin<Project> {

	@Override
	public void apply(Project project) {
		SourceSet sourceSet = GradleUtil.getSourceSet(
			project, SourceSet.TEST_SOURCE_SET_NAME);

		if (sourceSet.getAllSource(
			).isEmpty()) {

			return;
		}

		_configureSourceSetTest(project, sourceSet);

		_addDependenciesTestImplementation(project);
		_addDependenciesTestRuntimeOnly(project);

		_configureTasksTest(project);
	}

	private void _addDependenciesTestImplementation(Project project) {
		String configurationName =
			JavaPlugin.TEST_IMPLEMENTATION_CONFIGURATION_NAME;

		GradleUtil.addDependency(
			project, configurationName, _GROUP_PORTAL,
			"com.liferay.portal.test", "default");
		GradleUtil.addDependency(
			project, configurationName, "junit", "junit", "4.13.1");
		GradleUtil.addDependency(
			project, configurationName, "org.mockito", "mockito-core",
			"5.15.2");
		GradleUtil.addDependency(
			project, configurationName, "org.springframework", "spring-test",
			"6.2.19");
	}

	private void _addDependenciesTestRuntimeOnly(Project project) {
		String configurationName =
			JavaPlugin.TEST_RUNTIME_ONLY_CONFIGURATION_NAME;

		for (String name : _PORTAL_RUNTIME_NAMES) {
			GradleUtil.addDependency(
				project, configurationName, _GROUP_PETRA, name, "default");
		}

		GradleUtil.addDependency(
			project, configurationName, "com.liferay.jakarta.portlet",
			"com.liferay.jakarta.portlet-api", "4.0.0");
		GradleUtil.addDependency(
			project, configurationName, _GROUP_PORTAL,
			"com.liferay.portal.impl", "default");
		GradleUtil.addDependency(
			project, configurationName, _GROUP_PORTAL,
			"com.liferay.portal.kernel", "default");

		//

		// The versions are deliberately omitted. The workspace plugin already
		// applies release.dxp.bom.third.party as a platform to the test
		// configurations, and it version manages every entry of the portal's
		// lib/portal/dependencies.properties, so naming an artifact is enough
		// and the workspace tracks its own product release.

		//

		Properties properties = _getPortalDependencies();

		Enumeration<?> enumeration = properties.propertyNames();

		while (enumeration.hasMoreElements()) {
			String key = (String)enumeration.nextElement();

			String[] parts = properties.getProperty(
				key
			).split(
				":"
			);

			GradleUtil.addDependency(
				project, configurationName, parts[0] + ":" + parts[1]);
		}
	}

	private void _configureSourceSetTest(Project project, SourceSet sourceSet) {
		Configuration compileClasspathConfiguration =
			GradleUtil.getConfiguration(
				project, JavaPlugin.COMPILE_CLASSPATH_CONFIGURATION_NAME);

		sourceSet.setCompileClasspath(
			project.files(
				compileClasspathConfiguration,
				sourceSet.getCompileClasspath()));
		sourceSet.setRuntimeClasspath(
			project.files(
				compileClasspathConfiguration,
				sourceSet.getRuntimeClasspath()));
	}

	private void _configureTasksTest(Project project) {
		TaskContainer taskContainer = project.getTasks();

		taskContainer.withType(
			Test.class,
			test -> {
				test.jvmArgs((Object[])_ADD_OPENS);

				test.jvmArgs("-Djava.locale.providers=CLDR");

				test.systemProperty("net.bytebuddy.experimental", "true");

				test.doFirst(
					task -> {
						for (File file : test.getClasspath()) {
							String name = file.getName();

							if (name.startsWith("mockito-core")) {
								test.jvmArgs(
									"-javaagent:" + file.getAbsolutePath());

								break;
							}
						}
					});
			});
	}

	private Properties _getPortalDependencies() {
		Properties properties = new Properties();

		try (InputStream inputStream =
				LiferayWorkspaceUnitTestPlugin.class.getResourceAsStream(
					"internal/test/dependencies.properties")) {

			if (inputStream == null) {
				throw new IOException(
					"Unable to read internal/test/dependencies.properties");
			}

			properties.load(inputStream);
		}
		catch (IOException ioException) {
			throw new UncheckedIOException(ioException);
		}

		return properties;
	}

	private static final String[] _ADD_OPENS = {
		"--add-opens=java.base/java.io=ALL-UNNAMED",
		"--add-opens=java.base/java.lang=ALL-UNNAMED",
		"--add-opens=java.base/java.lang.invoke=ALL-UNNAMED",
		"--add-opens=java.base/java.lang.ref=ALL-UNNAMED",
		"--add-opens=java.base/java.lang.reflect=ALL-UNNAMED",
		"--add-opens=java.base/java.net=ALL-UNNAMED",
		"--add-opens=java.base/java.nio=ALL-UNNAMED",
		"--add-opens=java.base/java.nio.charset=ALL-UNNAMED",
		"--add-opens=java.base/java.text=ALL-UNNAMED",
		"--add-opens=java.base/java.util=ALL-UNNAMED",
		"--add-opens=java.base/java.util.concurrent=ALL-UNNAMED",
		"--add-opens=java.base/java.util.concurrent.locks=ALL-UNNAMED",
		"--add-opens=java.base/sun.net.www.protocol.https=ALL-UNNAMED",
		"--add-opens=java.base/sun.nio.ch=ALL-UNNAMED",
		"--add-opens=java.base/sun.nio.cs=ALL-UNNAMED",
		"--add-opens=" +
			"java.xml/com.sun.org.apache.xerces.internal.util=ALL-UNNAMED"
	};

	private static final String _GROUP_PETRA = "com.liferay";

	private static final String _GROUP_PORTAL = "com.liferay.portal";

	private static final String[] _PORTAL_RUNTIME_NAMES = {
		"com.liferay.petra.concurrent", "com.liferay.petra.function",
		"com.liferay.petra.io", "com.liferay.petra.lang",
		"com.liferay.petra.nio", "com.liferay.petra.process",
		"com.liferay.petra.reflect", "com.liferay.petra.sql.dsl.api",
		"com.liferay.petra.string"
	};

}