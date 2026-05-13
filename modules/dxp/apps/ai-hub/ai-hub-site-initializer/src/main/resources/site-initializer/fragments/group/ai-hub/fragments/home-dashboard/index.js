/* ============================================================
   Home Dashboard Fragment
   ============================================================ */

(function () {

	// fragmentEntryLinkNamespace is injected as a JS var by Liferay's fragment renderer
	// eslint-disable-next-line no-undef
	const NS = (typeof fragmentEntryLinkNamespace !== 'undefined') ? fragmentEntryLinkNamespace : '';

	const ROOT = document.getElementById(`home-dashboard-${NS}`);
	if (!ROOT) return;

	// ── URL helpers ──────────────────────────────────────────────────────────

	const CURRENT_PATH = Liferay.ThemeDisplay.getLayoutRelativeURL() || '';
	const PATH_PARTS = CURRENT_PATH.split('/').filter(Boolean); // ['web', 'ai-hub', 'home']
	const SITE_BASE = PATH_PARTS.length >= 2
		? `/${PATH_PARTS[0]}/${PATH_PARTS[1]}`
		: '';

	const BACK_URL = encodeURIComponent(window.location.href);

	const CREATE_AGENT_URL = `${SITE_BASE}/agent?backURL=${BACK_URL}`;
	const AGENTS_URL = `${SITE_BASE}/agent-builder`;
	const CHATBOTS_URL = `${SITE_BASE}/chatbots`;

	// Wire up static links
	const createBtn = ROOT.querySelector(`#home-dashboard-create-btn-${NS}`);
	if (createBtn) createBtn.href = CREATE_AGENT_URL;

	const agentsLink = ROOT.querySelector(`#home-dashboard-agents-link-${NS}`);
	if (agentsLink) agentsLink.href = AGENTS_URL;

	const chatbotsLink = ROOT.querySelector(`#home-dashboard-chatbots-link-${NS}`);
	if (chatbotsLink) chatbotsLink.href = CHATBOTS_URL;

	// Single color + icon for all cards until category differentiation is available
	const ICON_BG = 'var(--blue-l5, #ebf1ff)';
	const ICON_COLOR = 'var(--blue-d1, #3e6de5)';
	const ICON_NAME = 'chatbot';

	// ── Card renderer ────────────────────────────────────────────────────────

	function renderCard(item, category, detailUrl) {
		const isActive = item.active !== false;
		const title = item.title || item.name || 'Agent';
		const description = item.description || '';

		return `
			<a class="agent-card" href="${escapeHtml(detailUrl)}">
				<div class="agent-card__header">
					<div class="agent-card__icon" style="background-color:${ICON_BG};color:${ICON_COLOR}">
						<svg class="lexicon-icon" focusable="false" role="presentation">
							<use href="/o/admin-theme/images/clay/icons.svg#${ICON_NAME}"></use>
						</svg>
					</div>
				</div>
				<div class="agent-card__body">
					<h4 class="agent-card__title">${escapeHtml(title)}</h4>
					<p class="agent-card__description">${escapeHtml(description)}</p>
				</div>
				<div class="agent-card__footer">
					<span class="label label-secondary">
						<span class="label-item label-item-expand">${escapeHtml(category)}</span>
					</span>
					<span class="label ${isActive ? 'label-success' : 'label-danger'}">
						<span class="label-item label-item-expand">${isActive ? 'Running' : 'Stopped'}</span>
					</span>
				</div>
			</a>
		`;
	}

	function escapeHtml(str) {
		const div = document.createElement('div');
		div.textContent = str;
		return div.innerHTML;
	}

	// ── Fetch ────────────────────────────────────────────────────────────────

	async function fetchJSON(url) {
		const response = await fetch(url, {
			headers: {'x-csrf-token': Liferay.authToken},
		});
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return response.json();
	}

	async function loadData() {
		try {
			const [agentsData, chatbotsData] = await Promise.all([
				fetchJSON('/o/ai-hub/agent-definitions/?pageSize=4&sort=dateCreated:desc'),
				fetchJSON('/o/ai-hub/chatbots/?pageSize=3&sort=dateCreated:desc'),
			]);

			renderAgents(agentsData.items || []);
			renderChatbots(chatbotsData.items || []);
		}
		catch (error) {
			console.error('[home-dashboard] Failed to load data:', error);
			renderEmpty();
		}
	}

	function renderAgents(items) {
		const grid = ROOT.querySelector(`#home-dashboard-agents-${NS}`);
		if (!grid) return;

		if (!items.length) {
			grid.innerHTML = '<p class="text-secondary small py-3">No agents found.</p>';
			return;
		}

		grid.innerHTML = items.slice(0, 4).map((item) => {
			const detailUrl = `${SITE_BASE}/agent?externalReferenceCode=${encodeURIComponent(item.externalReferenceCode || '')}&backURL=${BACK_URL}`;
			return renderCard(item, 'Agents', detailUrl);
		}).join('');
	}

	function renderChatbots(items) {
		const grid = ROOT.querySelector(`#home-dashboard-chatbots-${NS}`);
		if (!grid) return;

		if (!items.length) {
			grid.innerHTML = '<p class="text-secondary small py-3">No chatbots created yet.</p>';
			return;
		}

		grid.innerHTML = items.slice(0, 4).map((item) => {
			const detailUrl = `${SITE_BASE}/chatbot?externalReferenceCode=${encodeURIComponent(item.externalReferenceCode || '')}`;
			return renderCard(item, 'Chatbots', detailUrl);
		}).join('');
	}

	function renderEmpty() {
		[
			{id: `#home-dashboard-agents-${NS}`, msg: 'Unable to load agents.'},
			{id: `#home-dashboard-chatbots-${NS}`, msg: 'Unable to load chatbots.'},
		].forEach(({id, msg}) => {
			const el = ROOT.querySelector(id);
			if (el) el.innerHTML = `<p class="text-secondary small py-3">${msg}</p>`;
		});
	}

	// ── Bootstrap ────────────────────────────────────────────────────────────

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', loadData);
	}
	else {
		loadData();
	}
})();
