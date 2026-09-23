# Solution overview

BrickShop search stays a page on the existing Express app. A shopper submits a phrase. A language step inside that app turns the phrase into a price bound, a theme fragment, and an age bound. The same request then filters the existing `product` table and renders `views/search.ejs` with the interpreted limits and the matching products.

The language step does not call Hugging Face at request time. A local model rewrites loose wording into the closed grammar. A parser in the app checks that grammar and applies `<=`, `>=`, and overlap. If the phrase yields nothing, the page shows no products and no limits.

Trace: FR1.1.1–FR1.1.8, architecture baseline, ADR-0001.
