# Current capability baseline

Feature: natural-language search. Written 2026-09-23 from confirmed discovery. Confidence is marked on each claim.

## Change description

Confirmed. The user needs the search feature to be augmented with AI-powered search so that the customer experience is smooth.

## What the shop does today

Confirmed against the catalog and the search page.

- Shoppers browse and search without signing in.
- Search is opened from the header magnifying glass. The header has no typed search box.
- With no words, search lists products 20 at a time, cheapest first, using the English price after discount for that order.
- Typed words match the English product name only. The Vietnamese name is not used.
- A separate price order and a separate category control exist. Changing either one drops the typed words.
- Page links keep the words, the category, and the price order.
- No matches shows "No products available."
- Opening a product, comments, and the cart are outside this change.

The code snapshot these facts were checked against is `8bf0b1d3` (2 March 2026), which is still the repo snapshot. It is older than the 30-day staleness window. The documents agree with that snapshot. Project-level solution context has not been captured.

## What this change adds

Confirmed in elicitation. The new behavior is on Journey A, when the user types a phrase and the shop shows results. Opening search, paging, opening a product, searching with no phrase, and the separate price-order and category controls stay as they are.

The shop turns the phrase into a structured search and shows products that match. A phrase narrows the list only through three stored facts:

- **Price.** An upper limit uses the English price before the discount. A discounted $9.99 product still counts as $9.99.
- **Category.** A distinctive part of the stored theme name is enough. "Ninjago" matches "Lego Ninjago." If the part matches several themes, products in every matching theme are included.
- **Age.** A number in the phrase must fall inside the stored age text. "8" matches "6–12." "12" matches both "6–12" and "12+."

If the phrase states more than one of these, a product must satisfy every one of them.

Words that are not a price limit, a category, or an age are dropped. They do not have to appear in the product name. Color is not stored, so a color word does not filter. If the phrase states none of the three, the shop shows no products. It does not fall back to the full list or to an English-name match.

**Worked example.** "Red colored toy under $50" becomes "English list price under $50." "Red," "colored," and "toy" are dropped. "Ninjago under $50 for age 8" becomes English list price under $50, theme matching Ninjago, and age range containing 8. All three must hold.

## Not decided

None. Under, over, and between are required for price and for age.

## Decided after the first baseline

- A product at exactly $50 is included in "under $50." "Over $50" includes 50. "Between 10 and 50" includes both ends.
- An age range overlaps the stored age text. "5-12" overlaps "6-12" and overlaps "12+" at 12.
- The search page shows the interpreted limits.

## Deferred to the solution phase

Confirmed by the user on 2026-09-23. The language-step engine is not a requirement. Which model is used, including whether that model is a Hugging Face model, and whether it runs on the shop's machine or on a hosted service, is decided in the solution phase.
