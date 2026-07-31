/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

const AI_HUB_NODE_TYPES = [
	'ai-decision',
	'ai-hub-agent',
	'http-request',
	'llm',
	'service',
];

const originalLocation = window.location;

describe('AI Hub node gating on an AI Hub deployment', () => {
	let colTypesField;
	let contents;
	let nodeTypes;

	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: new URL('https://ai.hub.liferay.com/'),
		});

		Liferay.FeatureFlags['LPD-62272'] = true;

		colTypesField =
			require('../../../../src/main/resources/META-INF/resources/designer/js/definition-builder/source-builder/constants').COL_TYPES_FIELD;
		contents =
			require('../../../../src/main/resources/META-INF/resources/designer/js/definition-builder/diagram-builder/components/sidebar/Sidebar').contents;
		nodeTypes =
			require('../../../../src/main/resources/META-INF/resources/designer/js/definition-builder/diagram-builder/components/nodes/utils').nodeTypes;
	});

	afterAll(() => {
		Liferay.FeatureFlags['LPD-62272'] = false;

		Object.defineProperty(window, 'location', {
			configurable: true,
			value: originalLocation,
		});
	});

	it('offers every AI Hub node', () => {
		AI_HUB_NODE_TYPES.forEach((nodeType) => {
			expect(colTypesField).toContain(nodeType);
			expect(contents).toHaveProperty(nodeType);
			expect(nodeTypes).toHaveProperty(nodeType);
		});
	});
});
