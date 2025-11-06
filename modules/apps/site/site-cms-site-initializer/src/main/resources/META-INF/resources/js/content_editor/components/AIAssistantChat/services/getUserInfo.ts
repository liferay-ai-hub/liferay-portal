/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {fetch} from 'frontend-js-web';

const HEADERS = new Headers({
	'Accept': 'application/json',
	'Accept-Language': Liferay.ThemeDisplay.getBCP47LanguageId(),
	'Content-Type': 'application/json',
});

async function getUserInfo(id: string) {
	const url = `/o/headless-admin-user/v1.0/user-accounts/${id}`;

	return fetch(url, {headers: HEADERS, method: 'GET'})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch(() => {
			throw new Error('Failed to fetch user data.');
		});
}

export {getUserInfo};
