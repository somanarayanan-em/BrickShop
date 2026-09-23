# Natural language search — requirements

Feature: `natural-language-search`. BrickShop. Combined requirements document, version 0.4, 2026-09-23.

This document states what the search change must do. Which model reads the phrase is decided in the solution phase (DEC-010, DEC-002).

## Overview

The user needs search to be augmented so a typed phrase becomes a structured search and the shop shows the matching products. The aim is a smoother customer experience. Today, typed words match the English product name only. After this change, a phrase on the existing search page is read for three stored facts: an English list-price cap, a theme, and an age. Words that are none of those are dropped. If the phrase states none of the three, the shop shows no products.

## 1. Executive summary and business context

### 1.1 Executive summary

BrickShop shoppers can already open search and match products by English name. This change adds a second reading of a typed phrase: the shop turns it into a price cap, a theme, and an age, then lists only the products that satisfy every limit the phrase stated. The shopper does not sign in. The search page, paging, and product pages stay as they are.

### 1.2 Current state

Search is public. A magnifying glass in the header opens it. With no words, the page lists products 20 at a time, cheapest first, using the discounted English price for that order. Typed words match the English name only. A separate price order and a separate category control exist, and changing either one drops the typed words. No matches shows "No products available."

### 1.3 Pain points

| # | Pain point | Impact | Affected person |
|---|---|---|---|
| 1 | A phrase such as "Ninjago under $50 for age 8" is treated as name words, not as a price, a theme, and an age. | The shopper does not get the list those limits describe. | The user |

### 1.4 Business drivers

The user needs this so the customer experience is smooth. Trace: change description.

## 2. Business objectives and success criteria

**Objective.** A typed phrase on search becomes a structured search over the English list price, the theme, and the age, and the shop shows the products that match.

**Success, for behavior already decided.**

- "Ninjago between $10 and $50 for ages 5-12" returns only products whose English list price is from 10 through 50, whose theme matches Ninjago, and whose stored age range overlaps 5 through 12. The page shows those interpreted limits.
- "Under $50" includes a list price of 50.00 and excludes 50.01. "Over $50" includes 50.00.
- "Red colored toy" returns no products.
- Opening search with no phrase still shows the full list, cheapest first.

## 3. Functional requirements

### FR1. Phrase search

**FR1.1.1.** When the user submits a phrase on the search page, the system shall read it for a price bound, a theme fragment, and an age bound, and shall drop every word that is none of those. A price bound is a lower limit, an upper limit, or both. An age bound is one age or an age range. Trace: DEC-002, DEC-013, elicitation Q1 and Q3.

**FR1.1.2.** When the phrase yields none of those three, the system shall show no products. It shall not fall back to the full list or to an English-name match. Trace: elicitation Q4.

**FR1.1.3.** When the phrase yields one or more of those three, the system shall show only products that satisfy every yielded limit. Trace: elicitation Q7.

**FR1.1.4.** The system shall treat a distinctive part of a stored theme name as a match, and shall include products from every theme that part matches. Trace: elicitation Q5 and Q8.

**FR1.1.5.** When the phrase gives one age, the system shall keep a product only when that age falls inside the stored age text. "age 8" and "8 years old" match "6–12". "age 12" and "12 years old" match both "6–12" and "12+". The system shall treat a number as an age only when the phrase says age or years old. When the phrase gives an age range that way, such as "ages 5-12" or "between 5 and 12 years old", the system shall keep a product only when that range overlaps the stored age text. Both ends count. A between-pair or a hyphen pair with neither of those words is a price bound. Trace: elicitation Q6, DEC-013, DEC-014.

**FR1.1.6.** A price limit shall use the English price before the discount, not the Vietnamese price and not the discounted amount. "Under 50" means list price `<= 50`. "Over 50" means list price `>= 50`. "Between 10 and 50" means list price `>= 10` and `<= 50`. Both ends count. Trace: elicitation Q2, DEC-011, DEC-013.

**FR1.1.7.** The system shall show matching products on the current results list, 20 at a time. Trace: future process, DEC-006.

