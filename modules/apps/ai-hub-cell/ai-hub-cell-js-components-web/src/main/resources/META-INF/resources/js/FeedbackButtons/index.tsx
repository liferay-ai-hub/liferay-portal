/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayIcon, {ClayIconSpriteContext} from '@clayui/icon';
import {openToast} from 'frontend-js-components-web';
import React, {useState} from 'react';

import FeedbackModal from './FeedbackModal';
import {AgentFeedbackPayload, postAgentFeedback} from './api';

type FeedbackType = 'NEGATIVE' | 'POSITIVE' | null;

export interface FeedbackButtonsProps {
	agentERC: string;
	agentName: string;
	sessionId?: string;
	surface: 'AI_ASSISTANT_CHAT' | 'WRITING_ASSISTANT';
}

export default function FeedbackButtons({
	agentERC,
	agentName,
	sessionId,
	surface,
}: FeedbackButtonsProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const [selected, setSelected] = useState<FeedbackType>(null);

	async function submitFeedback(payload: AgentFeedbackPayload) {
		try {
			await postAgentFeedback(payload);

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

		submitFeedback({
			agentERC,
			agentName,
			feedbackType: 'POSITIVE',
			pageUrl: window.location.href,
			sessionId,
			surface,
		});
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

		submitFeedback({
			agentERC,
			agentName,
			description,
			feedbackType: 'NEGATIVE',
			issueType,
			pageUrl: window.location.href,
			sessionId,
			surface,
		});
	}

	return (
		<ClayIconSpriteContext.Provider value={Liferay.Icons.spritemap}>
			<div className="feedback-buttons-container">
				<span className="feedback-buttons-label">
					{Liferay.Language.get('was-this-helpful')}
				</span>

				<div className="feedback-buttons-group">
					<button
						aria-label={Liferay.Language.get('helpful')}
						className={
							'feedback-button' +
							(selected === 'POSITIVE'
								? ' feedback-button--selected'
								: '')
						}
						disabled={selected !== null}
						onClick={handleThumbsUp}
						onMouseDown={(event) => event.stopPropagation()}
						type="button"
					>
						<ClayIcon
							height={16}
							symbol="thumbs-up"
							width={16}
						/>
					</button>

					<button
						aria-label={Liferay.Language.get('not-helpful')}
						className={
							'feedback-button' +
							(selected === 'NEGATIVE'
								? ' feedback-button--selected'
								: '')
						}
						disabled={selected !== null}
						onClick={handleThumbsDown}
						onMouseDown={(event) => event.stopPropagation()}
						type="button"
					>
						<ClayIcon
							height={16}
							symbol="thumbs-down"
							width={16}
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
		</ClayIconSpriteContext.Provider>
	);
}
