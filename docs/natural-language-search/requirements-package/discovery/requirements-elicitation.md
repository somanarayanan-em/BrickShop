# Requirements elicitation

One decision at a time. Only gaps the catalog cannot answer.

## Q1 — Phrase mentions a fact the catalog does not store

**Question:** When a phrase mentions something the catalog does not store, such as color, what should the shop do?

**Answer:** B. Use only stored facts — price, category, age, and name — and ignore the rest of the phrase.

**Consequence for the example:** "red colored toy under $50" does not filter by color. "Red" and "colored" are ignored unless those words are part of the product name. Price, category, age, and name can still be used.

Confirmed by the user on 2026-09-23.

## Q2 — Which price a limit uses

**Question:** When the phrase sets a price limit, which English price should it use? The "$" points at the English price, not the Vietnamese price.

**Answer:** B. The English price before the discount.

**Consequence:** A product listed at $9.99 with a discount still counts as $9.99 against "under $50", not the reduced amount the page shows as what the shopper pays.

Confirmed by the user on 2026-09-23.

## Q3 — Words left after price, category, and age

**Question:** After a price limit, a category, and an age are taken out of the phrase, what should the shop do with the leftover words?

**Answer:** C. Drop them. Apply only price, category, and age.

**Consequence:** A phrase narrows the list only when it states a price limit, a category, or an age. Words such as "toy", "red", and "colored" do not have to appear in the product name. "Red colored toy under $50" becomes "English list price under $50" and nothing else.

Confirmed by the user on 2026-09-23.

## Q4 — Phrase states no price, category, or age

**Question:** When the phrase states none of a price limit, a category, or an age, what should the shop show?

**Answer:** No products.

**Consequence:** "Red colored toy" with no price, category, or age shows no products. It does not fall back to the full list or to an English-name match.

Confirmed by the user on 2026-09-23.

## Q5 — How close a category mention must be

**Question:** When the phrase names a category, how close must it be to the stored theme name?

**Answer:** B. A distinctive part is enough. "Ninjago" matches "Lego Ninjago."

Confirmed by the user on 2026-09-23.

## Q6 — How an age in the phrase matches stored age text

**Question:** When the phrase gives an age, which products should match? Stored ages are text such as "12+" or "6–12".

**Answer:** B. A number in the phrase must fall inside the stored range. "8" matches "6–12". "12" matches both "6–12" and "12+".

Confirmed by the user on 2026-09-23.

## Q7 — Several limits in one phrase

**Question:** When one phrase states more than one of a price limit, a category, and an age, which products should be shown?

**Answer:** A. Only products that satisfy every one of them.

Confirmed by the user on 2026-09-23.

## Q8 — Phrase matches more than one theme

**Question:** When a distinctive part matches more than one stored theme, such as "Lego" matching Lego Ninjago, Lego City, Lego Nexo Knight, and Lego Chima, what should the shop show?

**Answer:** A. Products in every matching theme.

Confirmed by the user on 2026-09-23.

## Q9 — Does the stated price count

**Question:** Is a product at exactly $50 included in "under $50"?

**Answer:** Yes. $50 counts.

Confirmed by the user on 2026-09-23.

## Q10 — Show the interpreted limits

**Question:** Does the shop show the interpreted limits, or only the products?

**Answer:** Show the interpreted limits. They remain visible when no products match.

Confirmed by the user on 2026-09-23.


