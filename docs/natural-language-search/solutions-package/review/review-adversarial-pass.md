# Review — adversarial pass

Feature: `natural-language-search`. Reviewed 2026-09-23.

Findings: `docs/natural-language-search/solutions-package/review/adversarial-findings.md`.

`worst_severity` is `medium`. `must-fix` count is 0.

**Verdict: PASS WITH OBSERVATIONS**

## Findings carried forward

| ID | Severity | Note |
|---|---|---|
| ADV-001 | medium | Model rewrite is stated in the overview and not tested. Same gap as accepted ARCH-2. |
| ADV-002 | medium | ADR-0001 does not compare alternatives. |
| ADV-003 | medium | Phrase-path sort leaves the discounted-price order with no requirement to do so. |
| ADV-004 | low | Age after the page cut. Already accepted as ARCH-1. |

## Acceptance

Accepted by the user on 2026-09-23, with later review observations accepted by the same instruction. No design edit in this pass. Planning keeps the parser as the contract, keeps today's discounted-price order on the phrase path, and does not add an alternatives section unless a later change asks for one.
