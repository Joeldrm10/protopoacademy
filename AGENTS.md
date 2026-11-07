# Architecture rules
- Reuse the existing Footcamp form and Admin; edition-specific rules live in a shared configuration to keep calculations consistent.
- Treat records without an edition as summer legacy data; never recompute them under autumn rules.
- Store autumn financial snapshots and validate existing coverage and kit eligibility through protected Admin updates.