/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayForm, {ClayInput, ClayToggle} from '@clayui/form';
import ClayLayout from '@clayui/layout';
import ClayPanel from '@clayui/panel';
import React, {useState} from 'react';

import './AgentDefinitionForm.scss';

import Button from '@clayui/button';
import Icon from '@clayui/icon';
import Link from '@clayui/link';
import {Provider} from '@clayui/provider';

import Toolbar from './components/ToolBar';

export default function AgentDefinitionForm({backURL}: {backURL: string}) {

	const [isAgentEnabled, setIsAgentEnabled] = useState(false);
	const [formData, setFormData] = useState({
		assignedSources: '',
		category: '',
		description: '',
		inputVariables: '',
		name: '',
		outputVariables: '',
	});

	const handleToggleAgent = () => {
		setIsAgentEnabled(!isAgentEnabled);
	};

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const {name, value} = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = () => {

		console.log('Form Data:', formData);
	}

	return (
		<>
			<Toolbar
				backURL={backURL}
				title={Liferay.Language.get('create-agent')}
			>
				<Toolbar.Item>
					<Link
						aria-label={Liferay.Language.get('cancel')}
						borderless
						button
						displayType="secondary"
						href="#"
						small
					>
						{Liferay.Language.get('cancel')}
					</Link>
				</Toolbar.Item>

				<Toolbar.Item>
					<Button
						aria-labelledby="saveButton"
						data-title="test"
						data-title-set-as-html
						onClick={handleSubmit}
						size="sm"
					>
						{Liferay.Language.get('save')}
					</Button>
				</Toolbar.Item>
			</Toolbar>

			<ClayLayout.ContainerFluid className="agent-definition-form">
				<ClayForm>
				<div className="agent-definition-header">
					<ClayToggle
						label={Liferay.Language.get('enable-agent')}
						name="showWidget"
						onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
							event.stopPropagation();
						}}
						onToggle={handleToggleAgent}
						toggled={isAgentEnabled}
					/>

					<Provider spritemap={Liferay.Icons.spritemap}>
						<Button displayType="secondary">
							<span className="inline-item inline-item-before">
								<Icon symbol="icon-rule-builder" />
							</span>

							{Liferay.Language.get('view-workflow')}
						</Button>
					</Provider>
				</div>

				<ClayLayout.Row>
					<ClayLayout.Col md={12}>
						<ClayPanel
							className="agent-definition-details"
							collapsable={false}
							title={Liferay.Language.get('details')}
						>
							<ClayPanel.Body>
								<h2>{Liferay.Language.get('details')}</h2>

								<ClayForm.Group>
									<label htmlFor="name">
										{Liferay.Language.get('name')}

										<span className="ml-1 reference-mark text-warning">
											<Icon symbol="asterisk" />
										</span>
									</label>

									<ClayInput
										id="name"
										name="name"
										onChange={handleInputChange}
										placeholder={Liferay.Language.get('add-an-agent-name')}
										required={true}
										type="text"
										value={formData.name}
									/>
								</ClayForm.Group>

								<ClayForm.Group>
									<label htmlFor="description">
										{Liferay.Language.get('description')}
									</label>

									<textarea
										className="form-control"
										id="description"
										name="description"
										onChange={handleInputChange}
										placeholder={Liferay.Language.get(
											'add-a-description'
										)}
										rows={4}
										value={formData.description}
									/>
								</ClayForm.Group>

								<ClayForm.Group>
									<label htmlFor="input-variables">
										{Liferay.Language.get(
											'input-variables'
										)}
									</label>

									<textarea
										className="form-control"
										id="input-variables"
										name="inputVariables"
										onChange={handleInputChange}
										placeholder='[{"name":"tone", "type":"string"}]'
										rows={4}
										value={formData.inputVariables}
									/>
								</ClayForm.Group>

								<ClayForm.Group>
									<label htmlFor="output-variables">
										{Liferay.Language.get(
											'output-variables'
										)}
									</label>

									<textarea
										className="form-control"
										id="output-variables"
										name="outputVariables"
										onChange={handleInputChange}
										placeholder='[{"name":"tone", "type":"string"}]'
										rows={4}
										value={formData.outputVariables}
									/>
								</ClayForm.Group>

								<ClayForm.Group>
									<label htmlFor="category">
										{Liferay.Language.get('category')}
									</label>

									<select
										className="form-control"
										id="category"
										name="category"
										onChange={handleInputChange}
										value={formData.category}
									>
										<option value="">
											{Liferay.Language.get(
												'select-a-category'
											)}
										</option>
									</select>
								</ClayForm.Group>
							</ClayPanel.Body>
						</ClayPanel>
					</ClayLayout.Col>
				</ClayLayout.Row>

				<ClayLayout.Row>
					<ClayLayout.Col md={12}>
						<ClayPanel
							className="agent-definition-data-sources"
							collapsable={false}
							title={Liferay.Language.get('data-sources')}
						>
							<ClayPanel.Body>
								<h2>{Liferay.Language.get('data-sources')}</h2>

								<ClayForm.Group>
									<label htmlFor="assignedSources">
										{Liferay.Language.get(
											'assigned-sources'
										)}
									</label>

									<ClayInput
										component="input"
										id="assignedSources"
										name="assignedSources"
										onChange={handleInputChange}
										type="text"
										value={formData.assignedSources}
									/>
								</ClayForm.Group>
							</ClayPanel.Body>
						</ClayPanel>
					</ClayLayout.Col>
				</ClayLayout.Row>
				</ClayForm>
			</ClayLayout.ContainerFluid>
		</>
	);
}
