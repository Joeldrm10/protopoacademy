export const AUTUMN_EDITION = "outono-2026";
export const SUMMER_EDITION = "verao-2026";
export const AUTUMN = {
  name: "Footcamp Outono 2026",
  dates: "16 a 20 de novembro de 2026",
  hours: "09h00 às 12h30",
  week: "1 SEMANA — 16 a 20 de novembro de 2026",
  base: 80,
  insurance: 10,
  siblingRate: 0.10,
};

export function autumnPrice(newInsurance: boolean, validatedSiblings = false) {
  const base = AUTUMN.base;
  const insurance = newInsurance ? AUTUMN.insurance : 0;
  const subtotal = base + insurance;
  // O desconto de irmãos incide sobre o valor total da inscrição, incluindo o seguro.
  const discount = validatedSiblings ? Math.round(subtotal * AUTUMN.siblingRate * 100) / 100 : 0;
  return { base, insurance, discount, total: subtotal - discount };
}

export function editionOf(record: { edicao?: string | null }) {
  return record.edicao || SUMMER_EDITION;
}

export type FinancialRecord = {
  edicao?: string | null; estado: string; valor_total: number | null;
  seguro_valor?: number | null; desconto_irmaos?: boolean | null;
  seguro_existente_declarado?: boolean | null; seguro_validado?: boolean | null;
  preco_base?: number | null; desconto_valor?: number | null;
};

export function hasValidatedCoverage(record: Pick<FinancialRecord, "seguro_existente_declarado" | "seguro_validado">) {
  return record.seguro_existente_declarado === true && record.seguro_validado === true;
}

export function autumnFinancialDetail(record: FinancialRecord) {
  const base = record.preco_base ?? AUTUMN.base;
  const insurance = record.seguro_valor ?? AUTUMN.insurance;
  const discount = record.desconto_valor ?? 0;
  const total = record.valor_total;
  return { base, insurance, discount, total, consistent: total === Math.round((base + insurance - discount) * 100) / 100 };
}

export function autumnFinancialUpdate(record: FinancialRecord, reciprocalSiblings: boolean) {
  const price = autumnPrice(!hasValidatedCoverage(record), record.desconto_irmaos === true && reciprocalSiblings);
  return { preco_base: price.base, seguro_valor: price.insurance, desconto_valor: price.discount,
    desconto_percentagem: price.discount > 0 ? AUTUMN.siblingRate * 100 : 0, valor_total: price.total };
}

export function autumnKitIncluded(record: { participou_anterior?: boolean | null; kit_elegivel?: boolean | null }) {
  return record.kit_elegivel ?? record.participou_anterior !== true;
}

export function autumnInsuranceLabel(record: FinancialRecord & { participou_anterior?: boolean | null }) {
  if (hasValidatedCoverage(record)) return "0€ — Cobertura confirmada";
  if (record.participou_anterior && !record.seguro_validado) return "Por confirmar";
  return "10€";
}

export function effectiveBookingValue(record: FinancialRecord, validated: boolean) {
  if (record.valor_total == null) return null;
  // Preserve the existing summer display calculation, never use autumn rates.
  if (editionOf(record) !== AUTUMN_EDITION) {
    return record.desconto_irmaos && validated
      ? Math.round(record.valor_total * 0.85 * 100) / 100
      : record.valor_total;
  }
  // Admin totals always read the saved snapshot; recalculation is an explicit action.
  return record.valor_total;
}