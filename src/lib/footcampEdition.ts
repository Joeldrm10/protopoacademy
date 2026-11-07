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
};

export function hasValidatedCoverage(record: Pick<FinancialRecord, "seguro_existente_declarado" | "seguro_validado">) {
  return record.seguro_existente_declarado === true && record.seguro_validado === true;
}

export function effectiveBookingValue(record: FinancialRecord, validated: boolean) {
  if (record.valor_total == null) return null;
  // Preserve the existing summer display calculation, never use autumn rates.
  if (editionOf(record) !== AUTUMN_EDITION) {
    return record.desconto_irmaos && validated
      ? Math.round(record.valor_total * 0.85 * 100) / 100
      : record.valor_total;
  }
  if (record.estado === "confirmado") return record.valor_total;
  return autumnPrice(!hasValidatedCoverage(record), !!record.desconto_irmaos && validated).total;
}