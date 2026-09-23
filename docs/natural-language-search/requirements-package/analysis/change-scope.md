# Change scope

Confirmed by the user on 2026-09-23. Drawn from the current-capability baseline.

## In scope

- On the existing search page, a typed phrase becomes a structured search.
- The phrase may set an upper limit on the English price before discount, a theme (a distinctive part is enough; every matching theme is included), and an age (the number must fall inside the stored range).
- When more than one of those is present, a product must satisfy all of them.
- Words that are not one of those three are dropped.
- A phrase that states none of the three shows no products.
- The matching products are shown on the current results list.

## Out of scope

- Search with no phrase. That stays the full list, cheapest first.
- The separate price-order and category controls, including the current behavior of dropping the typed words.
- Matching color, descriptions, or leftover words against the product name.
- The Vietnamese price, and the price after discount, as the limit.
- A new screen, new stored facts, or a change to who can search.
- Which model turns the phrase into those three facts. That is the solution phase.

## Must not touch

- Opening search from the header, without signing in.
- Paging, and opening a product from the list.
- Comments and the cart.

## Still open

None. ASM-002 was closed on 2026-09-23.

## Decided into scope on 2026-09-23

- A product at exactly $50 is included in "under $50."
- "Over $50" includes 50. "Between 10 and 50" includes both ends.
- An age range such as "5-12" matches stored ages it overlaps.
- The search page shows the interpreted limits.
