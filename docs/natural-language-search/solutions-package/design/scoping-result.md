# Scoping result

Feature `natural-language-search`. Design stage, 2026-09-23. Requirements 0.3.

`project.toml` does not set `has_ui`, `has_backend`, `has_persistence`, or `has_complex_workflows`. Those gates would mark the matching blocks N/A. This feature changes the search page, the search handler, and how stored product fields are read, so those blocks are IN by override. The same override was used for business rules and journeys in the requirements package.

| Block | Result | Reason |
|---|---|---|
| shared/overview | IN | Required |
| design/solution-overview | IN | Required |
| design/technology-stack | IN | Required. Versions pinned. |
| design/solution-architecture | IN | Required |
| design/frontend-design | IN | Override. The search page must show interpreted limits. |
| design/backend-design | IN | Override. `GET /search` gains the language step. |
| design/api-design | N/A | No new HTTP API. `exposes_api` is unset. |
| design/database-design | IN | Override, read-only. No new table or column. Documents the filter. |
| design/security-design | IN | Required. Phrase must stay on-prem. |
| design/integration-design | N/A | The language step is inside the app. No new external service. |
| design/workflow-business-rules-design | IN | Override. Under, over, and between are the workflow. |
| design/dashboard-reporting-design | N/A | No dashboard. |
| design/ux-design | IN | Override. Same page, limits shown with the list. |
| design/deployment-devops | IN | Required. Same Compose. Model cache stays local. |
| design/observability-operations | IN | Required |
| design/testing-strategy | IN | Required |
| design/non-functional-requirements-technical | IN | Required. On-prem, single-region. |
| design/risk-assessment | IN | Override. Hosted inference would leave the shop. |
| knowledge-base/adr-template | IN | ADR-0001 |
| shared/glossary | IN | Required |
| shared/traceability | IN | Required |
| shared/change-log | IN | Required |
