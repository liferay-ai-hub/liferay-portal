/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import {ClayIconSpriteContext} from '@clayui/icon';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const ISSUE_TYPES = [
	{
		label: Liferay.Language.get('incorrect-information'),
		value: 'INCORRECT_INFORMATION',
	},
	{
		label: Liferay.Language.get('sensitive-data-exposure'),
		value: 'SENSITIVE_DATA_EXPOSURE',
	},
	{
		label: Liferay.Language.get('technical-failure'),
		value: 'TECHNICAL_FAILURE',
	},
	{label: Liferay.Language.get('off-topic'), value: 'OFF_TOPIC'},
	{label: Liferay.Language.get('other'), value: 'OTHER'},
];

export default function FeedbackModal({
	onClose,
	onSubmit,
}: {
	onClose: () => void;
	onSubmit: (issueType: string, description: string) => void;
}) {
	const [description, setDescription] = useState('');
	const [issueType, setIssueType] = useState(ISSUE_TYPES[0].value);

	return ReactDOM.createPortal(
		<ClayIconSpriteContext.Provider value={Liferay.Icons.spritemap}>
			<div
				className="feedback-modal-overlay"
				onMouseDown={(event) => event.stopPropagation()}
			>
				<div className="feedback-modal">
					<div className="feedback-modal-header">
						<h4 className="feedback-modal-title">
							{Liferay.Language.get('send-feedback')}
						</h4>
					</div>

					<div className="feedback-modal-body">
						<div className="feedback-modal-field">
							<label
								className="feedback-modal-label"
								htmlFor="feedback-issue-type"
							>
								{Liferay.Language.get('issue')}

								<span className="feedback-modal-required">
									{' *'}
								</span>
							</label>

							<select
								className="feedback-modal-select form-control"
								id="feedback-issue-type"
								onChange={(event) =>
									setIssueType(event.target.value)
								}
								value={issueType}
							>
								{ISSUE_TYPES.map((type) => (
									<option
										key={type.value}
										value={type.value}
									>
										{type.label}
									</option>
								))}
							</select>
						</div>

						<div className="feedback-modal-field">
							<label
								className="feedback-modal-label"
								htmlFor="feedback-description"
							>
								{Liferay.Language.get('description')}
							</label>

							<textarea
								className="feedback-modal-textarea form-control"
								id="feedback-description"
								onChange={(event) =>
									setDescription(event.target.value)
								}
								rows={4}
								value={description}
							/>
						</div>
					</div>

					<div className="feedback-modal-footer">
						<ClayButton
							displayType="secondary"
							onClick={onClose}
							size="sm"
						>
							{Liferay.Language.get('cancel')}
						</ClayButton>

						<ClayButton
							disabled={!issueType}
							displayType="primary"
							onClick={() => onSubmit(issueType, description)}
							size="sm"
						>
							{Liferay.Language.get('send')}
						</ClayButton>
					</div>
				</div>
			</div>
		</ClayIconSpriteContext.Provider>,
		document.body
	);
}
