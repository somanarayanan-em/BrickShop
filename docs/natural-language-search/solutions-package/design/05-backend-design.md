# Backend design

Add a module the search handler calls. Suggested path: `lib/phrase-limits.js`. It returns:

| Field | Meaning |
|---|---|
| `priceMin` | Inclusive lower list price, or absent |
| `priceMax` | Inclusive upper list price, or absent |
| `ageMin` | Inclusive lower age, or absent |
| `ageMax` | Inclusive upper age, or absent. Absent `ageMax` with `ageMin` set means "N+". |
| `theme` | Fragment to match against `p_category`, or absent |

Steps:

1. Ask the local model to rewrite the phrase into one line of the closed grammar: `under N`, `over N`, `between A and B`, `age N`, `ages A-B`, plus leftover theme words.
2. Parse that line in code. Reject a result that is not one of those shapes.
3. If the model fails or the parse fails, run the same parser on the shopper's original phrase.
4. Theme words are the tokens the parser did not consume. If no bound and no theme remain, return an empty result. The handler then renders no products and no limits.

`GET /search` with an empty keyword does not call this module.

Trace: FR1.1.1, FR1.1.2, ADR-0001.
