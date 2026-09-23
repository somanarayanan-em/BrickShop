# Workflow and business rules

| Phrase shape | Bound |
|---|---|
| under 50, below $50 | `priceMax = 50` |
| over 50, at least $50 | `priceMin = 50` |
| between 10 and 50, between 5 and 12, 5-12 | `priceMin` and `priceMax` |
| age 8, 8 years old | `ageMin = 8`, `ageMax = 8` |
| ages 5-12, between 5 and 12 years old | `ageMin = 5`, `ageMax = 12` |
| 12+ | `ageMin = 12`, no `ageMax` |

Endpoints count. 50.00 matches under, over, and either end of a between. The model may rewrite "cheaper than 50" to `under 50` and "5 to 12 years old" to `ages 5-12`. A between-pair is price unless the phrase says age or years old. The parser, not the model, decides the comparison.

A theme fragment is matched with contains, and every matching theme is included. All present bounds are AND. No bound and no theme means no products.

Trace: BR1.1–BR1.6, DEC-013, DEC-014.
