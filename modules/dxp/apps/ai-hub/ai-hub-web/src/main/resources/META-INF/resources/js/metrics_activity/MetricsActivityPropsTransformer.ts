/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

const HIDDEN_FIELDS = [
	'id',
	'duration',
	'nodeName',
	'output',
	'promptInput',
	'inputTokensCount',
	'outputTokensCount',
	'totalTokenCount',
	'userMessage',
];

export default function propsTransformer({
	itemsActions,
	views,
	...otherProps
}: any) {
	const tableView = views?.find((v: any) => v.name === 'table');

	if (tableView?.schema?.fields) {
		tableView.schema.fields = tableView.schema.fields.filter(
			(f: any) => !HIDDEN_FIELDS.includes(f.fieldName)
		);
	}

	return {
		...otherProps,
		itemsActions: [],
		views,
	};
}
