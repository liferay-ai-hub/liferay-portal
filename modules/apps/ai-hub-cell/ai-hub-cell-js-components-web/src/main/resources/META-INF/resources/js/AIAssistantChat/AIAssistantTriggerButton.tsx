/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {useEffect, useId, useSyncExternalStore} from 'react';

import {
	AIAssistantOpenCommand,
	close,
	ensureHost,
	getState,
	isAgentRunning,
	open,
	subscribe,
} from './AIAssistant';
import AIAssistantTrigger from './components/AIAssistantTrigger';

type AIAssistantTriggerButtonProps = Omit<
	AIAssistantOpenCommand,
	'anchorId' | 'triggerId'
> & {
	agentERC?: string;
	anchorId?: string;
	className?: string;
	hideLabel?: boolean;
	label?: string;
	onOpen?: () => void;
	round?: boolean;
	triggerId?: string;
};

const AIAssistantTriggerButton: React.FC<AIAssistantTriggerButtonProps> = ({
	agentERC,
	anchorId,
	className,
	hideLabel,
	label,
	onOpen,
	round = true,
	triggerId,
	...command
}) => {
	const generatedId = useId();
	const id = triggerId ?? generatedId;

	const state = useSyncExternalStore(subscribe, getState);
	const active = state.command?.triggerId === id;

	const busy = !!agentERC && isAgentRunning(state, agentERC);

	useEffect(() => {
		ensureHost();
	}, []);

	const handleClick = () => {
		if (active) {
			close();

			return;
		}

		open({
			presentation: 'sidebar',
			...command,
			anchorId:
				anchorId && document.getElementById(anchorId) ? anchorId : id,
			triggerId: id,
		});

		onOpen?.();
	};

	return (
		<AIAssistantTrigger
			aria-controls="ai-assistant-host-root"
			aria-expanded={active}
			className={className}
			disabled={busy}
			hideLabel={hideLabel}
			id={id}
			label={label}
			onClick={handleClick}
			round={round}
		/>
	);
};

export default AIAssistantTriggerButton;
