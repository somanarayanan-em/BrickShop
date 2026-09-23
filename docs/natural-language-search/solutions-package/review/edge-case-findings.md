---
schema: aide-adversarial-findings@1
target_artifact: design-package
target_path: docs/natural-language-search/solutions-package/design/solution-package.md
target_commit: 8bf0b1d
produced_by: review-edge-case-hunter
produced_at: 2026-09-23T19:00:41Z
stage: design
severity_counts: { critical: 0, high: 0, medium: 4, low: 2 }
triage_counts:    { must-fix: 0, should-fix: 0, consider: 4, wont-fix: 2 }
worst_severity: medium
finding_ids: [ADV-001, ADV-002, ADV-003, ADV-004, ADV-005, ADV-006]
---

# Edge-case findings — natural language search design

Walked branching, errors, boundaries, concurrency, time, data shape, and authorization against the design index and the sections it links. Handled paths are omitted. Time and authorization produced no findings: the feature has no clock, and public search is explicit.

## Triage summary

| ID | Severity | Category | Finding (one line) | Action |
|---|---|---|---|---|
| ADV-001 | medium | Boundary | "between A and B" with A greater than B is unspecified | consider |
| ADV-002 | medium | Branching | Bare "between" is both a price example and an age example | consider |
| ADV-003 | medium | Data shape | Stored age text other than A-B or N+ has no rule | consider |
| ADV-004 | medium | Boundary | A decimal amount in the phrase is unspecified | consider |
| ADV-005 | low | Data shape | A keyword of only spaces is not defined as empty | wont-fix |
| ADV-006 | low | Boundary | Age is applied after the 20-row page cut | wont-fix |

## All findings

### ADV-001 · medium · Boundary
- **Evidence:** `10-workflow-business-rules-design.md` lines 6–7 define between as a low number then a high number. No reversed pair.
- **Risk:** "between 50 and 10" has no result rule.
- **Recommendation:** Order the two numbers so the smaller is the lower bound.

### ADV-002 · medium · Branching
- **Evidence:** `10-workflow-business-rules-design.md` line 6 maps "between 10 and 50" to price. Line 9 maps "between 5 and 12" to age.
- **Risk:** A between-pair that is neither example can become a price bound or an age bound.
- **Recommendation:** A between-pair is a price bound unless the phrase says age or years old. Resolved by DEC-014.

### ADV-003 · medium · Data shape
- **Evidence:** `07-database-design.md` lines 16–20 define overlap only for stored `A-B` and `N+`.
- **Risk:** A blank or other `p_age` value is neither kept nor dropped.
- **Recommendation:** A stored age that is not `A-B` or `N+` does not match an age bound.

### ADV-004 · medium · Boundary
- **Evidence:** `14-testing-strategy.md` lines 7–11 use whole numbers in the phrase and decimals only on the stored list price.
- **Risk:** "under 9.99" has no parse rule, while list prices are already decimals.
- **Recommendation:** Accept a decimal amount in the phrase and use the same inclusive comparison.

### ADV-005 · low · Data shape
- **Evidence:** `05-backend-design.md` line 20 skips the module only for an empty keyword.
- **Risk:** Spaces alone could be sent to the model and then show no products.
- **Recommendation:** Trim the phrase. A blank result is an empty search.

### ADV-006 · low · Boundary
- **Evidence:** `07-database-design.md` lines 14–16 keep `LIMIT 20` and apply age after the query.
- **Risk:** Page size and later matches disagree with the age rule.
- **Recommendation:** Already accepted as ARCH-1. Planning applies age before the page cut.
