# Natural language search — implementation package

Feature: `natural-language-search`. Requirements 0.4. Design 0.1, conditional go on 2026-09-23. DEC-014: a between-pair or hyphen pair is price unless the phrase says age or years old.

This package splits the approved design into four increments. The parser and the search page satisfy the requirements. The local model is last and is not required for those requirements.

The approach is the one in ADR-0001: a parser owns under, over, and between, and a local model may only rewrite wording.

## Increments

| ID | Name | FR mapping | Depends on | Status |
|---|---|---|---|---|
| [INC-001](INC-001.md) | Test runner | None (foundational) | None | not-started |
| [INC-002](INC-002.md) | Phrase parser | FR1.1.1, FR1.1.6 | INC-001 | not-started |
| [INC-003](INC-003.md) | Search results | FR1.1.2, FR1.1.3, FR1.1.4, FR1.1.5, FR1.1.7, FR1.1.8, FR2.1.1, FR2.1.2, FR2.1.3 | INC-002 | not-started |
| [INC-004](INC-004.md) | Local wording rewrite | None (NFRs) | INC-002, INC-003 | not-started |

Working notes: `plan/codebase-analysis.md`, `plan/test-plan.md`, `plan/increment-decomposition.md`.
