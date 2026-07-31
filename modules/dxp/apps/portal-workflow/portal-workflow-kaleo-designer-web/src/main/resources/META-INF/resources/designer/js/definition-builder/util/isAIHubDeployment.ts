/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

const AI_HUB_HOSTNAMES = [
	'ai-dev.liferay.net',
	'ai-uat.liferay.net',
	'ai.hub.liferay.com',
	'localhost',
];

function isAIHubDeployment(): boolean {
	return AI_HUB_HOSTNAMES.includes(window.location.hostname);
}

export {isAIHubDeployment};