**FR1.1.8.** When the phrase yields one or more limits, the system shall show those interpreted limits on the search page along with the product list, including when that list has no products. When the phrase yields none, there are no limits to show. Trace: DEC-011.

### FR2. Behavior that stays

**FR2.1.1.** When the user opens search and submits no phrase, the system shall keep today's list: products 20 at a time, cheapest first. Trace: DEC-006, Journey B.

**FR2.1.2.** The system shall keep the separate price-order and category controls, including dropping the typed phrase when either control changes. Trace: DEC-002, Journey C, RSK-005.

**FR2.1.3.** The system shall keep opening search from the header without signing in, paging, and opening a product from the list. Trace: change scope, must-not-touch.

## 4. Business rules

| Rule ID | Rule | Applies to | Enforcement |
|---|---|---|---|
| BR1.1 | Only a price bound, a theme fragment, and an age bound narrow the list. All other words are dropped. | Phrase submit | Before the product list is built |
| BR1.2 | Price uses the English list price. Under N is `<= N`. Over N is `>= N`. Between A and B is `>= A` and `<= B`. | Phrase with a price | Before the product list is built |
| BR1.3 | A theme fragment matches a stored theme name when that name contains the fragment. Every matching theme is included. | Phrase with a theme | Before the product list is built |
| BR1.4 | One age matches when it falls inside the stored age text. An age range matches when it overlaps that text. "12+" means that age and older. "6–12" means ages 6 through 12 inclusive. Both ends of a phrase range count. | Phrase with an age | Before the product list is built |
| BR1.5 | Every limit the phrase yielded must hold. | Phrase with two or more limits | Before the product list is built |
| BR1.6 | No yielded limit means no products. | Phrase with none of the three | Before the product list is built |

| Calculation | Formula | Inputs | Output | Example |
|---|---|---|---|---|
| Price bound | Under N: `p_price_en <= N`. Over N: `p_price_en >= N`. Between A and B: `p_price_en >= A` and `p_price_en <= B` | English list price, phrase amounts | Keep or drop | 50.00 matches "under $50" and "over $50". 10 through 50 matches "between $10 and $50" |
| Age overlap | One age is inside the stored range, or the phrase range shares any age with the stored range | Phrase age, stored age text | Keep or drop | Phrase 5–12 overlaps stored 6–12. It also overlaps 12+ at 12 |

No new error message is required. An empty result uses the page's existing "No products available."

## 5. User journeys

### Journey A — find products by a phrase

1. The user opens search from the header. No sign-in.
2. The page shows the search box, the price order, the category list, and a product grid.
3. The user types a phrase. The shop reads it for an English list-price cap, a theme, and an age. Other words are dropped.
4. If none of the three is present, the user sees no products. If one or more are present, the user sees those interpreted limits and only products that satisfy every one of them. An empty product list still shows the limits.
5. The user opens a product, or sees that no products are available.

### Journey B — open search without typing

Unchanged. The full list, cheapest first, 20 at a time.

### Journey C — separate price-order or category control

Unchanged, including dropping the typed phrase.

## 6. Assumptions, constraints, and out of scope

### Assumptions

| ID | Item | Status |
|---|---|---|
| ASM-001 | A product at exactly $50 is included in "under $50" | Closed. Decided. See FR1.1.6. |
| ASM-002 | Price and age phrases may be an upper bound, a lower bound, or a between-range. Ends count. | Closed on 2026-09-23. See FR1.1.5 and FR1.1.6. |
| ASM-003 | The shop shows the interpreted limits | Closed. Decided. See FR1.1.8. |

### Constraints

None beyond the rules in section 4. The language-step engine is not a constraint.

### Out of scope

- Search with no phrase, other than keeping today's list.
- The separate price-order and category controls.
- Color, descriptions, and leftover words matched against the product name.
- The Vietnamese price and the discounted price as the limit.
- A new screen, new stored facts, or a change to who can search.
- Which model reads the phrase, and whether it runs on the shop's machine or on a hosted service.

### Must not touch

Opening search from the header without signing in. Paging. Opening a product. Comments. The cart.

## 7. Acceptance criteria

