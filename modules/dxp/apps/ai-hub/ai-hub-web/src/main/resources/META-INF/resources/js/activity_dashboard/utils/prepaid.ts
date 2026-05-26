/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

export function formatExpirationDate(
	expiresAt: string,
	locale: string
): string {
	return new Intl.DateTimeFormat(locale, {
		day: 'numeric',
		month: 'long',
		timeZone: 'UTC',
		year: 'numeric',
	}).format(new Date(expiresAt));
}

export function isPrepaidExpired(
	expiresAt: string,
	now: Date = new Date()
): boolean {
	return new Date(expiresAt).getTime() < now.getTime();
}
