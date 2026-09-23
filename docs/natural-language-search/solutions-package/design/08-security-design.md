# Security design

Search stays public. `auth_user` still does not require sign-in.

The phrase is a shopper's words. It is sent only to the in-process language step. The design does not call the Hugging Face hosted API, so the phrase does not leave the on-prem, single-region shop. Model weights are loaded from a local cache.

The SQL amounts and the theme fragment are bound parameters. The theme fragment is not concatenated into the statement.

Trace: RSK-007, project `deployment_model = on-prem`, `data_residency = single-region`, FR2.1.3.
