/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayAlert from '@clayui/alert';
import ClayEmptyState from '@clayui/empty-state';
import ClayLabel from '@clayui/label';
import ClayLayout from '@clayui/layout';
import ClayPanel from '@clayui/panel';
import {
	AIAssistantChat,
	ChatContext,
} from '@liferay/ai-hub-cell-js-components-web';
import {sub} from 'frontend-js-web';
import React, {useCallback, useEffect, useState} from 'react';

import ContentPreviewForm from './components/ContentPreviewForm';
import MultiStepProgress from './components/MultiStepProgress';
import StepActions from './components/StepActions';
import {getArtifacts} from './services/artifacts';
import {getAttachments} from './services/attachments';
import {commitRun, deleteRun, getRun, patchRun} from './services/runs';
import {Artifact} from './types/Artifact';
import {Attachment} from './types/Attachment';
import {ContentSample, ContentSampleField} from './types/ContentSample';
import {DetectedConfigItem} from './types/DetectedConfigItem';
import {GeneratedItem} from './types/GeneratedItem';
import {Run} from './types/Run';
import {SummaryItem} from './types/SummaryItem';
import {Template} from './types/Template';

interface IProps {
	backURL?: string;
	cancelURL?: string;
	continueURL?: string;
	onBack?: () => void;
	onCancel?: () => void;
	onContinue?: () => void;
	runId?: number;
}

const REGENERATION_EVENT_TYPES = ['Run Updated', 'Artifacts Updated'];

const PAGE_CLASS_NAMES = [
	'com.liferay.headless.admin.site.dto.v1_0.SitePage',
	'com.liferay.headless.delivery.dto.v1_0.SitePage',
];

const TYPE_DEFINITIONS: Array<{
	className: string;
	icon: string;
	label: string;
}> = [
	{
		className: 'com.liferay.headless.admin.site.dto.v1_0.SitePage',
		icon: 'home',
		label: Liferay.Language.get('site-page'),
	},
	{
		className: 'com.liferay.headless.delivery.dto.v1_0.SitePage',
		icon: 'home',
		label: Liferay.Language.get('site-page'),
	},
	{
		className: 'com.liferay.headless.delivery.dto.v1_0.StructuredContent',
		icon: 'document-text',
		label: Liferay.Language.get('structured-content'),
	},
	{
		className: 'com.liferay.headless.admin.fragment.dto.v1_0.FragmentSet',
		icon: 'code',
		label: Liferay.Language.get('fragment'),
	},
	{
		className: 'com.liferay.headless.delivery.dto.v1_0.FragmentEntry',
		icon: 'code',
		label: Liferay.Language.get('fragment'),
	},
	{
		className: 'com.liferay.headless.delivery.dto.v1_0.Document',
		icon: 'document',
		label: Liferay.Language.get('document'),
	},
];

const LANGUAGE_LABELS: Record<string, string> = {
	de: 'German',
	en: 'English',
	es: 'Spanish',
	fr: 'French',
	it: 'Italian',
	ja: 'Japanese',
	pt: 'Portuguese',
};

const LANGUAGE_FROM_FILENAME = /-([a-z]{2})(?:[-_][A-Z]{2})?\.json$/i;
const LANGUAGE_FROM_I18N = /"[a-zA-Z]+_i18n"\s*:\s*\{([^{}]*)\}/g;
const LOCALE_KEY = /"([a-z]{2})(?:_[A-Z]{2})?"\s*:/g;

const METADATA_KEYS = new Set([
	'actions',
	'classNameId',
	'classPK',
	'createDate',
	'creator',
	'dateCreated',
	'dateModified',
	'externalReferenceCode',
	'groupId',
	'id',
	'modifiedDate',
	'parentExternalReferenceCode',
	'priority',
	'siteId',
	'sortOrder',
	'status',
	'userId',
]);

