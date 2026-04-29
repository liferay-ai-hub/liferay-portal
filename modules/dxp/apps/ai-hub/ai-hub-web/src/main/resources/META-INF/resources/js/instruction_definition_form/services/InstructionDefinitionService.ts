/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {fetch} from 'frontend-js-web';

import {InstructionDefinition} from '../types/InstructionDefinition';

const INSTRUCTION_DEFINITION_BASE_URI =
	'/o/ai-hub/instruction-definitions/by-external-reference-code/';

const MAX_PAGE_SIZE = 200;

async function getInstructionDefinition(externalReferenceCode: string) {
	const response = await fetch(
		`${INSTRUCTION_DEFINITION_BASE_URI}${externalReferenceCode}`,
		{
			method: 'GET',
		}
	);

	if (!response.ok) {
		throw new Error(
			`Failed to fetch instruction definition: ${response.status} ${response.statusText}`
		);
	}

	return response.json();
}

async function putInstructionDefinition(
	instructionDefinition: InstructionDefinition
) {
	const response = await fetch(
		`${INSTRUCTION_DEFINITION_BASE_URI}${instructionDefinition.externalReferenceCode}`,
		{
			body: JSON.stringify(instructionDefinition),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'PUT',
		}
	);

	return response.json();
}

async function getMaxPriority(
	accountEntryExternalReferenceCode: string
): Promise<number> {
	const response = await fetch(
		`/o/ai-hub/instruction-definitions?sort=priority:desc&pageSize=1&filter=r_accountToAIHubInstructionDefinitions_accountEntryERC eq '${accountEntryExternalReferenceCode}'`,
		{
			method: 'GET',
		}
	);

	if (!response.ok) {
		return 1;
	}

	const data = await response.json();

	const items = data.items ?? [];

	if (items.length === 0) {
		return 1;
	}

	return (items[0].priority ?? 0) + 1;
}

async function getInstructionDefinitions(
	accountEntryExternalReferenceCode: string
): Promise<InstructionDefinition[]> {
	const response = await fetch(
		`/o/ai-hub/instruction-definitions?sort=priority:asc&pageSize=${MAX_PAGE_SIZE}&filter=r_accountToAIHubInstructionDefinitions_accountEntryERC eq '${accountEntryExternalReferenceCode}'`,
		{
			method: 'GET',
		}
	);

	if (!response.ok) {
		return [];
	}

	const data = await response.json();

	return (data.items ?? []).map((item: any) => ({
		...item,
		scope: item.scope?.key ?? item.scope ?? '',
	}));
}

async function deleteInstructionDefinition(
	externalReferenceCode: string
): Promise<void> {
	const response = await fetch(
		`${INSTRUCTION_DEFINITION_BASE_URI}${externalReferenceCode}`,
		{
			method: 'DELETE',
		}
	);

	if (!response.ok) {
		throw new Error(
			`Failed to delete instruction definition: ${response.status} ${response.statusText}`
		);
	}
}

async function checkPriorityInUse(
	accountEntryExternalReferenceCode: string,
	priority: number,
	currentExternalReferenceCode?: string
): Promise<boolean> {
	const response = await fetch(
		`/o/ai-hub/instruction-definitions?pageSize=5&filter=r_accountToAIHubInstructionDefinitions_accountEntryERC eq '${accountEntryExternalReferenceCode}' and priority eq ${priority}`,
		{
			method: 'GET',
		}
	);

	if (!response.ok) {
		return false;
	}

	const data = await response.json();

	const items: InstructionDefinition[] = data.items ?? [];

	if (currentExternalReferenceCode) {
		return items.some(
			(item) =>
				item.externalReferenceCode !== currentExternalReferenceCode
		);
	}

	return items.length > 0;
}

export {
	checkPriorityInUse,
	deleteInstructionDefinition,
	getInstructionDefinition,
	getInstructionDefinitions,
	getMaxPriority,
	putInstructionDefinition,
};
