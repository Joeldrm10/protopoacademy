# Architecture rules
- Reuse the existing Footcamp form and Admin; edition-specific rules live in a shared configuration to keep calculations consistent.
- Treat records without an edition as summer legacy data; preserve their stored amounts and existing legacy display calculations.
- Store autumn financial snapshots and validate existing coverage and kit eligibility through protected Admin updates.
- All autumn Admin totals and breakdowns read saved snapshots; explicit validation/recalculation writes every financial field together, preventing display-only discounts and preserving history.
- Treat unverified coverage as paid insurance in new autumn registrations and pending calculations; only protected validation can make it free, without rewriting historical snapshots.
- Preserve conditional kit sizes when hidden; register once before handing off to WhatsApp and retain a retry link without re-inserting because opening WhatsApp cannot prove message delivery.
- Direct Footcamp form anchors bypass only the form entrance animation and align using the measured header offset; stop late-load repositioning on visitor interaction to preserve filling and manual scrolling.