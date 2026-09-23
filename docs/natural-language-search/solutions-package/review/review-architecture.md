# Review — architecture

Feature: `natural-language-search`. Reviewed 2026-09-23 against the design index and the architecture baseline.

**Verdict: PASS WITH OBSERVATIONS**

The shape is sound: one Express process, an in-process language step, MySQL unchanged, parser owning the comparisons, model only rewriting words. Gated-out blocks (API, external integration, dashboards) match a server-rendered search page. Versions in the technology stack are pinned and match the C4 container labels.

## Findings

| ID | Severity | Finding |
|---|---|---|
| ARCH-1 | medium | Age is filtered in the app after `LIMIT 20`. A page can drop rows that failed the age check and hide later rows that would have matched. Paging then disagrees with FR1.1.5. Age has to be applied before the page is cut. No schema change is required to do that. |
| ARCH-2 | low | `Xenova/flan-t5-small` is not proven to emit the closed grammar. The parser fallback covers a failed model. The tests correctly bind the parser, not the model. |

No blocking finding. Scalability and a second service are out of scope for this catalog. The monolith stays, which the requirements already deferred.

## Acceptance

Accepted by the user on 2026-09-23. ARCH-1 and ARCH-2 stand as observations. They are not design fixes in this pass. Planning must apply age before the page cut.
