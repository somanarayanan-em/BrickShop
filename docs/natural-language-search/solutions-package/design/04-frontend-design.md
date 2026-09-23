# Frontend design

The search page stays `views/search.ejs`. No new route and no new screen.

Above the product grid, when the language step returned at least one bound, render a line of interpreted limits in shopper language, for example: theme Ninjago, English list price $10–$50, ages 5–12. When the list is empty, that line still shows. When the phrase yielded no bound, do not show the line, and keep the existing "No products available."

The header magnifying glass, the price-order control, and the category control stay as they are, including the category form dropping the typed phrase.

Trace: FR1.1.7, FR1.1.8, FR2.1.2.
