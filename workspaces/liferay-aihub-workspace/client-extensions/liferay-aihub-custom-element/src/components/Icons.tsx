/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayIcon, {ClayIconSpriteContext} from '@clayui/icon';
import React from 'react';

import {getSpritemapURL} from '../api';

const WrappedClayIcon = ({symbol}: {symbol: string}) => (
	<ClayIconSpriteContext.Provider value={getSpritemapURL()}>
		<ClayIcon symbol={symbol} />
	</ClayIconSpriteContext.Provider>
);

export function BotIcon() {
	return <WrappedClayIcon symbol="chatbot" />;
}

export function ChatIcon() {
	return <WrappedClayIcon symbol="comments" />;
}

export function CloseIcon() {
	return <WrappedClayIcon symbol="times" />;
}

export function ErrorIcon() {
	return (
		<span className="text-danger">
			<WrappedClayIcon symbol="exclamation-full" />
		</span>
	);
}

export function SendIcon() {
	return (
		<svg viewBox="0 0 24 24">
			<path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
		</svg>
	);
}

export function StarsIcon() {
	return (
		<svg viewBox="0 0 16 16">
			<path d="M8 0l1.5 4.5L14 6l-4.5 1.5L8 12l-1.5-4.5L2 6l4.5-1.5L8 0zm5 8l.9 2.6L16 11.5l-2.1.9L13 15l-.9-2.6-2.1-.9 2.1-.9L13 8zM3 10l.6 1.7L5 12.3l-1.4.6L3 14.6l-.6-1.7L1 12.3l1.4-.6L3 10z" />
		</svg>
	);
}
