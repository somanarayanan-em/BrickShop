# Review — security posture

Feature: `natural-language-search`. Reviewed 2026-09-23 against the security, backend, frontend, and deployment sections.

**Verdict: PASS WITH OBSERVATIONS**

Search stays public, which matches the requirement that who can search does not change. The phrase stays in the shop process. There is no hosted language call, so the on-prem, single-region constraint holds. Amounts and the theme fragment are bound SQL parameters. The parser, not the model, decides which comparisons run. Logs record bound flags only, not the phrase.

## Findings

| ID | Severity | Finding |
|---|---|---|
| SEC-1 | medium | The limits line includes the theme fragment, which is shopper text. The design does not say that line is escaped. The existing search box uses escaped EJS output (`<%= keyword %>`). The limits line has to use the same escaping. |
| SEC-2 | low | A bound `LIKE` parameter still treats `%` and `_` inside the theme fragment as wildcards. That widens a public catalog match. It is not statement injection. |

No blocking finding. No new account, secret, or outbound path.

## Acceptance

Accepted by the user on 2026-09-23. SEC-1 and SEC-2 stand as observations. Planning must escape the limits line and must not treat `%` or `_` inside a theme fragment as extra wildcards unless that widening is accepted again at planning time.