| AC | Criterion | Related FR |
|---|---|---|
| AC1 | Given the search page, when the user submits "Ninjago between $10 and $50 for ages 5-12", then the page shows those interpreted limits, and the list contains only products whose English list price is from 10 through 50, whose theme matches Ninjago, and whose stored age range overlaps 5 through 12. | FR1.1.3, FR1.1.4, FR1.1.5, FR1.1.6, FR1.1.8 |
| AC10 | Given a product at list price 50.00, when the user submits "over $50", then that product is included. A product at 49.99 is excluded. | FR1.1.6 |
| AC11 | Given stored age "6–12", when the user submits "ages 5-12", then that product is included. Given stored age "12+" and the same phrase, the product is included because the ranges share 12. | FR1.1.5 |
| AC2 | Given a product listed at 9.99 with a discount, when the user submits "under $50", then that product is eligible on the 9.99 list price. | FR1.1.6, BR1.2 |
| AC8 | Given a product whose English list price is 50.00, when the user submits "under $50", then that product is included. | FR1.1.6 |
| AC9 | Given a phrase that yields limits and no matching products, when the results appear, then the interpreted limits are shown and no products are listed. | FR1.1.8 |
| AC3 | Given the search page, when the user submits "red colored toy", then no products are shown. | FR1.1.2, BR1.6 |
| AC4 | Given themes "Lego Ninjago" and "Lego City", when the user submits "Lego under $50", then products from both themes are eligible if their English list price is under 50. | FR1.1.4 |
| AC5 | Given stored ages "6–12" and "12+", when the user submits "age 12", then both are eligible. When the user submits "age 8", only "6–12" is eligible. | FR1.1.5 |
| AC6 | Given search opened with no phrase, when the page loads, then today's full list is shown, 20 at a time, cheapest first. | FR2.1.1 |
| AC7 | Given a phrase already submitted, when the user changes the separate category or price-order control, then today's behavior remains, including dropping the phrase. | FR2.1.2 |

ASM-002 is closed. Upper, lower, and between-ranges are required for price and for age.

## 8. Glossary

| Term | Meaning |
|---|---|
| Phrase | The words the user types on the search page and submits. |
| English list price | The English price before discount. |
| Theme | The stored category name, such as "Lego Ninjago". |
| Language step | The part that turns a phrase into a price cap, a theme fragment, and an age. The solution phase chooses how it is built. |

## 9. Traceability

| Item | Source |
|---|---|
| FR1.1.1–FR1.1.8, BR1.1–BR1.6, AC1–AC5, AC8, AC9 | Elicitation Q1–Q8, DEC-002, DEC-006, DEC-007, DEC-011 |
| FR2.1.1–FR2.1.3, AC6–AC7 | Change scope, DEC-002, DEC-006 |
| ASM-001, ASM-003 | Closed by DEC-011 |
| ASM-002 | Closed by DEC-013. Under, over, and between are required. |
| Engine unnamed | DEC-002, baseline "Deferred to the solution phase" |
| RSK-001–RSK-007 | Risk register |

## 10. Change log

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-09-23 | Initial requirements for natural-language search. |
| 0.2 | 2026-09-23 | A product at exactly $50 is included in "under $50." The page shows the interpreted limits. |
| 0.2 | 2026-09-23 | User reviewed the package and accepted it. |
| 0.3 | 2026-09-23 | Price and age accept under, over, and between. Range ends count. Stored ages match by overlap. |
| 0.4 | 2026-09-23 | A between-pair or hyphen pair is a price bound unless the phrase says age or years old. |

## Sections not in this document

| Block | Status | Reason |
|---|---|---|
| Stakeholders | N/A | Same shopper. No new role. |
| Functional specifications | N/A | The behavior is in the functional requirements. |
| Views | N/A | Same search page. |
| Data requirements | N/A | No new stored facts. |
| Permissions | N/A | Search stays open without signing in. |
| Non-functional requirements | N/A | None agreed. |
| API, database, and security design | N/A | No API, schema, or trust-boundary change. |
| Solution architecture, testing strategy, and planning | Skip | Solution phase. |
