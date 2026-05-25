/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {useEffect, useState} from 'react';

import FeedbackButtons from '../../FeedbackButtons';
import ConfirmationBalloon from './ConfirmationBalloon';

type Phase = 'confirming' | 'feedback';

export default function WritingAssistantConfirmationAction({
	agentERC,
	containerRef,
	handleAccept,
	handleDiscard,
	hideBalloon,
	sessionId,
}: {
	agentERC: string;
	containerRef: HTMLElement;
	handleAccept: () => void;
	handleDiscard: () => void;
	hideBalloon: () => void;
	sessionId?: string;
}) {
	const [phase, setPhase] = useState<Phase>('confirming');

	const actions = [
		{
			disabled: false,
			name: Liferay.Language.get('accept'),
			onClick: () => {
				handleAccept();
				setPhase('feedback');
			},
			symbolLeft: 'check',
		},
		{
			disabled: false,
			name: Liferay.Language.get('discard'),
			onClick: () => {
				handleDiscard();
				setPhase('feedback');
			},
			symbolLeft: 'times',
		},
		{
			disabled: true,
			name: Liferay.Language.get('regenerate'),
			onClick: () => {},
			symbolLeft: 'reset',
		},
	];

	useEffect(() => {
		function handleDocumentClick(event: MouseEvent) {
			if (
				phase === 'confirming' &&
				containerRef &&
				!containerRef.contains(event.target as Node)
			) {
				hideBalloon();
			}
		}

		document.addEventListener('mousedown', handleDocumentClick);

		return () => {
			document.removeEventListener('mousedown', handleDocumentClick);
		};
	}, [containerRef, hideBalloon, phase]);

	if (phase === 'feedback') {
		return (
			<FeedbackButtons
				agentERC={agentERC}
				agentName={agentERC}
				sessionId={sessionId}
				surface="WRITING_ASSISTANT"
			/>
		);
	}

	return <ConfirmationBalloon actions={actions} />;
}
