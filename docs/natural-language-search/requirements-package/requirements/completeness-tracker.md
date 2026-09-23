# Completeness tracker

Feature: `natural-language-search`. Relevance gate confirmed by the user on 2026-09-23. Fill sections were written into `.framework-output/requirements/natural-language-search/natural-language-search-enhancement-spec.md` on 2026-09-23 under the user's standing yes.

Overrides: business rules and user journeys are Fill even though `has_business_rules` and `has_ui` are unset in `project.toml`. Solution and planning sections are Skip until the solution phase.

| Order | Block | Recommendation | Reason |
|---|---|---|---|
| 1 | shared/overview | Fill | Frames the change |
| 2 | requirements/executive-summary-business-context | Fill | Who, what, why |
| 2.5 | requirements/business-objectives-success-criteria | Fill | Outcome stated in the change description |
| 2.6 | requirements/stakeholders-personas | N/A | Same shopper. No new role. `changes_personas` is unset. |
| 3 | requirements/functional-requirements | Fill | Phrase becomes price, theme, and age, then a product list |
| 3.5 | requirements/functional-specifications | N/A | Behavior fits in functional requirements. `has_complex_workflows` is unset. |
| 4 | requirements/business-logic-rules | Fill | Matching rules confirmed in elicitation. Override of unset `has_business_rules`. |
| 4.5 | requirements/user-journeys | Fill | Journey A changes. Override of unset `has_ui`. |
| 4.6 | requirements/views-dashboards | N/A | Same search page. No new screen. |
| 5 | requirements/data-requirements | N/A | Uses stored product facts. No new data. `touches_data` is unset. |
| 5.5 | requirements/permissions-access-control | N/A | Search stays open without signing in. `has_authn_authz` is unset. |
| 6 | requirements/non-functional-requirements | N/A | No non-functional requirement was agreed. `changes_nfrs` is unset. |
| 7 | requirements/assumptions-constraints-out-of-scope | Fill | Open price questions, and the engine left to the solution phase |
| 8 | requirements/acceptance-criteria | Fill | How the change is judged done |
| 9 | design/solution-architecture | Skip | Solution phase |
| 10 | design/api-design | N/A | `changes_api` is unset. |
| 11 | design/database-design | N/A | No table or column change. `changes_schema` is unset. |
| 12 | design/security-design | N/A | No new trust boundary. `changes_security_boundary` is unset. |
| 13 | design/testing-strategy | Skip | Solution phase |
| 14 | planning/increment-identity | Skip | Solution phase |
| 15 | planning/plan | Skip | Solution phase |
| 16 | planning/automated-verification | Skip | Solution phase |
| 17 | planning/human-verification | Skip | Solution phase |
| 18 | planning/success-criteria | Skip | Solution phase |
| 19 | shared/glossary | Fill | Terms used by the requirements |
| 20 | shared/traceability | Fill | Links requirements to discovery |
| 21 | shared/change-log | Fill | Record of this package |
