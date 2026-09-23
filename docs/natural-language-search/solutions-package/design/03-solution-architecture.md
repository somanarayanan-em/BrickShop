# Solution architecture

```mermaid
C4Container
  title Search after this change
  Person(shopper, "Shopper")
  Container(web, "Express app", "Node 18, Express 4.22.1", "GET /search")
  Container(lang, "Language step", "@huggingface/transformers 4.3.0 + parser", "In-process. Returns price, theme, age.")
  ContainerDb(db, "MySQL", "8.0", "product")
  Rel(shopper, web, "GET /search?keyword=", "HTTP")
  Rel(web, lang, "Phrase in, bounds out")
  Rel(web, db, "Filtered SELECT", "mysql2 3.16.2")
```

`GET /search` keeps its route. When `keyword` is empty, the handler keeps today's query. When `keyword` is present, it calls the language step, then queries MySQL with the price and theme bounds, then drops rows whose stored age does not overlap, then renders the page.

The model and the parser live in the Express process. There is no second service.

Trace: architecture baseline, FR2.1.1, ADR-0001.