const TITLE_BY_CLASS_NAME: Record<string, string> = {
	'com.liferay.headless.admin.site.dto.v1_0.Site': 'site',
	'com.liferay.headless.asset.library.dto.v1_0.AssetLibrary': 'space',
	'com.liferay.headless.asset.library.dto.v1_0.ConnectedSite':
		'connected-site',
};

const getTypeDefinition = (className: string | undefined) =>
	TYPE_DEFINITIONS.find((definition) => definition.className === className);

const getTypeLabel = (className: string | undefined) =>
	getTypeDefinition(className)?.label ??
	(className ? className.split('.').pop() ?? className : '');

const getTypeIcon = (className: string | undefined) =>
	getTypeDefinition(className)?.icon ?? 'document';

const getLanguageLabel = (code: string) =>
	LANGUAGE_LABELS[code.toLowerCase()] ?? code.toUpperCase();

const getArtifactLanguages = (artifact: Artifact): string[] => {
	const fromFilename = artifact.fileName?.match(LANGUAGE_FROM_FILENAME);

	if (fromFilename) {
		return [fromFilename[1].toLowerCase()];
	}


	const languages = new Set<string>();

	if (typeof artifact.json !== 'string') {
		return [];
	}

	for (const i18nMatch of artifact.json.matchAll(LANGUAGE_FROM_I18N)) {
		const block = i18nMatch[1];

		for (const localeMatch of block.matchAll(LOCALE_KEY)) {
			languages.add(localeMatch[1].toLowerCase());
		}
	}

	return Array.from(languages);
};

const humanizeKey = (key: string) =>
	key
		.replace(/_i18n$/, '')
		.replace(/([A-Z])/g, ' $1')
		.replace(/[_-]+/g, ' ')
		.replace(/^./, (character) => character.toUpperCase())
		.trim();

const getFirstItem = (artifact: Artifact): Record<string, unknown> | null => {
	if (typeof artifact.json !== 'string') {
		return null;
	}

	try {
		const parsed = JSON.parse(artifact.json);

		if (Array.isArray(parsed?.items) && parsed.items.length) {
			return parsed.items[0];
		}
	}
	catch (exception) {
		// Fall through.
	}

	return null;
};

const getEntityName = (item: Record<string, unknown> | null): string | null => {
	if (!item) {
		return null;
	}

	for (const key of ['name', 'title']) {
		const value = item[key];

		if (typeof value === 'string' && value.trim()) {
			return value;
		}

		const i18nValue = item[`${key}_i18n`];

		if (i18nValue && typeof i18nValue === 'object') {
			const map = i18nValue as Record<string, string>;
			const firstLocale =
				map['en_US'] ?? map[Object.keys(map)[0] ?? ''];

			if (firstLocale) {
				return firstLocale;
			}
		}
	}

	return null;
};

const buildSummary = (
	artifacts: Artifact[],
	languages: string[],
	templateCount: number
): SummaryItem[] => {
	const pages = artifacts.filter(
		(artifact) => PAGE_CLASS_NAMES.includes(artifact.className ?? '')
	).length;

	return [
		{
			icon: 'document',
			title: Liferay.Language.get('total-pages'),
			value: pages,
		},
		{
			icon: 'automatic-translate',
			title: Liferay.Language.get('languages'),
			value: languages.length,
		},
		{
			icon: 'stars',
			title: Liferay.Language.get('templates'),
			value: templateCount,
		},
		{
			icon: 'document',
			title: Liferay.Language.get('total-entries'),
			value: artifacts.length,
		},
	];
};

const buildTemplates = (
	artifacts: Artifact[],
	languageCount: number
): Template[] => {
	const grouped = new Map<string, Artifact[]>();

	for (const artifact of artifacts) {
		const key = artifact.className ?? '';
		const list = grouped.get(key) ?? [];

		list.push(artifact);
		grouped.set(key, list);
	}

	return Array.from(grouped.entries()).map(([className, list]) => ({
		entries: list.length,
		icon: getTypeIcon(className),
		labels: [
			{
				text: sub(
					Liferay.Language.get('x-languages'),
					String(languageCount || 1)
				),
				type: 'success' as const,
			},
			{
				text: sub(Liferay.Language.get('x-entries'), String(list.length)),
				type: 'info' as const,
			},
		],
		name: getTypeLabel(className),
	}));
};

