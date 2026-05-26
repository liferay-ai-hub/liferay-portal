/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayIcon from '@clayui/icon';
import React, {ReactNode} from 'react';

import './MetricCard.scss';

export default function MetricCard({
	children,
	icon,
	title,
	titleHelpMessage,
	value,
}: {
	children?: ReactNode;
	icon?: ReactNode;
	title: string;
	titleHelpMessage?: string;
	value: ReactNode;
}) {
	return (
		<article className="ai-hub-metric-card">
			<header className="ai-hub-metric-card-header">
				<div className="ai-hub-metric-card-title-group">
					<h2 className="ai-hub-metric-card-title">{title}</h2>

					{titleHelpMessage ? (
						<ClayIcon
							aria-label={titleHelpMessage}
							className="lfr-portal-tooltip text-secondary"
							data-title={titleHelpMessage}
							symbol="question-circle-full"
							tabIndex={0}
						/>
					) : null}
				</div>

				{icon ? (
					<span className="ai-hub-metric-card-icon">{icon}</span>
				) : null}
			</header>

			<div className="ai-hub-metric-card-value">{value}</div>

			{children ? (
				<div className="ai-hub-metric-card-footer">{children}</div>
			) : null}
		</article>
	);
}
