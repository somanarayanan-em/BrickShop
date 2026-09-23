# Process map (future)

Search after this change. Confirmed by the user on 2026-09-23. Deltas are marked against today's process.

1. The shopper opens search from the header magnifying glass, without signing in. Unchanged.
2. With no phrase, the page lists products 20 at a time, cheapest first. Unchanged.
3. They type a phrase and submit. **Change.** The shop reads the phrase for an English list-price cap, a theme, and an age. Other words are dropped.
4. **Change.** If none of those three is present, the page shows no products. Today an empty or name-only search still lists products.
5. **Change.** If one or more are present, the page shows those interpreted limits and lists only products that satisfy every one of them, 20 at a time. The stated price is included, so a product at exactly $50 matches "under $50." A theme fragment includes every matching theme. An age must fall inside the stored range. The price cap uses the English price before discount. An empty product list still shows the limits.
6. They move between pages, or they open a product. Unchanged. The separate price-order and category controls stay as they are, including dropping the typed words when either one changes.
