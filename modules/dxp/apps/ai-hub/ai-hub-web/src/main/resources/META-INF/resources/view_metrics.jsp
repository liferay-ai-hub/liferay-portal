<%--
/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
--%>

<%@ include file="/init.jsp" %>

<%@ page import="com.liferay.portal.kernel.util.PortalUtil" %>

<%
ViewMetricsDisplayContext viewMetricsDisplayContext = (ViewMetricsDisplayContext)request.getAttribute(ViewMetricsDisplayContext.class.getName());

int agentDefinitionsCount = viewMetricsDisplayContext.getAgentDefinitionsCount();
int chatbotsCount = viewMetricsDisplayContext.getChatbotsCount();
long totalInteractions = viewMetricsDisplayContext.getTotalInteractions();
long totalTokensUsed = viewMetricsDisplayContext.getTotalTokensUsed();
long tokenUsage = viewMetricsDisplayContext.getTokenUsage();
long tokenLimit = viewMetricsDisplayContext.getTokenLimit();
long tokenRemaining = tokenLimit > 0 ? tokenLimit - tokenUsage : 0;
int tokenPercent = (tokenLimit > 0) ? (int)Math.min(100, tokenUsage * 100 / tokenLimit) : 0;
String averageResponseTime = viewMetricsDisplayContext.getAverageResponseTime();
%>

<div class="ai-hub-metrics">
	<div class="ai-hub-metrics-inner">

		<%-- Daily Stats --%>

		<div class="ai-hub-metrics-section-header">
			<span class="ai-hub-metrics-section-title"><%= viewMetricsDisplayContext.get("daily-stats") %></span>
		</div>

		<div class="ai-hub-metrics-cards-row">
			<div class="ai-hub-metrics-card">
				<div class="ai-hub-metrics-card-header">
					<span class="ai-hub-metrics-card-label"><%= viewMetricsDisplayContext.get("total-interactions") %></span>
					<span class="ai-hub-metrics-card-icon ai-hub-metrics-card-icon--blue">
						<clay:icon symbol="bolt" />
					</span>
				</div>

				<div class="ai-hub-metrics-card-value"><%= totalInteractions %></div>
			</div>

			<div class="ai-hub-metrics-card">
				<div class="ai-hub-metrics-card-header">
					<span class="ai-hub-metrics-card-label"><%= viewMetricsDisplayContext.get("agents") %></span>
					<span class="ai-hub-metrics-card-icon ai-hub-metrics-card-icon--green">
						<clay:icon symbol="sites" />
					</span>
				</div>

				<div class="ai-hub-metrics-card-value"><%= agentDefinitionsCount %></div>
			</div>

			<div class="ai-hub-metrics-card">
				<div class="ai-hub-metrics-card-header">
					<span class="ai-hub-metrics-card-label"><%= viewMetricsDisplayContext.get("chatbots") %></span>
					<span class="ai-hub-metrics-card-icon ai-hub-metrics-card-icon--purple">
						<clay:icon symbol="comments" />
					</span>
				</div>

				<div class="ai-hub-metrics-card-value"><%= chatbotsCount %></div>
			</div>

			<div class="ai-hub-metrics-card">
				<div class="ai-hub-metrics-card-header">
					<span class="ai-hub-metrics-card-label"><%= viewMetricsDisplayContext.get("average-response-time") %></span>
					<span class="ai-hub-metrics-card-icon ai-hub-metrics-card-icon--orange">
						<clay:icon symbol="time" />
					</span>
				</div>

				<div class="ai-hub-metrics-card-value"><%= averageResponseTime %></div>
			</div>
		</div>

		<div class="ai-hub-metrics-cards-row">
			<div class="ai-hub-metrics-card">
				<div class="ai-hub-metrics-card-header">
					<span class="ai-hub-metrics-card-label"><%= viewMetricsDisplayContext.get("token-quota-used") %></span>
					<span class="ai-hub-metrics-card-icon ai-hub-metrics-card-icon--blue">
						<clay:icon symbol="check-circle" />
					</span>
				</div>

				<div class="ai-hub-metrics-card-value"><%= tokenUsage %></div>

				<% if (tokenLimit > 0) { %>
					<div class="ai-hub-metrics-card-progress">
						<div class="ai-hub-metrics-progress-bar">
							<div class="ai-hub-metrics-progress-fill" style="width: <%= tokenPercent %>%"></div>
						</div>

						<span class="ai-hub-metrics-card-sublabel"><%= tokenPercent %>% <%= viewMetricsDisplayContext.get("of") %> <%= tokenLimit %></span>
					</div>
				<% } %>
			</div>

			<div class="ai-hub-metrics-card">
				<div class="ai-hub-metrics-card-header">
					<span class="ai-hub-metrics-card-label"><%= viewMetricsDisplayContext.get("token-quota-remaining") %></span>
					<span class="ai-hub-metrics-card-icon ai-hub-metrics-card-icon--green">
						<clay:icon symbol="info-circle" />
					</span>
				</div>

				<div class="ai-hub-metrics-card-value ai-hub-metrics-card-value--<%= (tokenPercent > 80) ? "danger" : "normal" %>">
					<%= tokenLimit > 0 ? tokenRemaining : "-" %>
				</div>
			</div>
		</div>

		<%-- Activity logs --%>

		<div class="ai-hub-metrics-activity-header">
			<span class="ai-hub-metrics-section-title"><%= viewMetricsDisplayContext.get("activity-logs") %></span>

			<button class="btn btn-secondary btn-sm ai-hub-metrics-export-btn" onclick="
				var iframe = document.getElementById('ai-hub-export-iframe');
				if (!iframe) {
					iframe = document.createElement('iframe');
					iframe.id = 'ai-hub-export-iframe';
					iframe.style.display = 'none';
					document.body.appendChild(iframe);
				}
				iframe.src = '<%= PortalUtil.getPathModule() %>/ai-hub-audit-export';
				return false;">
				<clay:icon symbol="upload" />
				<%= viewMetricsDisplayContext.get("export-logs") %>
			</button>
		</div>

		<frontend-data-set:headless-display
			apiURL="<%= viewMetricsDisplayContext.getActivitiesAPIURL() %>"
			id="<%= AIHubFDSNames.METRICS_ACTIVITIES %>"
			itemsPerPage="<%= 20 %>"
			propsTransformer="{MetricsActivityPropsTransformer} from ai-hub-web"
			style="fluid"
		/>
	</div>
</div>
