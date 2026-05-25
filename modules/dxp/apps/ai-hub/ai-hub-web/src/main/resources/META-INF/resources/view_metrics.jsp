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
long feedbackTotalCount = viewMetricsDisplayContext.getFeedbackTotalCount();
long positiveFeedbackCount = viewMetricsDisplayContext.getPositiveFeedbackCount();
long negativeFeedbackCount = viewMetricsDisplayContext.getNegativeFeedbackCount();
int positiveFeedbackPercent = viewMetricsDisplayContext.getPositiveFeedbackPercent();
long issueReportCount = viewMetricsDisplayContext.getIssueReportCount();
%>

<div class="ai-hub-metrics">
	<div class="ai-hub-metrics-inner">

		<%-- Tabs --%>

		<nav class="nav nav-underline ai-hub-metrics-tabs" id="aiHubMetricsTabs" role="tablist">
			<a class="nav-link active" data-tab="activity-logs" href="#" role="tab">
				<%= viewMetricsDisplayContext.get("activity-logs") %>
			</a>

			<a class="nav-link" data-tab="user-feedback" href="#" role="tab">
				<%= viewMetricsDisplayContext.get("user-feedback") %>
			</a>
		</nav>

		<%-- Activity Logs Tab --%>

		<div class="ai-hub-metrics-tab-panel" id="tab-activity-logs">

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

		<%-- User Feedback Tab --%>

		<div class="ai-hub-metrics-tab-panel ai-hub-metrics-tab-panel--hidden" id="tab-user-feedback">

			<%-- Feedback Stats --%>

			<div class="ai-hub-metrics-section-header">
				<span class="ai-hub-metrics-section-title"><%= viewMetricsDisplayContext.get("feedback-overview") %></span>
			</div>

			<div class="ai-hub-metrics-cards-row">
				<div class="ai-hub-metrics-card">
					<div class="ai-hub-metrics-card-header">
						<span class="ai-hub-metrics-card-label"><%= viewMetricsDisplayContext.get("total-feedback") %></span>
						<span class="ai-hub-metrics-card-icon ai-hub-metrics-card-icon--blue">
							<clay:icon symbol="thumbs-up" />
						</span>
					</div>

					<div class="ai-hub-metrics-card-value"><%= feedbackTotalCount %></div>
				</div>

				<div class="ai-hub-metrics-card">
					<div class="ai-hub-metrics-card-header">
						<span class="ai-hub-metrics-card-label"><%= viewMetricsDisplayContext.get("positive-feedback") %></span>
						<span class="ai-hub-metrics-card-icon ai-hub-metrics-card-icon--green">
							<clay:icon symbol="thumbs-up" />
						</span>
					</div>

					<div class="ai-hub-metrics-card-value"><%= positiveFeedbackCount %></div>
					<div class="ai-hub-metrics-card-sublabel"><%= positiveFeedbackPercent %>%</div>
				</div>

				<div class="ai-hub-metrics-card">
					<div class="ai-hub-metrics-card-header">
						<span class="ai-hub-metrics-card-label"><%= viewMetricsDisplayContext.get("negative-feedback") %></span>
						<span class="ai-hub-metrics-card-icon ai-hub-metrics-card-icon--red">
							<clay:icon symbol="thumbs-down" />
						</span>
					</div>

					<div class="ai-hub-metrics-card-value"><%= negativeFeedbackCount %></div>
				</div>

				<div class="ai-hub-metrics-card">
					<div class="ai-hub-metrics-card-header">
						<span class="ai-hub-metrics-card-label"><%= viewMetricsDisplayContext.get("issue-reports") %></span>
						<span class="ai-hub-metrics-card-icon ai-hub-metrics-card-icon--orange">
							<clay:icon symbol="warning-full" />
						</span>
					</div>

					<div class="ai-hub-metrics-card-value"><%= issueReportCount %></div>
				</div>
			</div>

			<%-- Feedback Table --%>

			<div class="ai-hub-metrics-section-header">
				<span class="ai-hub-metrics-section-title"><%= viewMetricsDisplayContext.get("feedback-reports") %></span>
			</div>

			<frontend-data-set:headless-display
				apiURL="<%= viewMetricsDisplayContext.getFeedbackAPIURL() %>"
				id="<%= AIHubFDSNames.METRICS_FEEDBACK %>"
				itemsPerPage="<%= 20 %>"
				propsTransformer="{MetricsFeedbackPropsTransformer} from ai-hub-web"
				style="fluid"
			/>
		</div>
	</div>
</div>

<aui:script>
	(function () {
		var tabs = document.querySelectorAll('#aiHubMetricsTabs .nav-link');

		tabs.forEach(function (tab) {
			tab.addEventListener('click', function (event) {
				event.preventDefault();

				tabs.forEach(function (t) {
					t.classList.remove('active');
				});

				tab.classList.add('active');

				document.querySelectorAll('.ai-hub-metrics-tab-panel').forEach(function (panel) {
					panel.classList.add('ai-hub-metrics-tab-panel--hidden');
				});

				var targetId = 'tab-' + tab.getAttribute('data-tab');

				document.getElementById(targetId).classList.remove('ai-hub-metrics-tab-panel--hidden');
			});
		});
	})();
</aui:script>
