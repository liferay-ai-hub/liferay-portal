/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {EventSource} from 'eventsource';
import {fetch} from 'frontend-js-web';

const AI_HUB_ENDPOINT = '/o/ai-hub/v1.0';

export type ChatContext = Record<string, unknown>;

export async function createEventSource() {
	const editMode = document.body.classList.contains('has-edit-mode-menu');

	if (editMode) {
		return null;
	}

	const authorizationToken = await postAuthorizationToken();

	return new EventSource(
		`${authorizationToken.serviceURL}${AI_HUB_ENDPOINT}/chats/subscribe`,
		{
			fetch: (input, init) =>
				fetch(input as RequestInfo, {
					...init,
					headers: new Headers({
						Accept: 'text/event-stream',
						Authorization: `Bearer ${authorizationToken.accessToken}`,
					}),
				}),
			withCredentials: true,
		}
	);
}

export async function postAuthorizationToken() {
	const response = await fetch('/o/ai-hub-cell/v1.0/authorization-tokens', {
		method: 'POST',
	});

	if (!response.ok) {
		let errorMessage = `Unable to generate authorization token: ${response.statusText}`;

		try {
			const errorData = await response.json();

			if (errorData?.message) {
				errorMessage = errorData.message;
			}
			else if (errorData?.title) {
				errorMessage = errorData.title;
			}
		}
		catch {

			// ignore JSON parse errors, use default message

		}

		throw new Error(errorMessage);
	}

	const data = await response.json();

	if (!data?.accessToken) {
		throw new Error('Unable to generate authorization token.');
	}

	if (!data?.userToken) {
		throw new Error('Unable to generate user token.');
	}

	if (!data?.serviceURL) {
		throw new Error('Unable to find service URL.');
	}

	return data;
}

export async function postChatByExternalReferenceCodeMessage({
	chatContext,
	eventSourceReference,
	instructionDefinitionScope,
	message,
}: {
	chatContext: ChatContext;
	eventSourceReference: string;
	instructionDefinitionScope: string;
	message: string;
}) {
	const authorizationToken = await postAuthorizationToken();

	const response = await fetch(
		`${authorizationToken.serviceURL}${AI_HUB_ENDPOINT}/chats/by-external-reference-code/${eventSourceReference}/messages`,
		{
			body: JSON.stringify({
				context: chatContext,
				instructionDefinitionScope,
				text: message,
			}),
			headers: new Headers({
				'Accept': 'application/json',
				'Authorization': `Bearer ${authorizationToken.accessToken}`,
				'Content-Type': 'application/json',
				'Liferay-AI-Hub-Cell-On-Behalf-Of':
					authorizationToken.userToken,
			}),
			method: 'POST',
		}
	);

	if (!response.ok) {
		throw new Error(`Failed to send message: ${response.statusText}`);
	}

	return response;
}
