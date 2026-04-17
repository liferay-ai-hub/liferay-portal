/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React from 'react';

import Logo from './Logo';

interface ChatbotIntroProps {
	companyLogo?: string;
	introMessage: string;
	title: string;
}

export default function ChatbotIntro({
	companyLogo,
	introMessage,
	title,
}: ChatbotIntroProps) {
	return (
		<div className="aihub-intro">
			{companyLogo ? (
				<img
					alt={title}
					className="aihub-intro-logo"
					src={companyLogo}
				/>
			) : (
				<Logo className="aihub-intro-logo" />
			)}

			<div className="aihub-intro-name">{title}</div>

			<p className="aihub-intro-text">{introMessage}</p>
		</div>
	);
}
