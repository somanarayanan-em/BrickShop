# Codebase analysis

Feature: `natural-language-search`. Planning, 2026-09-23. Brownfield. One-pass, full structure.

The shop is one Node 18 process. Search is `GET /search` in `index.js`. The page is `views/search.ejs`. There is no test runner and no language-step module.

## Boundary

In scope:

- `index.js` handler at `app.get('/search'…)` (about lines 1557–1635)
- `views/search.ejs` product section
- new `lib/phrase-limits.js`
- `package.json` scripts and dependencies
- `Dockerfile` model cache

Out of scope: cart, login, product detail, comments, header magnifying glass, category form dropping the keyword, schema, Compose services.

## Handler today

`auth_user` (`index.js` lines 75–80) sets `userLogin` to `{ userID: -1 }` when the session has no user, then calls `next()`. It does not redirect. `cartMiddleware` still runs.

Query fields: `keyword` defaults to `''`, `category` to `'all'`, `sortBy` to `'price-asc'`, `page` via `parseInt` or 1. Page size is 20. Offset is `(page - 1) * 20`.

The count query is `SELECT COUNT(*) AS total FROM product WHERE p_name_en LIKE ?` with `` `%${keyword}%` ``. The product query selects `discounted_price` as `p_price_en * (1 - (p_discount / 100))`, filters `p_name_en LIKE ?`, adds `p_category = ?` only when category is not `all`, orders by `discounted_price` ASC or DESC, then appends `` LIMIT ${limit} OFFSET ${offset} ``. `limit` and `offset` are numbers from code, not raw query text. Category and keyword are bound.

`res.render('search', …)` passes `products`, `keyword`, `categories`, `category`, `sortBy`, `currentPage`, `totalPages`. There is no limits object.

The count callback treats `resultCount` as a row object (`resultCount.total`). The `mysql2` callback passes an array of rows. The empty-search path must keep that behavior. The phrase path must count the age-filtered set itself.

## Page today

`views/search.ejs` line 119 escapes the keyword with `<%= keyword %>`. The category form (lines 124–135) does not send `keyword`. An empty product list renders `No products available` (line 163). Pagination links include `keyword`, `category`, and `sortBy`.

## Data

`product.p_age` is `varchar(255)`. Dump values seen are `12+` and `6-12`. List prices are decimals such as `9.99` and `19.99`. Themes include `Lego Ninjago` and `Sario`. No color column.

## Patterns to follow

- Callback `conn.query(sql, params, …)`, not a new data layer.
- Bound parameters for shopper text and numbers.
- Errors: `console.error`, then `res.status(500).send("Database query error")`.
- EJS `<%= %>` for shopper text.
- One file, `index.js`, wires routes. New logic goes in `lib/phrase-limits.js` so the handler stays a caller.

## Dependencies

`package.json`: Express `^4.22.1`, EJS `^3.1.10`, mysql2 `^3.16.2`, Node image `node:18-alpine`. `npm test` prints an error and exits 1. No `@huggingface/transformers`. `Dockerfile` runs `npm install --production` then `node index.js`. No model cache.

## Divergence

The phrase path stops using `p_name_en LIKE` for the typed words. It still uses discounted-price sort. Age filtering happens in the process, before `LIMIT`. The model is optional and must not be required for `npm test`.
