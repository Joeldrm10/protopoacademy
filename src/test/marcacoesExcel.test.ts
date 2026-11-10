import { describe, expect, it } from "vitest";
import ExcelJS from "exceljs";
import { buildMarcacoesExcel, deduplicateRecords, partitionRecords } from "@/lib/marcacoesExcel";
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

describe("exportação Excel de marcações", () => {
  it("não duplica IDs e separa inscrições Footcamp das restantes marcações", () => {
    const rows = [
      record(), record(), record({ id: "inscricao-2", estado: "confirmado", confirmado: true }),
      record({ id: "marcacao-1", tipo: "individual", valor_total: null }),
    ];
    expect(deduplicateRecords(rows)).toHaveLength(3);
    const parts = partitionRecords(rows);
    expect(parts.inscricoes.map((r) => r.id)).toEqual(["inscricao-1", "inscricao-2"]);
    expect(parts.marcacoes.map((r) => r.id)).toEqual(["marcacao-1"]);
  });

  it("cria as quatro folhas com todos os registos, filtros, cabeçalho fixo e formatos", async () => {
    const rows = [
      record(), record({ id: "inscricao-2", estado: "confirmado", confirmado: true, valor_total: 81, desconto_valor: 9, desconto_percentagem: 10 }),
      record({ id: "marcacao-1", tipo: "grupo", edicao: null, data: "2026-08-01", valor_total: null }),
    ];
    const blob = await buildMarcacoesExcel(rows);
    expect(blob.type).toBe("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await blobBuffer(blob));

    expect(workbook.worksheets.map((sheet) => sheet.name)).toEqual([
      "Resumo Geral", "Inscrições", "Marcações", "Pagamentos e Valores",
    ]);
    const inscricoes = workbook.getWorksheet("Inscrições")!;
    const marcacoes = workbook.getWorksheet("Marcações")!;
    expect(inscricoes.rowCount).toBe(3);
    expect(marcacoes.rowCount).toBe(2);
    expect(inscricoes.views[0]).toMatchObject({ state: "frozen", ySplit: 1 });
    expect(inscricoes.getTable("TabelaInscricoes")).toBeDefined();
    expect(inscricoes.getCell("D2").numFmt).toBe("dd/mm/yyyy");
    expect(inscricoes.getCell("D2").value).toBeInstanceOf(Date);
    expect(inscricoes.getCell("AR2").numFmt).toBe('#,##0.00 "€"');
    expect(inscricoes.getCell("AR2").value).toBe(90);
    expect(marcacoes.getCell("L2").value).toBe("Footcamp Verão 2026");
  });

  it("usa fórmulas para os totais e mantém os resultados de pagamento coerentes", async () => {
    const blob = await buildMarcacoesExcel([
      record(),
      record({ id: "inscricao-2", estado: "confirmado", confirmado: true, valor_total: 81 }),
      record({ id: "inscricao-3", estado: "cancelado", valor_total: 72 }),
    ]);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await blobBuffer(blob));
    const resumo = workbook.getWorksheet("Resumo Geral")!;
    const indicators = new Map<string, number>();
    resumo.eachRow((row, index) => {
      if (index === 1) return;
      const value = row.getCell(2).value;
      const result = value && typeof value === "object" && "result" in value ? value.result : value;
      indicators.set(String(row.getCell(1).value), Number(result));
    });
    expect(indicators.get("Total de inscrições")).toBe(3);
    console.log("Resumo sem marcações:", resumo.getCell("B3").value);
    expect(indicators.get("Total de marcações")).toBe(0);
    expect(indicators.get("Inscrições pendentes")).toBe(1);
    expect(indicators.get("Inscrições confirmadas")).toBe(1);
    expect(indicators.get("Inscrições canceladas")).toBe(1);
    expect(resumo.getCell("B2").value).toMatchObject({ formula: expect.stringContaining("COUNTA"), result: 3 });

    const financial = workbook.getWorksheet("Pagamentos e Valores")!;
    expect(financial.getCell("R2").value).toMatchObject({ result: 0 });
    expect(financial.getCell("S2").value).toMatchObject({ result: 90 });
    expect(financial.getCell("R3").value).toMatchObject({ result: 81 });
    expect(financial.getCell("S3").value).toMatchObject({ result: 0 });
  });

  it("cria folhas válidas mesmo sem marcações fora do Footcamp", async () => {
    const blob = await buildMarcacoesExcel([record()]);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await blobBuffer(blob));
    const sheet = workbook.getWorksheet("Marcações")!;
    expect(sheet.rowCount).toBe(1);
    expect(sheet.autoFilter).toBe("A1:AR1");
    expect(sheet.getCell("A1").value).toBe("ID");
  });
});
