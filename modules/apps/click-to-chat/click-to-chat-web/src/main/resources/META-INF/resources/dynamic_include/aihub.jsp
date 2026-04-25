<%--
/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
--%>

<%@ include file="/dynamic_include/init.jsp" %>

<aui:script position="inline">
	(function () {
		if (document.getElementById('aihub-chat-widget-script')) {
			return;
		}

		var aihubServiceURL = '<%= clickToChatAIHubServiceURL %>';
		var chatProviderAccountId = '<%= clickToChatChatProviderAccountId %>';

		var linkElement = document.createElement('link');

		linkElement.href = aihubServiceURL + '/documents/d/global/index-css';
		linkElement.rel = 'stylesheet';

		document.head.appendChild(linkElement);

		var scriptElement = document.createElement('script');

		scriptElement.id = 'aihub-chatbot-widget-script';
		scriptElement.src = aihubServiceURL + '/documents/d/global/index-js';
		scriptElement.setAttribute('ai-hub-url', aihubServiceURL);
		scriptElement.setAttribute(
			'chatbot-external-reference-code',
			chatProviderAccountId
		);

		document.body.appendChild(scriptElement);
	})();
</aui:script>