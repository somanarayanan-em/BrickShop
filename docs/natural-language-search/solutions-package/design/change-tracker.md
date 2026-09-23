# Design change tracker

Package: natural-language-search design. Version 0.1. Initialized 2026-09-23 before section writes.

| ID | Date | Section | Action | Note |
|---|---|---|---|---|
| CT-D-001 | 2026-09-23 | scoping | Added | UI, backend, read-only data, workflow, and UX are in scope by override. No new API and no external language service. |
| CT-D-002 | 2026-09-23 | technology-stack | Added | Pin Node 18, Express 4.22.1, EJS 3.1.10, mysql2 3.16.2, MySQL 8.0, @huggingface/transformers 4.3.0. |
| CT-D-003 | 2026-09-23 | ADR-0001 | Added | Phrase stays on the shop. A local model normalizes wording. A parser enforces under, over, and between. |
| CT-D-004 | 2026-09-23 | package | Accepted | User accepted the design package and asked to move on. |
| CT-D-005 | 2026-09-23 | review-architecture | Accepted | User accepted ARCH-1 and ARCH-2. Age-before-page-cut stays an observation for planning. |
| CT-D-006 | 2026-09-23 | review-security-posture | Accepted | User accepted SEC-1 and SEC-2. Escape the limits line. Escape `%` and `_` in the theme fragment. |
| CT-D-007 | 2026-09-23 | review-adversarial-pass | Accepted | User accepted ADV-001–ADV-004. Parser is the contract. Phrase path keeps discounted-price order. |
| CT-D-008 | 2026-09-23 | review-edge-cases | Accepted | User accepted edge defaults: ordered between-pairs, age word selects an age range, unknown stored ages do not match, decimal phrase amounts, trimmed blank phrase. |
| CT-D-009 | 2026-09-23 | readiness | Conditional go | All four reviews passed with accepted observations. Ten planning conditions are in the readiness verdict. |
| CT-D-010 | 2026-09-23 | workflow | Modified | DEC-014. Between and hyphen pairs are price unless the phrase says age or years old. |
