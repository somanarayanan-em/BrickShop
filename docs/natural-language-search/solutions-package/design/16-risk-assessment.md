# Risk assessment

| ID | Risk | Response in this design |
|---|---|---|
| RSK-001 | No language step exists today. | Add the in-process step. |
| RSK-002 | "Red colored toy" shows no products. | Accepted. Parser returns no bounds. |
| RSK-003 | Discounted price is not the limit. | SQL uses `p_price_en` only. |
| RSK-007 | A hosted model would send the phrase off-prem. | Model cache is local. No request to Hugging Face. |

RSK-004 and RSK-005 stay accepted product behavior and are not redesigned.
