# Test plan

Feature: `natural-language-search`. Requirements 0.4. Design 0.1. Planning conditions from the conditional go apply. DEC-014: a between-pair or hyphen pair is price unless the phrase says age or years old.

## Strategy

Unit tests prove the parser and the age overlap. They do not open MySQL and they do not load model weights. The search handler is covered by those pure functions plus a small filter test that pages after the age check. No browser suite. The model rewrite is not asserted.

## Coverage

| Layer | Target | Exception |
|---|---|---|
| Unit | Every parser case in the design testing strategy, plus the planning defaults for reversed between, the age word, decimals, blank stored age, and a trimmed blank phrase | Model output |
| Integration | None | No test database in this repo |
| End to end | None | Human gate on the search page |

## Regression

`npm test` currently exits 1. There is no suite to re-run. After INC-001, `npm test` must exit 0. Later increments must keep that command green.

## Fixtures

Rows live in the test file: list price, discount, theme, and `p_age` of `6-12`, `12+`, or blank. No seed SQL.

## Isolation

Call `lib/phrase-limits.js` directly. Pass a fake rewriter in the model test. Do not call Hugging Face.

## Commands

- `npm test`
- `node --test test/phrase-limits.test.js`

Both must exit 0. The package script is `node --test`.
