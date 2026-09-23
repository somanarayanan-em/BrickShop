# Review — edge cases

Feature: `natural-language-search`. Reviewed 2026-09-23.

Findings: `docs/natural-language-search/solutions-package/review/edge-case-findings.md`.

`worst_severity` is `medium`. `must-fix` count is 0.

**Verdict: PASS WITH OBSERVATIONS**

## Findings carried forward

| ID | Severity | Planning default |
|---|---|---|
| ADV-001 | medium | Order a reversed between-pair so the smaller number is the lower bound. |
| ADV-002 | medium | A between-pair is price unless the phrase says age or years old. DEC-014. |
| ADV-003 | medium | Stored age text other than `A-B` or `N+` does not match. |
| ADV-004 | medium | A decimal amount in the phrase uses the same inclusive comparison. |
| ADV-005 | low | Trim the phrase. Spaces alone are an empty search. |
| ADV-006 | low | Same as accepted ARCH-1. |

## Acceptance

Accepted by the user on 2026-09-23 under the instruction to accept review defaults. These defaults are conditions on planning. No design edit in this pass.
