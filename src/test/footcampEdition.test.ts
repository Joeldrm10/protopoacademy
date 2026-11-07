import { describe, it, expect } from "vitest";
import { AUTUMN, autumnPrice, editionOf, effectiveBookingValue } from "@/lib/footcampEdition";

describe("Outono 2026 rules", () => {
  it("runs 16–20 November, 09h00–12h30", () => {
    expect(AUTUMN.dates).toBe("16 a 20 de novembro de 2026");
    expect(AUTUMN.hours).toBe("09h00 às 12h30");
  });
  it("costs 80 with existing insurance", () => expect(autumnPrice(false).total).toBe(80));
  it("adds 10 only for a new policy", () => expect(autumnPrice(true).total).toBe(90));
  it("discounts the total inscription value by 10%, including insurance", () => {
    expect(autumnPrice(true, true)).toEqual({ base: 80, insurance: 10, discount: 9, total: 81 });
    expect(autumnPrice(false, true)).toEqual({ base: 80, insurance: 0, discount: 8, total: 72 });
  });
  it("does not apply unvalidated sibling requests", () => {
    expect(effectiveBookingValue({edicao:"outono-2026",estado:"pendente",valor_total:90,seguro_valor:10,desconto_irmaos:true},false)).toBe(90);
  });
  it("keeps historical summer pricing under its existing rules", () => {
    expect(editionOf({edicao:null})).toBe("verao-2026");
    const legacy = {edicao:null,estado:"confirmado",valor_total:270,desconto_irmaos:true};
    expect(effectiveBookingValue(legacy,true)).toBe(229.5);
    expect(legacy.valor_total).toBe(270);
    expect(effectiveBookingValue(legacy,false)).toBe(270);
  });
  it("keeps confirmed autumn financial snapshots unchanged", () => {
    expect(effectiveBookingValue({edicao:"outono-2026",estado:"confirmado",valor_total:82,seguro_valor:10,desconto_irmaos:true},false)).toBe(82);
  });
});