import { describe, expect, it } from "vitest";
import ExcelJS from "exceljs";
import { buildMarcacoesExcel, DEFAULT_EXPORT_EDITION, deduplicateRecords, exportExcelFilename, selectAthletes } from "@/lib/marcacoesExcel";
import type { MarcacaoExportRow } from "@/lib/marcacoesExcel";

async function blobBuffer(blob: Blob) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}

function record(overrides: Partial<MarcacaoExportRow> = {}): MarcacaoExportRow {
  return {
    id: "inscricao-1", nome: "Atleta Teste", idade: "10", telemovel: "912345678",
    tipo: "footcamp", data: "2026-11-16", hora: "09:00", created_at: "2026-11-10T12:00:00Z",
    confirmado: false, estado: "pendente", semanas: ["16 a 20 de novembro"],
    seguro_anual: true, desconto_irmaos: false, observacoes: null, encarregado: "Encarregado Teste",
    valor_total: 90, nome_irmaos: null, autorizacao_imagem: false, restricao_alimentar: false,
    restricao_alimentar_desc: null, tamanho_tshirt: "10/12", tamanho_calcas: "10/12",
    data_nascimento: "2016-05-20", clube_atual: null, posicao: null, escalao: null,
    email_encarregado: "teste@example.com", emergencia_nome: null, emergencia_parentesco: null,
    emergencia_telemovel: null, tem_alergias: false, alergias_descricao: null,
    toma_medicacao: false, medicacao_descricao: null, informacao_medica: null,
    edicao: "outono-2026", participou_anterior: false, seguro_existente_declarado: false,
    seguro_validado: false, kit_elegivel: true, preco_base: 80, seguro_valor: 10,
    desconto_valor: 0, desconto_percentagem: 0, ...overrides,
  };
}

describe("exportação Excel de atletas", () => {
  it("seleciona Outono por defeito e usa os nomes de ficheiro pedidos", () => {
    expect(DEFAULT_EXPORT_EDITION).toBe("outono-2026");
    expect(exportExcelFilename()).toBe("ProTopo_Footcamp_Outono_2026.xlsx");
    expect(exportExcelFilename("verao-2026")).toBe("ProTopo_Footcamp_Verao_2026.xlsx");
    expect(exportExcelFilename("todos")).toBe("ProTopo_Todas_Edicoes.xlsx");
  });

  it("não inclui anteriores nem inscrições sem edição no Outono e preserva valores por inscrição", async () => {
    const rows = [
      record({ id: "verao", edicao: "verao-2026", valor_total: 170, confirmado: true }),
      record({ id: "outono", participou_anterior: true, valor_total: 72, confirmado: false }),
      record({ id: "legado", edicao: null, participou_anterior: true, valor_total: 105 }),
    ];
    expect(selectAthletes(rows, "outono-2026").map(r => r.id)).toEqual(["outono"]);
    expect(selectAthletes(rows, "verao-2026").map(r => r.id)).toEqual(["legado", "verao"]);
    expect(selectAthletes(rows, "todos")).toHaveLength(3);
    for (const [edition, total, paid] of [["outono-2026", 72, "Não"], ["verao-2026", 170, "Sim"]] as const) {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(await blobBuffer(await buildMarcacoesExcel(rows.filter(r => r.id !== "legado"), edition)));
      const sheet = workbook.getWorksheet("Atletas");
      if (!sheet) throw new Error("Folha Atletas ausente");
      expect(sheet.rowCount).toBe(2);
      expect(sheet.getCell("F2").value).toBe(total);
      expect(sheet.getCell("C2").value).toBe(paid);
    }
  });
  it("remove apenas IDs repetidos e mantém uma inscrição por edição", () => {
    const rows = [record(), record(), record({ id: "verao", edicao: null }), record({ id: "treino", tipo: "individual" })];
    expect(deduplicateRecords(rows)).toHaveLength(3);
    expect(selectAthletes(rows)).toHaveLength(2);
    expect(selectAthletes(rows, "outono-2026").map(r => r.id)).toEqual(["inscricao-1"]);
    expect(selectAthletes(rows, "verao-2026").map(r => r.id)).toEqual(["verao"]);
  });

  it("ordena alfabeticamente sem juntar atletas com o mesmo nome", () => {
    const rows = [record({ id: "z", nome: "Zé" }), record({ id: "a", nome: "Ana" }), record({ id: "b", nome: "Ana" })];
    expect(selectAthletes(rows).map(r => r.id)).toEqual(["a", "b", "z"]);
  });

  it("exporta os dez dados guardados sem recalcular preços ou descontos", async () => {
    const blob = await buildMarcacoesExcel([record({ confirmado: true, desconto_irmaos: true, valor_total: 81,
      autorizacao_imagem: true, restricao_alimentar: true, restricao_alimentar_desc: "Lactose" })]);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await blobBuffer(blob));
    expect(workbook.worksheets.map(s => s.name)).toEqual(["Atletas"]);
    const sheet = workbook.getWorksheet("Atletas");
    if (!sheet) throw new Error("Folha Atletas ausente");
    expect(sheet.getRow(2).values).toEqual([undefined, "Atleta Teste", "10", "Sim", "Encarregado Teste", "912345678", 81, "Sim", "Sim", "Lactose", "T-shirt: 10/12 · Calções: 10/12"]);
    expect(sheet.getCell("F2").numFmt).toBe('#,##0.00 "€"');
  });

  it("usa Não para pagamento ou imagem não confirmados, e Nenhuma sem restrições", async () => {
    const blob = await buildMarcacoesExcel([record({ tamanho_tshirt: null, tamanho_calcas: null } as Partial<MarcacaoExportRow>)]);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await blobBuffer(blob));
    const sheet = workbook.getWorksheet("Atletas");
    if (!sheet) throw new Error("Folha Atletas ausente");
    expect(sheet.getCell("C2").value).toBe("Não");
    expect(sheet.getCell("H2").value).toBe("Não");
    expect(sheet.getCell("I2").value).toBe("Nenhuma");
    expect(sheet.getCell("J2").value ?? "").toBe("");
  });

  it("preserva um valor desconhecido e sinaliza restrições sem descrição", async () => {
    const blob = await buildMarcacoesExcel([record({ valor_total: null, restricao_alimentar: true })]);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await blobBuffer(blob));
    const sheet = workbook.getWorksheet("Atletas");
    if (!sheet) throw new Error("Folha Atletas ausente");
    expect(sheet.getCell("F2").value).toBeNull();
    expect(sheet.getCell("I2").value).toBe("Restrição registada sem descrição");
  });

  it("permite exportar uma edição vazia", async () => {
    const blob = await buildMarcacoesExcel([record()], "verao-2026");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await blobBuffer(blob));
    const sheet = workbook.getWorksheet("Atletas");
    if (!sheet) throw new Error("Folha Atletas ausente");
    expect(sheet.rowCount).toBe(1);
    expect(sheet.getTable("TabelaAtletas")).toBeDefined();
  });
});
