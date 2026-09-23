# Testing strategy

`npm test` is a stub today. Add tests for the parser and the age overlap. They do not need MySQL.

| Case | Expect |
|---|---|
| under 50 | `priceMax = 50` |
| over 50 | `priceMin = 50` |
| between 10 and 50 | both bounds |
| list price 50.00 | included in under and in over |
| list price 50.01 | excluded from under 50 |
| age 8 against stored 6-12 | keep |
| ages 5-12 against stored 6-12 | keep |
| ages 5-12 against stored 12+ | keep, they share 12 |
| ages 5-8 against stored 12+ | drop |
| red colored toy | no bounds |
| Ninjago between 10 and 50 for ages 5-12 | all three bounds |

The model rewrite is not asserted in these tests. The parser is the contract. A later test may feed the model, and a failed model call must still hit the parser.

Trace: AC1, AC2, AC3, AC8, AC10, AC11.
