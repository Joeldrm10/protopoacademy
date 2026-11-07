# Architecture rules
- Reuse the existing Footcamp form and Admin; edition-specific rules live in a shared configuration to keep calculations consistent.
- Treat records without an edition as summer legacy data; preserve their stored amounts and existing legacy display calculations.
- Store autumn financial snapshots and validate existing coverage and kit eligibility through protected Admin updates.
- Treat unverified coverage as paid insurance in new autumn registrations and pending calculations; only protected validation can make it free, without rewriting historical snapshots.
- Preserve conditional kit sizes when hidden; register once before handing off to WhatsApp and retain a retry link without re-inserting because opening WhatsApp cannot prove message delivery.