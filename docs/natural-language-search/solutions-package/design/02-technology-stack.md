# Technology stack

Pinned to versions already in this repo, plus one new library. Do not use a floating "latest".

| Component | Pin | Role |
|---|---|---|
| Node image | `node:18-alpine` | Runtime. Already in the Dockerfile. |
| Express | `4.22.1` | HTTP. `package.json` declares `^4.22.1`. |
| EJS | `3.1.10` | Search page. |
| mysql2 | `3.16.2` | SQL. |
| MySQL | `8.0` | Compose service `db`. |
| `@huggingface/transformers` | `4.3.0` | Local model runtime. Resolved from npm on 2026-09-23. |
| Model | `Xenova/flan-t5-small` | Local text-to-text model. Cached on the app image or volume. |

No new database engine. No hosted inference SDK.
