# Increment decomposition

Feature: `natural-language-search`. One-pass. The increment-scoping questions are answered from the approved design and the ten planning conditions.

| ID | Boundary | Goal | FRs | Size | Depends on |
|---|---|---|---|---|---|
| INC-001 | foundation | `npm test` runs and exits 0 | None (foundational) | XS | None |
| INC-002 | feature | The parser returns price, theme, and age bounds | FR1.1.1, FR1.1.6 | S | INC-001 |
| INC-003 | feature | Search uses those bounds and shows the limits | FR1.1.2, FR1.1.3, FR1.1.4, FR1.1.5, FR1.1.7, FR1.1.8, FR2.1.1, FR2.1.2, FR2.1.3 | M | INC-002 |
| INC-004 | feature | A local model may rewrite wording and still falls back | None (NFRs; FRs already met) | S | INC-002, INC-003 |

Strict serial order. Value first: the parser and the page ship before the model. The model does not block the requirements.
