/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayIcon from '@clayui/icon';
import {fetch} from 'frontend-js-web';
import {openToast} from 'frontend-js-components-web';
import React, {useState} from 'react';

import FeedbackModal from './FeedbackModal';

type FeedbackType = 'NEGATIVE' | 'POSITIVE' | null;

async function postAgentFeedback(payload: object): Promise<void> {
	const response = await fetch('/o/ai-hub/agent-feedbacks', {
		body: JSON.stringify(payload),
		headers: {'Content-Type': 'application/json'},
		method: 'POST',
	});

	if (!response.ok) {
		throw new Error(`Failed to submit feedback: ${response.statusText}`);
	}
}

export default function FeedbackButtons({
	agentERC,
	sessionId,
}: {
	agentERC: string;
	sessionId?: string;
}) {
	const [modalOpen, setModalOpen] = useState(false);
	const [selected, setSelected] = useState<FeedbackType>(null);

	async function submitFeedback(
		feedbackType: 'NEGATIVE' | 'POSITIVE',
		issueType?: string,
		description?: string
	) {
		try {
			await postAgentFeedback({
				agentERC,
				agentName: agentERC,
				description,
				feedbackType,
				issueType,
				pageUrl: window.location.href,
				sessionId,
				surface: 'AI_ASSISTANT_CHAT',
			});

			openToast({
				message: Liferay.Language.get('thanks-for-your-feedback'),
				type: 'success',
			});
		}
		catch (error) {
			console.warn('Failed to submit agent feedback:', error);
		}
	}

	function handleThumbsUp() {
		if (selected) {
			return;
		}

		setSelected('POSITIVE');
		submitFeedback('POSITIVE');
	}

	function handleThumbsDown() {
		if (selected) {
			return;
		}

		setModalOpen(true);
	}

	function handleModalSubmit(issueType: string, description: string) {
		setModalOpen(false);
		setSelected('NEGATIVE');
		submitFeedback('NEGATIVE', issueType, description);
	}

	return (
		<>
			<div className="ai-assistant-chat__feedback-buttons">
				<span className="ai-assistant-chat__feedback-label">
					{Liferay.Language.get('was-this-helpful')}
				</span>

				<div className="ai-assistant-chat__feedback-group">
					<button
						aria-label={Liferay.Language.get('helpful')}
						className={
							'ai-assistant-chat__feedback-btn' +
							(selected === 'POSITIVE'
								? ' ai-assistant-chat__feedback-btn--selected'
								: '')
						}
						disabled={selected !== null}
						onClick={handleThumbsUp}
						type="button"
					>
						<ClayIcon
							height={14}
							spritemap={Liferay.Icons.spritemap}
							symbol="thumbs-up"
							width={14}
						/>
					</button>

					<button
						aria-label={Liferay.Language.get('not-helpful')}
						className={
							'ai-assistant-chat__feedback-btn' +
							(selected === 'NEGATIVE'
								? ' ai-assistant-chat__feedback-btn--selected'
								: '')
						}
						disabled={selected !== null}
						onClick={handleThumbsDown}
						title={Liferay.Language.get(
							'send-negative-feedback-or-report-legal-concern'
						)}
						type="button"
					>
						<ClayIcon
							height={14}
							spritemap={Liferay.Icons.spritemap}
							symbol="thumbs-down"
							width={14}
						/>
					</button>
				</div>
			</div>

			{modalOpen && (
				<FeedbackModal
					onClose={() => setModalOpen(false)}
					onSubmit={handleModalSubmit}
				/>
			)}
		</>
	);
}
