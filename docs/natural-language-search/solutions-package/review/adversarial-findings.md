---
schema: aide-adversarial-findings@1
target_artifact: design-package
target_path: docs/natural-language-search/solutions-package/design/solution-package.md
target_commit: 8bf0b1d
produced_by: review-adversarial
produced_at: 2026-09-23T18:56:15Z
stage: design
severity_counts: { critical: 0, high: 0, medium: 3, low: 1 }
triage_counts:    { must-fix: 0, should-fix: 0, consider: 3, wont-fix: 1 }
worst_severity: medium
finding_ids: [ADV-001, ADV-002, ADV-003, ADV-004]
---

# Adversarial findings — natural language search design

Reviewed the design index and the section files it links. Section text is in those files, as the index states.

## Triage summary

| ID | Severity | Category | Finding (one line) | Action |
|---|---|---|---|---|
| ADV-001 | medium | Unsupported claim | Overview states the model rewrites loose wording; tests do not assert that | consider |
| ADV-002 | medium | Good news only | ADR-0001 names the decision and does not compare alternatives | consider |
| ADV-003 | medium | Hidden assumption | Phrase-path sort drops the discounted-price order with no requirement to do so | consider |
| ADV-004 | low | Hidden assumption | Age is applied after the 20-row page cut | wont-fix |

## All findings

### ADV-001 · medium · Unsupported claim
- **Evidence:** `01-solution-overview.md` line 3 states that a local model rewrites loose wording. `10-workflow-business-rules-design.md` line 12 only says the model may rewrite "cheaper than 50". `14-testing-strategy.md` line 19 says the model rewrite is not asserted. Index links: solution overview, workflow, testing.
- **Risk:** A paraphrase the parser does not already understand depends on an unmeasured model. The fallback then misses it, and the page shows no products.
- **Recommendation:** Keep the parser as the contract, and say in the overview that loose wording is best-effort. This is the same gap as accepted ARCH-2.

### ADV-002 · medium · Good news only
- **Evidence:** Index line 29 links ADR-0001. That record has Decision, Why, and Consequences. It rejects a hosted call in one sentence and does not compare a parser-only design.
- **Risk:** A later reader cannot see what was turned down, or why the model is worth the image size.
- **Recommendation:** Add a short alternatives note: hosted API rejected for residency; parser-only rejected because loose wording would never match.

### ADV-003 · medium · Hidden assumption
- **Evidence:** `07-database-design.md` line 14 says not to sort the phrase path by discounted price. Requirements freeze cheapest-first only for an empty search (`FR2.1.1`). Index links the database section.
- **Risk:** Phrase results leave today's order without a stated rule for what replaces it.
- **Recommendation:** Keep the existing discounted-price order unless a requirement says otherwise. The price limit still uses list price.

### ADV-004 · low · Hidden assumption
- **Evidence:** `07-database-design.md` lines 14–16 keep `LIMIT 20` and apply age after the query.
- **Risk:** A page can hide later rows that match the age bound.
- **Recommendation:** Already accepted as ARCH-1. Planning applies age before the page cut. No new design edit in this pass.
