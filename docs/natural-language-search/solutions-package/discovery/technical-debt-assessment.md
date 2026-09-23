# Technical debt assessment

Scoped to natural-language search. Categories are relative to this feature, not a whole-repo cleanup. Observed 2026-09-23.

| Item | Type | Class | Why |
|---|---|---|---|
| Search matches English names only and cannot read a price, a theme fragment, or an age out of a phrase | Architecture | Must-fix | This is the gap the requirements close. The language step does not exist. |
| `p_age` is free text (`12+`, `6-12`), not a numeric range | Data | Must-fix for this feature | FR1.1.5 requires the number to fall inside that text. The design has to interpret the two shapes that exist. It does not require a schema change. |
| No automated tests (`npm test` is a stub) | Test | Should-fix | Acceptance criteria AC1–AC9 have nothing to run against. Not a blocker for the design of the language step. |
| Category and sort form drops the typed phrase | Code | Defer | Requirements FR2.1.2 say this behavior stays. |
| Search and the rest of the storefront live in one `index.js` | Architecture | Defer | Splitting the monolith is out of scope. The new behavior can be a module the search handler calls. |
| Header typed-search box is commented out; only the magnifying glass opens search | Code | Defer | Entry stays the magnifying glass. |
| Code snapshot is 2 March 2026 | Documentation | Defer | Docs match that snapshot. No newer app code is in the repo. |
| Vietnamese names, descriptions, color | Data | Defer | Requirements drop those. No column is added. |
