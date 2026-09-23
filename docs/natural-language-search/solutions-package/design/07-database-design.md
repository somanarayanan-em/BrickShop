# Database design

No new table and no new column. Age stays text. Color is not added.

The handler reads `product` with the price and theme bounds only. Age is applied in the app because `p_age` is `12+` or `6-12`, not two numbers.

Price predicate, parameters only, no string-built amounts:

- `priceMax` set: `p_price_en <= ?`
- `priceMin` set: `p_price_en >= ?`
- `theme` set: `p_category LIKE ?` with the fragment wrapped as a contains-match
- Combine with AND
- Keep `LIMIT 20` and the existing offset
- Do not sort by the discounted price for this path. The separate price-order control still owns that sort when the shopper uses it.

Age overlap after the query:

- Stored `A-B` overlaps phrase `ageMin`–`ageMax` when the ranges share an integer.
- Stored `N+` overlaps when the phrase range includes any age `>= N`, or a single age `>= N`.
- A single phrase age matches when it sits inside the stored range, including the endpoints.

Trace: FR1.1.4, FR1.1.5, FR1.1.6. Requirements forbid a schema change.
