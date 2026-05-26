/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {render, screen} from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';

import PrepaidBalanceCard from '../../../../src/main/resources/META-INF/resources/js/activity_dashboard/components/PrepaidBalanceCard';

const LANGUAGE_KEYS: Record<string, string> = {
	'expires-on-x': 'Expires on {0}',
	'liferay-tokens-are-used-in-this-order':
		'Liferay Tokens are used in this order: monthly allowance → prepaid balance → hard cap (calls blocked). Additional LRT can be purchased via Marketplace.',
};

(global as any).Liferay = {
	Language: {
		get: (key: string) => LANGUAGE_KEYS[key] ?? key,
	},
	ThemeDisplay: {
		getBCP47LanguageId: () => 'en-US',
	},
};

describe('PrepaidBalanceCard', () => {
	it('exposes the consumption-order tooltip via the info icon accessible name', () => {
		render(
			<PrepaidBalanceCard
				balance={2500}
				expiresAt="2099-05-21T00:00:00Z"
			/>
		);

		expect(
			screen.getByLabelText(
				'Liferay Tokens are used in this order: monthly allowance → prepaid balance → hard cap (calls blocked). Additional LRT can be purchased via Marketplace.'
			)
		).toBeInTheDocument();
	});

	it('renders no expiry row when there is no expiration date', () => {
		render(<PrepaidBalanceCard balance={0} expiresAt={null} />);

		expect(screen.getByText('0 LRT')).toBeInTheDocument();
		expect(screen.queryByText('expired')).not.toBeInTheDocument();
		expect(screen.queryByText(/Expires on/)).not.toBeInTheDocument();
	});

	it('renders the balance value and the title', () => {
		render(
			<PrepaidBalanceCard
				balance={2500}
				expiresAt="2099-05-21T00:00:00Z"
			/>
		);

		expect(
			screen.getByRole('heading', {
				level: 2,
				name: 'remaining-prepaid-balance-liferay-tokens',
			})
		).toBeInTheDocument();
		expect(screen.getByText('2,500 LRT')).toBeInTheDocument();
	});

	it('renders the expired indicator when the expiration date has passed', () => {
		render(
			<PrepaidBalanceCard
				balance={100}
				expiresAt="2020-01-01T00:00:00Z"
			/>
		);

		expect(screen.getByText('expired')).toBeInTheDocument();
	});

	it('renders the formatted expiration date when the balance is valid', () => {
		render(
			<PrepaidBalanceCard
				balance={2500}
				expiresAt="2099-05-21T00:00:00Z"
			/>
		);

		expect(screen.getByText('Expires on May 21, 2099')).toBeInTheDocument();
	});
});
