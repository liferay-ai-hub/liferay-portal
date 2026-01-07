/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {EventSource} from 'eventsource';
import {fetch} from 'frontend-js-web';

export function createEventSource() {
	let token: string | null = null;

	getOAuthToken().then((generatedToken) => {
		if (generatedToken?.error) {
			console.warn(generatedToken.error);
		}
		else {
			token = generatedToken;
		}
	});

	return new EventSource('/o/ai-hub/v1.0/chats/subscribe', {
		fetch: async (input, init) => {
			if (token) {
				return fetch(input as RequestInfo, {
					...init,
					headers: new Headers({
						Accept: 'text/event-stream',
						Authorization: `Bearer ${token}`,
					}),
				});
			}

			throw new Error('No OAuth token available');
		},
		withCredentials: true,
	});
}

async function getOAuthToken() {
	return fetch('/o/ai-hub/v1.0/tokens', {
		method: 'POST',
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}

			return {error: response.statusText};
		})
		.then((data) => {
			const token = data?.accessToken;

			if (token) {
				return token;
			}

			return {
				error: `AI Hub Token generation failed. Please verify your credentials and try again.`,
			};
		})
		.catch((error) => {
			throw new Error(`Token request failed: ${error}`);
		});
}

export async function postChatByExternalReferenceCodeMessage(
	content: string,
	eventSourceReference: string,
	message: string,
	title: string
) {
	const token = await getOAuthToken();

	if (token?.error) {
		console.warn(token.error);

		return;
	}

	await fetch(
		`/o/ai-hub/v1.0/chats/by-external-reference-code/${eventSourceReference}/messages`,
		{
			body: JSON.stringify({
				context: {
					content,
					title,
				},
				text: message,
			}),
			headers: new Headers({
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}),
			method: 'POST',
		}
	);
}
