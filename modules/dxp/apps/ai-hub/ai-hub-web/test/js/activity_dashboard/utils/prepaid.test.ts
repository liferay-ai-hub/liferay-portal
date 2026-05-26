/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {
	formatExpirationDate,
	isPrepaidExpired,
} from '../../../../src/main/resources/META-INF/resources/js/activity_dashboard/utils/prepaid';

describe('formatExpirationDate', () => {
	it('formats the date using the en-US locale', () => {
		expect(formatExpirationDate('2027-05-21T00:00:00Z', 'en-US')).toBe(
			'May 21, 2027'
		);
	});

	it('respects the provided locale', () => {
		expect(formatExpirationDate('2027-05-21T00:00:00Z', 'de-DE')).toBe(
			'21. Mai 2027'
		);
	});
});

describe('isPrepaidExpired', () => {
	it('considers the time of day on the expiration date', () => {
		expect(
			isPrepaidExpired(
				'2026-05-26T12:00:00Z',
				new Date('2026-05-26T11:59:59Z')
			)
		).toBe(false);
		expect(
			isPrepaidExpired(
				'2026-05-26T12:00:00Z',
				new Date('2026-05-26T12:00:01Z')
			)
		).toBe(true);
	});

	it('returns false when the expiration date is exactly now', () => {
		const now = new Date('2026-05-26T00:00:00Z');

		expect(isPrepaidExpired('2026-05-26T00:00:00Z', now)).toBe(false);
	});

	it('returns false when the expiration date is in the future', () => {
		const now = new Date('2026-05-26T00:00:00Z');

		expect(isPrepaidExpired('2030-01-01T00:00:00Z', now)).toBe(false);
	});

	it('returns true when the expiration date is in the past', () => {
		const now = new Date('2026-05-26T00:00:00Z');

		expect(isPrepaidExpired('2020-01-01T00:00:00Z', now)).toBe(true);
	});
});
