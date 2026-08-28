/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {render} from '@liferay/frontend-js-react-web';
import {
	act,
	fireEvent,
	render as renderTL,
	screen,
} from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';

import AIAssistant, {
	close,
	endAgentRun,
	getState,
	open,
	releaseHost,
	startAgentRun,
} from '../../../src/main/resources/META-INF/resources/js/AIAssistantChat/AIAssistant';
import AIAssistantTriggerButton from '../../../src/main/resources/META-INF/resources/js/AIAssistantChat/AIAssistantTriggerButton';

jest.mock('@liferay/frontend-js-react-web', () => ({
	render: jest.fn(),
}));

const HOST_SELECTOR = '#ai-assistant-host-root';

function hostCount() {
	return document.querySelectorAll(HOST_SELECTOR).length;
}

function command(triggerId: string) {
	return {instructionDefinitionScope: 'cms', triggerId};
}

afterEach(() => {
	close();
});

describe('AIAssistant single-host invariants', () => {
	it('mounts exactly one host, no matter how many opens', () => {
		expect(hostCount()).toBe(0);

		open(command('a'));
		open(command('b'));
		open(command('c'));

		expect(hostCount()).toBe(1);
		expect(render).toHaveBeenCalledTimes(1);
	});

	it('opening another trigger replaces the active one (never two open)', () => {
		open(command('a'));

		expect(getState().command?.triggerId).toBe('a');

		open(command('b'));

		expect(getState().command?.triggerId).toBe('b');
	});

	it('remounts the host after an SPA navigation unmounts it', () => {
		open(command('a'));

		expect(render).toHaveBeenCalledTimes(1);

		releaseHost();

		expect(getState().command).toBeNull();

		open(command('b'));

		expect(hostCount()).toBe(1);
		expect(render).toHaveBeenCalledTimes(2);
		expect(getState().command?.triggerId).toBe('b');
	});

	it('close clears the command', () => {
		open(command('a'));

		expect(getState().command).not.toBeNull();

		close();

		expect(getState().command).toBeNull();
	});

	it('routes the public aiAssistant:command event to the one host', () => {
		const [, handler] =
			(Liferay.on as jest.Mock).mock.calls.find(
				([event]) => event === 'aiAssistant:command'
			) ?? [];

		expect(handler).toBeDefined();

		handler(command('from-event'));

		expect(getState().command?.triggerId).toBe('from-event');
		expect(hostCount()).toBe(1);
	});

	it('exposes a stable default controller API', () => {
		expect(typeof AIAssistant.open).toBe('function');
		expect(typeof AIAssistant.close).toBe('function');
		expect(typeof AIAssistant.subscribe).toBe('function');
	});
});

