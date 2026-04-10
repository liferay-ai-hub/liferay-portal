/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React from 'react';
import {createRoot} from 'react-dom/client';

import {setAIHubURL} from './api';
import ChatWidget from './components/ChatWidget';
import {WidgetConfig} from './types';

import './widget.css';

const WIDGET_ID = 'aihub-chat-widget';

if (!document.getElementById(WIDGET_ID)) {
	const scriptTag = document.getElementById('aihub-chat-widget-script');

	if (!scriptTag) {
		console.error(
			'[AI Hub Chat] Script tag with id="aihub-chat-widget-script" not found.'
		);
	}
	else {
		const config: WidgetConfig = {
			aiHubURL: scriptTag.getAttribute('ai-hub-url') || '',
			chatbotExternalReferenceCode:
				scriptTag.getAttribute('chatbot-external-reference-code') || '',
			spritemapURL: scriptTag.getAttribute('spritemap-url') || '',
		};

		const container = document.createElement('div');

		container.id = WIDGET_ID;

		document.body.appendChild(container);

		setAIHubURL(config.aiHubURL);

		createRoot(container).render(<ChatWidget config={config} />);
	}
}
