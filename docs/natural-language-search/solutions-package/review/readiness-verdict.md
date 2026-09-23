# Readiness verdict

Feature: `natural-language-search`. Gate run 2026-09-23.

**Verdict: CONDITIONAL GO**

Planning may start. The conditions below are accepted.

## Reviews

| Review | Verdict | Accepted |
|---|---|---|
| Architecture | PASS WITH OBSERVATIONS | Yes. ARCH-1, ARCH-2 |
| Security posture | PASS WITH OBSERVATIONS | Yes. SEC-1, SEC-2 |
| Adversarial pass | PASS WITH OBSERVATIONS | Yes. ADV-001–ADV-004 in `adversarial-findings.md` |
| Edge cases | PASS WITH OBSERVATIONS | Yes. ADV-001–ADV-006 in `edge-case-findings.md` |

No review returned FAIL. Gated-out blocks stay N/A: API design, integration design, dashboards. Those N/A rows are in `scoping-result.md`.

## Upstream checks

- Requirements spec is version 0.3. The design index records 0.3. The user ordered that expansion and then accepted this design.
- ADR-0001 resolves to `brick-shop-knowledge-base/adr/0001-local-phrase-extraction.md`.
- The requirements change-tracker heading still says version 0.1. The spec and the latest tracker row are the 0.3 behavior. Planning uses the spec.

## Conditions planning must follow

1. Apply the age overlap before the page is cut, and count pages from that filtered set.
2. Escape the interpreted-limits line the same way the search box escapes the keyword.
3. Escape `%` and `_` inside a theme fragment before the contains-match.
4. The parser is the contract. A model rewrite of loose wording is best-effort.
5. Keep today's discounted-price order on the phrase path. The limit still uses list price.
6. Order a reversed between-pair so the smaller number is the lower bound.
7. A between-pair or a hyphen pair is a price bound unless the phrase says age or years old. DEC-014.
8. Stored age text other than `A-B` or `N+` does not match an age bound.
9. A decimal amount in the phrase uses the same inclusive comparison.
10. Trim the phrase. Spaces alone are an empty search.

## Handoff

Next skill: `create-implementation-package`.
