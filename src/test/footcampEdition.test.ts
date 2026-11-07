import { describe, it, expect } from "vitest";
import { AUTUMN, autumnPrice, autumnFinancialDetail, autumnFinancialUpdate, autumnInsuranceLabel, autumnKitIncluded, editionOf, effectiveBookingValue } from "@/lib/footcampEdition";

describe("Outono 2026 rules", () => {
  it("runs 16–20 November, 09h00–12h30", () => {
    expect(AUTUMN.dates).toBe("16 a 20 de novembro de 2026");
    expect(AUTUMN.hours).toBe("09h00 às 12h30");
  });
  it("costs 80 with existing insurance", () => expect(autumnPrice(false).total).toBe(80));
  it("adds 10 only for a new policy", () => expect(autumnPrice(true).total).toBe(90));
  it("does not give free insurance for unconfirmed prior attendance", () => {
    expect(autumnFinancialUpdate({edicao:"outono-2026",estado:"pendente",valor_total:80,seguro_valor:0,seguro_existente_declarado:true,seguro_validado:false},false).valor_total).toBe(90);
  });
  it("charges 80 only for confirmed existing annual coverage", () => {
    expect(effectiveBookingValue({edicao:"outono-2026",estado:"pendente",valor_total:80,seguro_valor:0,seguro_existente_declarado:true,seguro_validado:true},false)).toBe(80);
  });
  it("charges validated siblings 81 with new insurance and 72 with valid existing coverage", () => {
    const record = {edicao:"outono-2026",estado:"pendente",valor_total:90,desconto_irmaos:true,seguro_existente_declarado:true};
    expect(autumnFinancialUpdate({...record,seguro_validado:false},true).valor_total).toBe(81);
    expect(autumnFinancialUpdate({...record,seguro_validado:true},true).valor_total).toBe(72);
  });
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
  it.each([[true,false,80,0],[true,true,72,8],[false,false,90,0],[false,true,81,9]])("saves consistent total for coverage %s and siblings %s", (coverage, siblings, total, discount) => {
    const record = {edicao:"outono-2026",estado:"pendente",valor_total:90,desconto_irmaos:siblings,seguro_existente_declarado:coverage,seguro_validado:coverage};
    const saved = {...record, ...autumnFinancialUpdate(record, siblings)};
    expect(saved.valor_total).toBe(total);
    expect(saved.desconto_valor).toBe(discount);
    expect(autumnFinancialDetail(saved).consistent).toBe(true);
    expect(effectiveBookingValue(saved,siblings)).toBe(total);
  });
  it("does not change the stored pending total just because a family is identified", () => {
    expect(effectiveBookingValue({edicao:"outono-2026",estado:"pendente",valor_total:80,desconto_irmaos:true},true)).toBe(80);
  });
  it("requires both a discount request and reciprocal eligibility", () => {
    const record = {estado:"pendente",valor_total:90,desconto_irmaos:false};
    expect(autumnFinancialUpdate(record,true).desconto_valor).toBe(0);
    expect(autumnFinancialUpdate({...record,desconto_irmaos:true},false).desconto_valor).toBe(0);
  });
  it("detects inconsistent saved breakdowns without rewriting them", () => {
    const record = {estado:"confirmado",valor_total:72,preco_base:80,seguro_valor:0,desconto_valor:0};
    expect(autumnFinancialDetail(record).consistent).toBe(false);
    expect(record.valor_total).toBe(72);
    expect(record.desconto_valor).toBe(0);
  });
  it("includes kits only for new athletes unless explicitly overridden", () => {
    expect(autumnKitIncluded({participou_anterior:true,kit_elegivel:null})).toBe(false);
    expect(autumnKitIncluded({participou_anterior:false,kit_elegivel:null})).toBe(true);
    expect(autumnKitIncluded({participou_anterior:true,kit_elegivel:true})).toBe(true);
  });
  it("keeps prior coverage pending until checked and distinguishes a new policy", () => {
    const record = {estado:"pendente",valor_total:90,participou_anterior:true,seguro_validado:false};
    expect(autumnInsuranceLabel(record)).toBe("Por confirmar");
    expect(autumnInsuranceLabel({...record,seguro_validado:true,seguro_existente_declarado:true})).toBe("0€ — Cobertura confirmada");
    expect(autumnInsuranceLabel({...record,seguro_validado:true,seguro_existente_declarado:false})).toBe("10€");
  });
});