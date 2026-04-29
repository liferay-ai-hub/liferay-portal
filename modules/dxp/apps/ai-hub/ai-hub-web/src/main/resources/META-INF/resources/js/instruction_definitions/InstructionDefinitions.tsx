/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayLabel from '@clayui/label';
import {openToast} from '@liferay/object-js-components-web';
import React, {useCallback, useEffect, useState} from 'react';

import OrderableTable from '../components/OrderableTable';
import {
	deleteInstructionDefinition,
	getInstructionDefinitions,
	putInstructionDefinition,
} from '../instruction_definition_form/services/InstructionDefinitionService';
import {
	ListTypeEntry,
	getListTypeEntries,
} from '../instruction_definition_form/services/ListTypeDefinitionService';
import {InstructionDefinition} from '../instruction_definition_form/types/InstructionDefinition';

const defaultLanguageId = Liferay.ThemeDisplay.getDefaultLanguageId();

export default function InstructionDefinitions({
	accountEntryExternalReferenceCode,
	instructionURL,
}: {
	accountEntryExternalReferenceCode: string;
	instructionURL: string;
}) {
	const [instructions, setInstructions] = useState<InstructionDefinition[]>(
		[]
	);
	const [scopeOptions, setScopeOptions] = useState<ListTypeEntry[]>([]);

	const fetchInstructions = useCallback(async () => {
		const items = await getInstructionDefinitions(
			accountEntryExternalReferenceCode
		);

		setInstructions(items);
	}, [accountEntryExternalReferenceCode]);

	useEffect(() => {
		fetchInstructions();
	}, [fetchInstructions]);

	useEffect(() => {
		getListTypeEntries('L_AI_HUB_INSTRUCTION_DEFINITION_SCOPES').then(
			(response) => setScopeOptions(response.items || [])
		);
	}, []);

	const handleDelete = async ({item}: {item: InstructionDefinition}) => {
		if (
			!window.confirm(
				Liferay.Language.get('are-you-sure-you-want-to-delete-this')
			)
		) {
			return;
		}

		try {
			await deleteInstructionDefinition(item.externalReferenceCode);

			setInstructions((prev) =>
				prev.filter(
					(i) =>
						i.externalReferenceCode !== item.externalReferenceCode
				)
			);

			openToast({
				message: Liferay.Language.get(
					'instruction-deleted-successfully'
				),
				type: 'success',
			});
		}
		catch {
			openToast({
				message: Liferay.Language.get('an-unexpected-error-occurred'),
				type: 'danger',
			});
		}
	};

	const handleOrderChange = async ({order}: {order: string}) => {
		const ercs = order.split(',');

		const updates: Array<{erc: string; priority: number}> = [];

		ercs.forEach((erc, index) => {
			const newPriority = index + 1;

			const instruction = instructions.find(
				(i) => i.externalReferenceCode === erc
			);

			if (instruction && instruction.priority !== newPriority) {
				updates.push({erc, priority: newPriority});
			}
		});

		if (!updates.length) {
			return;
		}

		try {
			await Promise.all(
				updates.map(({erc, priority}) => {
					const instruction = instructions.find(
						(i) => i.externalReferenceCode === erc
					)!;

					return putInstructionDefinition({
						...instruction,
						priority,
					});
				})
			);

			setInstructions((prev) =>
				prev
					.map((instruction) => {
						const update = updates.find(
							(u) =>
								u.erc === instruction.externalReferenceCode
						);

						return update
							? {...instruction, priority: update.priority}
							: instruction;
					})
					.sort((a, b) => a.priority - b.priority)
			);

			openToast({
				message: Liferay.Language.get(
					'priorities-updated-successfully'
				),
				type: 'success',
			});
		}
		catch {
			openToast({
				message: Liferay.Language.get('failed-to-update-priorities'),
				type: 'danger',
			});
		}
	};

	const items = instructions.map((instruction) => {
		const scopeOption = scopeOptions.find(
			(option) => option.key === instruction.scope
		);

		const scopeLabel =
			scopeOption?.name_i18n?.[defaultLanguageId] ||
			scopeOption?.name ||
			instruction.scope;

		return {
			...instruction,
			label:
				instruction.title_i18n?.[defaultLanguageId] ||
				instruction.externalReferenceCode,
			scopeLabel,
			title:
				instruction.title_i18n?.[defaultLanguageId] ||
				instruction.externalReferenceCode,
		};
	});

	return (
		<OrderableTable
			actions={[
				{
					icon: 'pencil',
					label: Liferay.Language.get('edit'),
					onClick: ({item}: {item: InstructionDefinition}) => {
						window.location.href = `${instructionURL}?externalReferenceCode=${item.externalReferenceCode}`;
					},
				},
				{
					icon: 'trash',
					label: Liferay.Language.get('delete'),
					onClick: handleDelete,
				},
			]}
			creationMenuItems={[
				{
					onClick: () => {
						window.location.href = instructionURL;
					},
				},
			]}
			fields={[
				{
					headingTitle: true,
					label: Liferay.Language.get('title'),
					name: 'title',
				},
				{
					label: Liferay.Language.get('description'),
					name: 'description',
				},
				{
					label: Liferay.Language.get('where-to-use'),
					name: 'scopeLabel',
				},
				{
					label: Liferay.Language.get('priority'),
					name: 'priority',
				},
				{
					contentRenderer: {
						component: ({item}) => (
							<ClayLabel
								displayType={
									item.active ? 'info' : 'secondary'
								}
							>
								{item.active
									? Liferay.Language.get('enabled')
									: Liferay.Language.get('disabled')}
							</ClayLabel>
						),
						textMatch: (item: {active: boolean}) =>
							item.active
								? Liferay.Language.get('enabled')
								: Liferay.Language.get('disabled'),
					},
					label: Liferay.Language.get('status'),
					name: 'active',
				},
			]}
			items={items}
			noItemsButtonLabel={Liferay.Language.get('new-instruction')}
			noItemsDescription={Liferay.Language.get(
				'create-your-first-instruction-to-guide-agent-behavior'
			)}
			noItemsTitle={Liferay.Language.get('no-instructions-yet')}
			onOrderChange={handleOrderChange}
		/>
	);
}