const buildSampleField = (
	key: string,
	value: unknown
): ContentSampleField | null => {
	const label = humanizeKey(key);

	if (key.endsWith('_i18n') && value && typeof value === 'object') {
		const entries = Object.entries(value as Record<string, unknown>).filter(
			([, localeValue]) => typeof localeValue === 'string'
		);

		if (!entries.length) {
			return null;
		}

		return {
			label,
			type: 'i18n',
			values: entries.map(([locale, localeValue]) => ({
				label: getLanguageLabel(locale.split('_')[0]),
				value: String(localeValue),
			})),
		};
	}

	if (Array.isArray(value)) {
		const tags = value
			.filter(
				(entry) =>
					typeof entry === 'string' ||
					typeof entry === 'number' ||
					typeof entry === 'boolean'
			)
			.map(String);

		if (!tags.length) {
			return null;
		}

		return {label, tags, type: 'tags'};
	}

	if (
		typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'boolean'
	) {
		return {label, type: 'text', value: String(value)};
	}

	return null;
};

const buildContentSamples = (artifacts: Artifact[]): ContentSample[] =>
	artifacts.map((artifact) => {
		const item = getFirstItem(artifact);
		const fields: ContentSampleField[] = [];

		if (item) {
			for (const [key, value] of Object.entries(item)) {
				if (METADATA_KEYS.has(key)) {
					continue;
				}

				const field = buildSampleField(key, value);

				if (field) {
					fields.push(field);
				}
			}
		}

		const titleKey = TITLE_BY_CLASS_NAME[artifact.className ?? ''];
		const titleFromEntity = getEntityName(item);
		const titleFromClass = titleKey
			? Liferay.Language.get(titleKey)
			: getTypeLabel(artifact.className);

		const title = titleFromEntity
			? `${titleFromClass} - ${titleFromEntity}`
			: titleFromClass;

		return {fields, tags: [], title};
	});

const buildGeneratedItems = (
	artifacts: Artifact[],
	languages: string[]
): GeneratedItem[] => {
	const items: GeneratedItem[] = [
		{
			description: sub(
				Liferay.Language.get(
					'across-x-content-types-and-x-languages'
				),
				String(
					new Set(
						artifacts.map((artifact) => artifact.className ?? '')
					).size
				),
				String(languages.length || 1)
			),
			title: sub(
				Liferay.Language.get('x-complete-content-entries'),
				String(artifacts.length)
			),
		},
	];

	if (languages.length) {
		items.push({
			description: languages.map(getLanguageLabel).join(', '),
			title: Liferay.Language.get('multi-language-support'),
		});
	}

	return items;
};

