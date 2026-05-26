/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayIcon from '@clayui/icon';
import {sub} from 'frontend-js-web';
import React from 'react';

import {formatExpirationDate, isPrepaidExpired} from '../utils/prepaid';
import MetricCard from './MetricCard';

import './PrepaidBalanceCard.scss';

export default function PrepaidBalanceCard({
	balance,
	expiresAt,
}: {
	balance: number;
	expiresAt: string | null;
}) {
	const formattedBalance = balance.toLocaleString(
		Liferay.ThemeDisplay.getBCP47LanguageId()
	);

	return (
		<MetricCard
			icon={<ClayIcon symbol="analytics" />}
			title={Liferay.Language.get(
				'remaining-prepaid-balance-liferay-tokens'
			)}
			titleHelpMessage={Liferay.Language.get(
				'liferay-tokens-are-used-in-this-order'
			)}
			value={`${formattedBalance} LRT`}
		>
			{expiresAt &&
				(isPrepaidExpired(expiresAt) ? (
					<span className="ai-hub-prepaid-balance-card-expired">
						<ClayIcon symbol="times-small" />

						{Liferay.Language.get('expired')}
					</span>
				) : (
					<span className="ai-hub-prepaid-balance-card-expires">
						{sub(
							Liferay.Language.get('expires-on-x'),
							formatExpirationDate(
								expiresAt,
								Liferay.ThemeDisplay.getBCP47LanguageId()
							)
						)}
					</span>
				))}
		</MetricCard>
	);
}
