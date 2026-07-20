/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import {ClayCheckbox} from '@clayui/form';
import ClayLabel from '@clayui/label';
import ClayMultiSelect from '@clayui/multi-select';
import React from 'react';

import LanguageIdIcon from '../../TranslateContent/components/LanguageIdIcon';
import MessageBalloon from '../../TranslateContent/components/MessageBalloon';
import MessageHeader from '../../TranslateContent/components/MessageHeader';
import {TranslateContentMessageBalloonProps} from '../../TranslateContent/types';
import useTranslateContentAgent from '../../TranslateContent/useTranslateContentAgent';

import '../chat.scss';

const TranslateContentMessageBalloon: React.FC<
	TranslateContentMessageBalloonProps
> = (props) => {
	const {availableLanguageIds, results} = props;

	const {
		onTranslate,
		selectedLanguageIds,
		setSelectedLanguageIds,
		setStep,
		setValue,
		step,
		submit,
		submitted,
		toggleSelectedLanguageId,
		translatedLanguageIds,
		value,
	} = useTranslateContentAgent(props);

	if (results?.length) {
		return (
			<MessageBalloon>
				<MessageHeader
					message={Liferay.Language.get(
						'the-content-has-been-translated'
					)}
				/>

				<ul className="list-unstyled m-2">
					{results.map(({targetLanguageId}) => (
						<li
							className="align-items-center d-flex mb-1"
							key={targetLanguageId}
						>
							<LanguageIdIcon languageId={targetLanguageId} />

							<span className="flex-grow-1">
								{targetLanguageId}
							</span>

							<ClayLabel displayType="success">
								{Liferay.Language.get('translated')}
							</ClayLabel>
						</li>
					))}
				</ul>
			</MessageBalloon>
		);
	}

	if (step === 'confirm') {
		return (
			<MessageBalloon>
				<MessageHeader
					message={Liferay.Language.get(
						'some-of-the-selected-languages-already-have-a-translation.-what-do-you-want-to-do'
					)}
				/>

				<div className="c-gap-2 d-flex flex-row m-2">
					<ClayButton
						disabled={submitted}
						displayType="primary"
						onClick={() => submit(selectedLanguageIds)}
						size="sm"
					>
						{Liferay.Language.get('overwrite-all')}
					</ClayButton>

					<ClayButton
						disabled={submitted}
						displayType="secondary"
						onClick={() => setStep('review')}
						size="sm"
					>
						{Liferay.Language.get('review')}
					</ClayButton>
				</div>
			</MessageBalloon>
		);
	}

	if (step === 'review') {
		return (
			<MessageBalloon>
				<MessageHeader
					message={Liferay.Language.get(
						'select-the-translations-you-want-to-overwrite'
					)}
				/>

				<div className="c-gap-2 d-flex flex-column m-2">
					{translatedLanguageIds.map((languageId) => (
						<ClayCheckbox
							checked={selectedLanguageIds.includes(languageId)}
							disabled={submitted}
							key={languageId}
							label={languageId}
							onChange={() =>
								toggleSelectedLanguageId(languageId)
							}
						/>
					))}

					<ClayButton
						disabled={submitted || !selectedLanguageIds.length}
						displayType="primary"
						onClick={() => submit(selectedLanguageIds)}
						size="sm"
					>
						{Liferay.Language.get('overwrite')}
					</ClayButton>
				</div>
			</MessageBalloon>
		);
	}

	return (
		<MessageBalloon>
			<MessageHeader
				message={Liferay.Language.get(
					'which-languages-would-you-like-to-translate-into'
				)}
			/>

			<div
				className="ai-assistant-chat__language-select align-items-start c-gap-2 d-flex flex-column m-2 w-100"
				style={{maxWidth: '18rem'}}
			>
				<ClayMultiSelect
					disabled={submitted}
					items={selectedLanguageIds.map((languageId) => ({
						label: languageId,
						value: languageId,
					}))}
					onChange={setValue}
					onItemsChange={(newItems) =>
						setSelectedLanguageIds(
							newItems.map((item) => item.value)
						)
					}
					placeholder={Liferay.Language.get('select-languages')}
					sourceItems={(availableLanguageIds ?? []).map(
						(languageId) => ({
							label: languageId,
							value: languageId,
						})
					)}
					spritemap={Liferay.Icons.spritemap}
					value={value}
				>
					{(item) => (
						<ClayMultiSelect.Item
							key={item.value}
							onClick={(event) => {
								event.preventDefault();

								toggleSelectedLanguageId(item.value);

								setValue('');
							}}
							style={{cursor: 'pointer'}}
							textValue={item.label}
						>
							<LanguageIdIcon languageId={item.value} />

							{item.label}
						</ClayMultiSelect.Item>
					)}
				</ClayMultiSelect>

				<ClayButton
					disabled={!selectedLanguageIds.length || submitted}
					displayType="primary"
					onClick={onTranslate}
					size="sm"
				>
					{Liferay.Language.get('translate')}
				</ClayButton>
			</div>
		</MessageBalloon>
	);
};

export default TranslateContentMessageBalloon;
