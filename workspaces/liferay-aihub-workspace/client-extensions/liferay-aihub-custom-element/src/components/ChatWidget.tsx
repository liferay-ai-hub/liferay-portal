/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {EventSource} from 'eventsource';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {createEventSource, getChatbotConfig, postChatMessage} from '../api';
import {ChatMessage, ChatbotConfig, WidgetConfiguration} from '../types';
import AssistantMessage from './AssistantMessage';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatIntro from './ChatIntro';
import ErrorMessage from './ErrorMessage';
import GeneratingIndicator from './GeneratingIndicator';
import {ChatIcon, CloseIcon} from './Icons';
import UserMessage from './UserMessage';

interface ChatWidgetProps {
	widgetConfiguration: WidgetConfiguration;
}

export default function ChatWidget({widgetConfiguration}: ChatWidgetProps) {
	const [chatbotConfig, setChatbotConfig] = useState<ChatbotConfig | null>(
		null
	);
	const [generating, setGenerating] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [notificationDismissed, setNotificationDismissed] = useState(false);
	const [open, setOpen] = useState(false);

	const eventSourceRef = useRef<EventSource | null>(null);
	const eventSourceReference = useRef<string | null>(null);
	const generatingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null
	);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		getChatbotConfig(widgetConfiguration.chatbotExternalReferenceCode)
			.then(setChatbotConfig)
			.catch((error) => {
				console.error('[AI Hub Chat] Error fetching config:', error);
			});
	}, [widgetConfiguration.chatbotExternalReferenceCode]);

	useEffect(() => {
		const eventSource = createEventSource();

		eventSourceRef.current = eventSource;

		eventSource.addEventListener('Chat Message Sent', (event) => {
			if (generatingTimeoutRef.current) {
				clearTimeout(generatingTimeoutRef.current);
				generatingTimeoutRef.current = null;
			}

			const dataJSON = JSON.parse((event as MessageEvent).data);

			setMessages((prev) => [
				...prev,
				{sender: 'assistant', text: dataJSON['data']},
			]);

			setGenerating(false);
		});

		eventSource.addEventListener('Subscribe', (event) => {
			eventSourceReference.current = (event as MessageEvent).data;
		});

		return () => {
			if (generatingTimeoutRef.current) {
				clearTimeout(generatingTimeoutRef.current);
			}

			eventSourceRef.current?.close();
			eventSourceRef.current = null;
		};
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
	}, [messages, generating]);

	const handleToggle = useCallback(() => {
		setOpen((prev) => !prev);
		setNotificationDismissed(true);
	}, []);

	const sendMessage = useCallback(
		(text: string) => {
			if (!eventSourceReference.current) {
				return;
			}

			setMessages((prev) => [...prev, {sender: 'user', text}]);
			setGenerating(true);

			postChatMessage(
				widgetConfiguration.chatbotExternalReferenceCode,
				eventSourceReference.current,
				text
			)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Failed to post message');
					}

					generatingTimeoutRef.current = setTimeout(() => {
						setMessages((prev) => [
							...prev,
							{sender: 'error', text: ''},
						]);
						setGenerating(false);
					}, 30000);
				})
				.catch((error) => {
					console.error(
						'[AI Hub Chat] Failed to send message:',
						error
					);

					setMessages((prev) => [
						...prev,
						{sender: 'error', text: ''},
					]);
					setGenerating(false);
				});
		},
		[widgetConfiguration.chatbotExternalReferenceCode]
	);

	if (!chatbotConfig || !chatbotConfig.active) {
		return null;
	}

	const title = chatbotConfig.title;

	return (
		<>
			<div className={'aihub-panel' + (open ? ' open' : '')}>
				<ChatHeader onClose={handleToggle} title={title} />

				<div className="aihub-messages">
					<ChatIntro
						introMessage={chatbotConfig.introMessage}
						title={title}
					/>

					{messages.map((msg, index) => {
						if (msg.sender === 'assistant') {
							return (
								<AssistantMessage key={index} text={msg.text} />
							);
						}

						if (msg.sender === 'error') {
							return <ErrorMessage key={index} />;
						}

						return <UserMessage key={index} text={msg.text} />;
					})}

					{generating && <GeneratingIndicator />}

					<div ref={messagesEndRef} />
				</div>

				<ChatInput
					disabled={generating}
					onSubmit={sendMessage}
					placeholder={chatbotConfig.placeholderMessage}
				/>

				<ChatFooter />
			</div>

			{!open &&
				!notificationDismissed &&
				chatbotConfig.notificationMessage && (
					<div className="aihub-notification">
						<span>{chatbotConfig.notificationMessage}</span>

						<button
							aria-label="Dismiss"
							className="aihub-notification-close"
							onClick={() => setNotificationDismissed(true)}
						>
							<CloseIcon />
						</button>
					</div>
				)}

			<button
				aria-label={open ? 'Close AI Assistant' : 'Open AI Assistant'}
				className="aihub-toggle"
				onClick={handleToggle}
			>
				{open ? <CloseIcon /> : <ChatIcon />}
			</button>
		</>
	);
}
