/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {fetch} from 'frontend-js-web';

export interface AgentFeedbackPayload {
	agentERC: string;
	agentName: string;
	description?: string;
	feedbackType: 'NEGATIVE' | 'POSITIVE';
	issueType?: string;
	pageUrl?: string;
	sessionId?: string;
	surface: 'AI_ASSISTANT_CHAT' | 'WRITING_ASSISTANT';
	userEmail?: string;
}

export async function postAgentFeedback(
	payload: AgentFeedbackPayload
): Promise<void> {
	const response = await fetch('/o/ai-hub/agent-feedbacks', {
		body: JSON.stringify(payload),
		headers: {'Content-Type': 'application/json'},
		method: 'POST',
	});

	if (!response.ok) {
		throw new Error(`Failed to submit feedback: ${response.statusText}`);
	}
}