export default function RefineStep({
	backURL,
	cancelURL,
	continueURL,
	onBack,
	onCancel,
	onContinue,
	runId,
}: IProps) {
	const [artifacts, setArtifacts] = useState<Artifact[]>([]);
	const [attachments, setAttachments] = useState<Attachment[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [generating, setGenerating] = useState(false);
	const [loading, setLoading] = useState(!!runId);
	const [previewLoading, setPreviewLoading] = useState(false);
	const [run, setRun] = useState<Run | null>(null);
	const [showTip, setShowTip] = useState(true);

	useEffect(() => {
		if (!runId) {
			return;
		}

		let cancelled = false;

		(async () => {
			try {
				const [runJson, artifactItems, attachmentItems] =
					await Promise.all([
						getRun(runId),
						getArtifacts(runId),
						getAttachments(runId),
					]);

				if (cancelled) {
					return;
				}

				setRun(runJson);
				setArtifacts(artifactItems);
				setAttachments(attachmentItems);
			}
			catch (exception) {
				if (!cancelled) {
					setError(
						exception instanceof Error
							? exception.message
							: String(exception)
					);
				}
			}
			finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [continueURL, runId]);

	const refreshPreview = useCallback(async () => {
		if (!runId) {
			return;
		}

		setPreviewLoading(true);
		setError(null);

		try {
			const [runJson, artifactItems] = await Promise.all([
				getRun(runId),
				getArtifacts(runId),
			]);

			setRun(runJson);
			setArtifacts(artifactItems);
		}
		catch (exception) {
			setError(
				exception instanceof Error
					? exception.message
					: String(exception)
			);
		}
		finally {
			setPreviewLoading(false);
		}
	}, [runId]);

	const handleChatExternalEvent = useCallback(
		(type: string) => {
			if (REGENERATION_EVENT_TYPES.includes(type)) {
				refreshPreview();
			}
		},
		[refreshPreview]
	);

	const handleBack = () => {
		if (onBack) {
			onBack();

			return;
		}

		if (backURL) {
			Liferay.Util.navigate(backURL);
		}
	};

	const handleCancel = async () => {
		if (onCancel) {
			onCancel();

			return;
		}

		if (runId) {
			try {
				await deleteRun(runId);
			}
			catch (exception) {
				// Best effort: still navigate away.
			}
		}

		if (cancelURL) {
			Liferay.Util.navigate(cancelURL);
		}
	};

	const handleContinue = async () => {
		if (generating) {
			return;
		}

		if (onContinue) {
			onContinue();

			return;
		}

		if (!runId) {
			if (continueURL) {
				Liferay.Util.navigate(continueURL);
			}

			return;
		}

		setGenerating(true);
		setError(null);

		try {
			await commitRun(runId);

			if (continueURL) {
				const separator = continueURL.includes('?') ? '&' : '?';

				Liferay.Util.navigate(
					`${continueURL}${separator}runId=${runId}`
				);
			}
		}
		catch (exception) {
			setError(
				exception instanceof Error
					? exception.message
					: String(exception)
			);
			setGenerating(false);
		}
	};

	const languages = Array.from(
		new Set(
			artifacts.flatMap((artifact) => getArtifactLanguages(artifact))
		)
	);
	const templates = buildTemplates(artifacts, languages.length);
	const summary = buildSummary(artifacts, languages, templates.length);
	const contentSamples = buildContentSamples(artifacts);
	const generatedItems = buildGeneratedItems(artifacts, languages);
	const detectedConfig: DetectedConfigItem[] = [
		{
			label: Liferay.Language.get('languages'),
			value: languages.length
				? languages.map(getLanguageLabel).join(', ')
				: Liferay.Language.get('none-detected'),
		},
		{
			label: Liferay.Language.get('reference-documents'),
			value: sub(Liferay.Language.get('x-files'), attachments.length),
		},
	];
	const promptText = run?.prompt ?? '';
	const attachmentNames = attachments.map(
		(attachment, index) =>
			attachment.title ?? `${Liferay.Language.get('attachment')} ${index + 1}`
	);

	const getChatContext = useCallback(
		(): ChatContext => ({
			context: {prompt: promptText, runId},
			instructionDefinitionScope: '',
		}),
		[promptText, runId]
	);

	const handleChatSubscribe = useCallback(
		(eventSourceReference: string) => {
			if (!runId) {
				return;
			}

			patchRun(runId, {externalReferenceCode: eventSourceReference}).catch(
				(exception) => {
					setError(
						exception instanceof Error
							? exception.message
							: String(exception)
					);
				}
			);
		},
		[runId]
	);

	return (
		<div className="content-site-generator">
			<ClayLayout.ContainerFluid view>
				<ClayLayout.Row>
					<ClayLayout.Col
						className="content-site-generator-refine__sidebar"
						md={3}
					>
						<AIAssistantChat
							autoSendInitialMessage
							embedded
							externalEventTypes={REGENERATION_EVENT_TYPES}
							getContext={getChatContext}
							initialMessage={promptText}
							onExternalEvent={handleChatExternalEvent}
							onSubscribe={handleChatSubscribe}
						/>
					</ClayLayout.Col>

					<ClayLayout.Col md={9}>
						<ClayLayout.Row justify="center">
							<ClayLayout.Col md={12} xl={10}>
						<div className="content-site-generator__progress">
							<MultiStepProgress
								activeStep={1}
								steps={[
									{title: Liferay.Language.get('ideate')},
									{title: Liferay.Language.get('refine')},
									{title: Liferay.Language.get('review')},
								]}
							/>
						</div>

						<div className="content-site-generator-refine">
							<div className="content-site-generator-refine__header">
								<h3>
									{Liferay.Language.get(
										'preview-content-to-be-generated'
									)}
								</h3>

								<p className="text-secondary">
									{Liferay.Language.get(
										'review-the-configuration-and-content-samples-before-generating'
									)}
								</p>
							</div>

							{error && (
								<ClayAlert
									className="mb-3"
									displayType="danger"
									onClose={() => setError(null)}
								>
									{error}
								</ClayAlert>
							)}

							{loading ? (
								<ClayEmptyState
									description={Liferay.Language.get(
										'fetching-the-generated-content'
									)}
									small
									title={Liferay.Language.get('loading')}
								/>
							) : (
								<>
									<ClayPanel
										className="content-site-generator-refine__section"
										displayType="secondary"
									>
										<ClayPanel.Body>
											<h4 className="content-site-generator-refine__section-title">
												{Liferay.Language.get('your-prompt')}
											</h4>

											{promptText && (
												<>
													<p className="content-site-generator-refine__prompt">
														{`"${promptText}"`}
													</p>

													<div className="dropdown-divider" />

													<p className="content-site-generator-refine__attachments-label text-secondary">
														{attachmentNames.length
															? sub(
																	Liferay.Language.get(
																		'attached-files-x'
																	),
																	attachmentNames.length
																)
															: Liferay.Language.get('attached-files')}
													</p>

													{attachmentNames.length ? (
														<div className="content-site-generator-refine__attachments">
															{attachmentNames.map(
																(file: string, index: number) => (
																	<ClayLabel
																		displayType="secondary"
																		key={index}
																	>
																		{file}
																	</ClayLabel>
																)
															)}
														</div>
													) : (
														<p className="font-italic text-secondary">
															{Liferay.Language.get('no-files-attached')}
														</p>
													)}
												</>
											)}
										</ClayPanel.Body>
									</ClayPanel>

									<ContentPreviewForm
										contentSamples={contentSamples}
										detectedConfig={detectedConfig}
										generatedItems={generatedItems}
										loading={previewLoading}
										summary={summary}
										templates={templates}
									/>

									{showTip && (
										<ClayAlert
											className="content-site-generator-refine__tip"
											displayType="info"
											onClose={() => setShowTip(false)}
											title={Liferay.Language.get('tip')}
										>
											{Liferay.Language.get(
												'use-the-chat-on-the-left-to-refine-your-requirements-before-generating-you-can-ask-to-add-more-pages-change-layouts-or-adjust-any-configuration'
											)}
										</ClayAlert>
									)}
								</>
							)}

							<StepActions
								backDisabled={generating}
								backLabel={Liferay.Language.get('back-to-prompt')}
								cancelDisabled={generating}
								continueDisabled={loading || !runId}
								continueLabel={Liferay.Language.get('generate')}
								continueLoading={generating}
								onBack={handleBack}
								onCancel={handleCancel}
								onContinue={handleContinue}
							/>
						</div>
							</ClayLayout.Col>
						</ClayLayout.Row>
					</ClayLayout.Col>
				</ClayLayout.Row>
			</ClayLayout.ContainerFluid>
		</div>
	);
}