describe('AIAssistantTriggerButton', () => {
	it('anchors the assistant to the anchorId element when it is on the page', () => {
		const anchor = document.createElement('div');

		anchor.id = 'toolbar-anchor';

		document.body.appendChild(anchor);

		renderTL(
			<AIAssistantTriggerButton
				anchorId="toolbar-anchor"
				instructionDefinitionScope="cms"
				label="Generate"
				triggerId="generate"
			/>
		);

		fireEvent.click(screen.getByRole('button', {name: 'Generate'}));

		expect(getState().command?.anchorId).toBe('toolbar-anchor');
		expect(getState().command?.triggerId).toBe('generate');

		anchor.remove();
	});

	it('anchors the assistant to itself when the anchorId element is absent', () => {
		renderTL(
			<AIAssistantTriggerButton
				anchorId="missing-anchor"
				instructionDefinitionScope="cms"
				label="Generate"
				triggerId="generate"
			/>
		);

		fireEvent.click(screen.getByRole('button', {name: 'Generate'}));

		expect(getState().command?.anchorId).toBe('generate');
	});

	it('invokes onOpen when opening but not when toggling closed', () => {
		const onOpen = jest.fn();

		renderTL(
			<AIAssistantTriggerButton
				instructionDefinitionScope="cms"
				label="Generate"
				onOpen={onOpen}
				triggerId="generate"
			/>
		);

		const trigger = screen.getByRole('button', {name: 'Generate'});

		fireEvent.click(trigger);

		expect(onOpen).toHaveBeenCalledTimes(1);
		expect(getState().command?.triggerId).toBe('generate');

		fireEvent.click(trigger);

		expect(onOpen).toHaveBeenCalledTimes(1);
		expect(getState().command).toBeNull();
	});

	it('keeps the trigger disabled for its whole run, even while closed', () => {
		renderTL(
			<AIAssistantTriggerButton
				agentERC="L_AUTO_CATEGORIZE"
				instructionDefinitionScope="cms"
				label="Categories"
				triggerId="categories"
			/>
		);

		const categories = screen.getByRole('button', {name: 'Categories'});

		fireEvent.click(categories);

		act(() => {
			startAgentRun('run-1', 'L_AUTO_CATEGORIZE');
		});

		expect(categories).toBeDisabled();

		act(() => {
			close();
		});

		expect(categories).toBeDisabled();

		act(() => {
			endAgentRun('run-1');
		});

		expect(categories).toBeEnabled();
	});

	it('disables only the triggers that opted into the running agent', () => {
		renderTL(
			<>
				<AIAssistantTriggerButton
					agentERC="L_AUTO_CATEGORIZE"
					instructionDefinitionScope="cms"
					label="Categories"
					triggerId="categories"
				/>
				<AIAssistantTriggerButton
					agentERC="L_GENERATE_TAGS"
					instructionDefinitionScope="cms"
					label="Tags"
					triggerId="tags"
				/>
				<AIAssistantTriggerButton
					instructionDefinitionScope="cms"
					label="Chat"
					triggerId="chat"
				/>
			</>
		);

		act(() => {
			startAgentRun('run-1', 'L_AUTO_CATEGORIZE');
		});

		expect(screen.getByRole('button', {name: 'Categories'})).toBeDisabled();
		expect(screen.getByRole('button', {name: 'Tags'})).toBeEnabled();
		expect(screen.getByRole('button', {name: 'Chat'})).toBeEnabled();

		act(() => {
			endAgentRun('run-1');
		});
	});

	it('keeps the trigger disabled until the last run of its agent ends', () => {
		renderTL(
			<AIAssistantTriggerButton
				agentERC="L_AUTO_CATEGORIZE"
				instructionDefinitionScope="cms"
				label="Categories"
				triggerId="categories"
			/>
		);

		const categories = screen.getByRole('button', {name: 'Categories'});

		act(() => {
			startAgentRun('run-1', 'L_AUTO_CATEGORIZE');
			startAgentRun('run-2', 'L_AUTO_CATEGORIZE');
		});

		expect(categories).toBeDisabled();

		act(() => {
			endAgentRun('run-1');
		});

		expect(categories).toBeDisabled();

		act(() => {
			endAgentRun('run-2');
		});

		expect(categories).toBeEnabled();
	});

	it('marks only the trigger that is driving the host as expanded', () => {
		renderTL(
			<>
				<AIAssistantTriggerButton
					instructionDefinitionScope="cms"
					label="Toolbar"
					triggerId="toolbar"
				/>
				<AIAssistantTriggerButton
					instructionDefinitionScope="cms"
					label="Attachment"
					triggerId="attachment"
				/>
			</>
		);

		const toolbar = screen.getByRole('button', {name: 'Toolbar'});
		const attachment = screen.getByRole('button', {name: 'Attachment'});

		expect(toolbar).toHaveAttribute('aria-expanded', 'false');

		fireEvent.click(toolbar);

		expect(toolbar).toHaveAttribute('aria-expanded', 'true');
		expect(attachment).toHaveAttribute('aria-expanded', 'false');

		fireEvent.click(attachment);

		expect(toolbar).toHaveAttribute('aria-expanded', 'false');
		expect(attachment).toHaveAttribute('aria-expanded', 'true');

		fireEvent.click(attachment);

		expect(attachment).toHaveAttribute('aria-expanded', 'false');
		expect(getState().command).toBeNull();
	});
});
