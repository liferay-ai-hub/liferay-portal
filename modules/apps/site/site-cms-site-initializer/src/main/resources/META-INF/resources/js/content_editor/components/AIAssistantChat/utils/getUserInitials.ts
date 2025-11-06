/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

export default function getInitials(name: string): string {
	const normalizedName = name?.trim();

	if (!normalizedName) {
		return '';
	}

	const names = normalizedName.split(/\s+/);

	if (names.length > 1) {
		return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
	}

	return normalizedName.substring(0, 2).toUpperCase();
}
