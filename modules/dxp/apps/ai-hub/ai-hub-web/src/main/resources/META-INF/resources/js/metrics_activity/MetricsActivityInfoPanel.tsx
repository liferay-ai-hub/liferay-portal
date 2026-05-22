/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {SidePanel} from '@clayui/core';
import ClayLabel from '@clayui/label';
import React from 'react';

interface Props {
	items: any[];
}

const MetricsActivityInfoPanel = ({items}: Props) => {
	const activity = items?.[0];

	if (!activity) {
		return (
			<>
				<SidePanel.Header>
					<SidePanel.Title>Activity details</SidePanel.Title>
				</SidePanel.Header>

				<SidePanel.Body>
					<p className="text-secondary">
						Click on an activity to see its details.
					</p>
				</SidePanel.Body>
			</>
		);
	}

	const isError = activity.error === 'true' || activity.isError;

	const formatDate = (dateStr: string) => {
		if (!dateStr) return '-';

		try {
			return new Date(dateStr).toLocaleString();
		}
		catch {
			return dateStr;
		}
	};

	const formatDuration = (ms: number) => {
		if (!ms || ms <= 0) return '-';

		return ms >= 1000 ? `${(ms / 1000).toFixed(1)} s` : `${ms} ms`;
	};

	return (
		<>
			<SidePanel.Header>
				<div className="ai-hub-activity-panel-title-row">
					<SidePanel.Title>
						{activity.nodeName || '-'}
					</SidePanel.Title>

					{isError && (
						<ClayLabel displayType="danger">Error</ClayLabel>
					)}
				</div>
			</SidePanel.Header>

			<SidePanel.Body>
				<dl className="ai-hub-activity-panel-dl">
					<dt>Date</dt>

					<dd>{formatDate(activity.date)}</dd>

					<dt>User</dt>

					<dd>{activity.userName || '-'}</dd>

					{activity.agentName && (
						<>
							<dt>Agent</dt>

							<dd>{activity.agentName}</dd>
						</>
					)}

					<dt>Node</dt>

					<dd>{activity.nodeName || '-'}</dd>

					<dt>Duration</dt>

					<dd>{formatDuration(activity.duration)}</dd>

					<dt>Tokens (input / output / total)</dt>

					<dd>
						{activity.inputTokensCount || '-'} /{' '}
						{activity.outputTokensCount || '-'} /{' '}
						<strong>{activity.totalTokenCount || '-'}</strong>
					</dd>

					<dt>User message</dt>

					<dd>
						<pre className="ai-hub-activity-panel-text">
							{activity.userMessage || '-'}
						</pre>
					</dd>

					{!isError && activity.output && (
						<>
							<dt>Output</dt>

							<dd>
								<pre className="ai-hub-activity-panel-text">
									{activity.output}
								</pre>
							</dd>
						</>
					)}

					{isError && activity.errorMessage && (
						<>
							<dt className="text-danger">Error</dt>

							<dd>
								<pre className="ai-hub-activity-panel-text ai-hub-activity-panel-text--danger">
									{activity.errorMessage}
								</pre>
							</dd>
						</>
					)}
				</dl>
			</SidePanel.Body>
		</>
	);
};

export default MetricsActivityInfoPanel;
