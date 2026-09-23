# Risk register

Written 2026-09-23 under the user's standing yes. These risks do not change confirmed behavior.

| ID | Risk | Likelihood | Impact | Response |
|---|---|---|---|---|
| RSK-001 | The shop has no language step. Structured search cannot run until the solution phase supplies one. | Certain | High | Requirements do not name a model. Solution phase must provide the step. |
| RSK-002 | A phrase such as "red colored toy" shows no products, because color and leftover words are dropped. That can feel unlike a smooth search. | High | Medium | Accepted. Confirmed in elicitation Q3 and Q4. |
| RSK-003 | "Under $50" uses the English price before discount, so a product whose discounted price is under $50 can still be excluded. | High | Medium | Accepted. Confirmed in elicitation Q2. |
| RSK-004 | A short theme fragment such as "Lego" includes every matching theme, so the list can be wide. | Medium | Low | Accepted. Confirmed in elicitation Q8. |
| RSK-005 | The separate price-order and category controls drop the typed phrase. A shopper can wipe a structured search by touching those controls. | High | Medium | Accepted. Those controls are out of scope and must not change. |
| RSK-006 | Closed. Under, over, and between are now required for price and age. | — | — | DEC-013. |
| RSK-007 | A hosted language model would send the shopper's phrase outside this on-prem, single-region shop. | Possible | High | Deferred. The solution phase chooses where the language step runs. |
