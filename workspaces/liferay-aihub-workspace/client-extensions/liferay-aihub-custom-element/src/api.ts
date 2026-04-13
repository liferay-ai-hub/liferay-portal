/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {EventSource} from 'eventsource';

import {ChatbotConfig} from './types';

const AI_HUB_ENDPOINT = '/o/ai-hub/v1.0';

let aiHubURL = '';

export function setAIHubURL(url: string) {
	aiHubURL = url;
}

export async function getChatbotConfig(
	chatbotExternalReferenceCode: string
): Promise<ChatbotConfig | undefined> {
	try {
		const response = await fetch(
			`${aiHubURL}/o/ai-hub/chatbots/by-external-reference-code/${chatbotExternalReferenceCode}`,
			{
				headers: new Headers({
					Accept: 'application/json',
				}),
			}
		);

		if (!response.ok) {
			throw new Error(
				`Unable to fetch chatbot config: ${response.statusText}`
			);
		}

		return (await response.json()) as ChatbotConfig;
	}
	catch (error) {
		console.warn('[AI Hub Chat]', (error as Error).message);
	}
}

export async function createEventSource(): Promise<EventSource | null> {
	return new EventSource(`${aiHubURL}${AI_HUB_ENDPOINT}/chats/subscribe`, {
		fetch: (input, init) =>
			fetch(input as RequestInfo, {
				...init,
				headers: new Headers({
					Accept: 'text/event-stream',
				}),
			}),
		withCredentials: true,
	});
}

export async function postChatMessage(
	chatbotExternalReferenceCode: string,
	eventSourceReference: string,
	text: string
) {
	return await fetch(
		`${aiHubURL}${AI_HUB_ENDPOINT}/chats/by-external-reference-code/${eventSourceReference}/messages`,
		{
			body: JSON.stringify({
				chatbotExternalReferenceCode,
				context: {},
				instructionDefinitionScope: 'clickToChat',
				text,
			}),
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}),
			method: 'POST',
		}
	);
}
