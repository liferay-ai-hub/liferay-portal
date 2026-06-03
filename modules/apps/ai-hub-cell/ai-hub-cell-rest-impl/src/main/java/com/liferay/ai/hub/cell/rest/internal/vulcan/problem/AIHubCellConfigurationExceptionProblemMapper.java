/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.cell.rest.internal.vulcan.problem;

import com.liferay.ai.hub.cell.exception.AIHubCellConfigurationException;
import com.liferay.portal.vulcan.problem.Problem;
import com.liferay.portal.vulcan.problem.ProblemMapper;

import java.util.Locale;

import org.osgi.service.component.annotations.Component;

/**
 * @author Eugenio Ortiz
 */
@Component(service = ProblemMapper.class)
public class AIHubCellConfigurationExceptionProblemMapper
	implements ProblemMapper<AIHubCellConfigurationException> {

	@Override
	public Problem getProblem(
		AIHubCellConfigurationException aiHubCellConfigurationException) {

		return new Problem() {

			@Override
			public String getDetail(Locale locale) {
				return aiHubCellConfigurationException.getMessage();
			}

			@Override
			public Status getStatus() {
				return Status.BAD_REQUEST;
			}

			@Override
			public String getTitle(Locale locale) {
				return aiHubCellConfigurationException.getMessage();
			}

			@Override
			public String getType() {
				return AIHubCellConfigurationException.class.getName();
			}

		};
	}

}