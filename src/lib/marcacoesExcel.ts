import ExcelJS from "exceljs";
import type { Tables } from "@/integrations/supabase/types";
import { AUTUMN_EDITION, SUMMER_EDITION, editionOf } from "@/lib/footcampEdition";

export type MarcacaoExportRow = Tables<"marcacoes">;
export type ExportEdition = "todos" | typeof AUTUMN_EDITION | typeof SUMMER_EDITION;
const EURO_FORMAT = '#,##0.00 "€"';
const cleanText = (value: string | null) => (value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
const yesNo = (value: boolean | null) => value === true ? "Sim" : "Não";

export function deduplicateRecords(records: MarcacaoExportRow[]) {
  return [...new Map(records.map((record) => [record.id, record])).values()];
}

export function selectAthletes(records: MarcacaoExportRow[], edition: ExportEdition = "todos") {
  return deduplicateRecords(records)
    .filter((record) => record.tipo === "footcamp" && (edition === "todos" || editionOf(record) === edition))
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" }) || a.id.localeCompare(b.id));
}

const columns = [
  { header: "Nome do atleta", value: (r: MarcacaoExportRow) => cleanText(r.nome) },
  { header: "Idade", value: (r: MarcacaoExportRow) => cleanText(r.idade) },
  { header: "Pago", value: (r: MarcacaoExportRow) => yesNo(r.confirmado) },
  { header: "Encarregado de educação", value: (r: MarcacaoExportRow) => cleanText(r.encarregado) },
  { header: "Número de telemóvel", value: (r: MarcacaoExportRow) => cleanText(r.telemovel) },
  { header: "Valor", value: (r: MarcacaoExportRow) => r.valor_total },
  { header: "Irmão", value: (r: MarcacaoExportRow) => yesNo(r.desconto_irmaos) },
  { header: "Fotos", value: (r: MarcacaoExportRow) => yesNo(r.autorizacao_imagem) },
  { header: "Intolerância", value: (r: MarcacaoExportRow) => cleanText(r.restricao_alimentar_desc).trim() || (r.restricao_alimentar ? "Restrição registada sem descrição" : "Nenhuma") },
  { header: "Tamanho da roupa", value: (r: MarcacaoExportRow) => [
    r.tamanho_tshirt ? `T-shirt: ${cleanText(r.tamanho_tshirt)}` : "",
    r.tamanho_calcas ? `Calções: ${cleanText(r.tamanho_calcas)}` : "",
  ].filter(Boolean).join(" · ") },
];

export async function buildMarcacoesExcel(records: MarcacaoExportRow[], edition: ExportEdition = "todos") {
  const athletes = selectAthletes(records, edition);
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ProTopo Academy";
  workbook.created = new Date();
  const sheet = workbook.addWorksheet("Atletas", { views: [{ state: "frozen", ySplit: 1 }] });
  const rows = athletes.map((record) => columns.map((column) => column.value(record)));
  sheet.addTable({
    name: "TabelaAtletas", ref: "A1", headerRow: true, totalsRow: false,
    style: { theme: null, showRowStripes: false },
    columns: columns.map((column) => ({ name: column.header, filterButton: true })),
    rows,
  });
  columns.forEach((column, index) => {
    const excelColumn = sheet.getColumn(index + 1);
    const contentWidth = rows.reduce((width, row) => Math.max(width, String(row[index] ?? "").length), column.header.length);
    excelColumn.width = Math.min(Math.max(contentWidth + 3, 12), 65);
    excelColumn.font = { name: "Arial", size: 11 };
    excelColumn.alignment = { vertical: "top", wrapText: true };
    if (column.header === "Valor") excelColumn.numFmt = EURO_FORMAT;
  });
  sheet.getRow(1).height = 32;
  sheet.getRow(1).font = { name: "Arial", size: 11, bold: true, color: { argb: "FF111111" } };
  sheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF2C230" } };
  sheet.getRow(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}

export function exportExcelFilename(date = new Date(), edition: ExportEdition = "todos") {
  return `ProTopo_Atletas_${edition === "todos" ? "Todas_Edicoes" : edition}_${date.toISOString().slice(0, 10)}.xlsx`;
}
