import ExcelJS from "exceljs";
import type { Tables } from "@/integrations/supabase/types";
import { AUTUMN_EDITION, editionOf } from "@/lib/footcampEdition";

export type MarcacaoExportRow = Tables<"marcacoes">;
type CellValue = string | number | Date | null;
type ColumnDefinition<T> = { header: string; value: (record: T) => CellValue };

const EURO_FORMAT = '#,##0.00 "€"';
const DATE_FORMAT = "dd/mm/yyyy";
const DATETIME_FORMAT = "dd/mm/yyyy hh:mm";
const CURRENCY_HEADERS = new Set([
  "Participação guardada (€)", "Seguro guardado (€)", "Desconto guardado (€)",
  "Total guardado (€)", "Valor pago (€)", "Valor em falta (€)",
]);

const cleanText = (value: string) => value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
const yesNo = (value: boolean | null) => value == null ? "" : value ? "Sim" : "Não";
const text = (value: string | null) => value == null ? "" : cleanText(value);

function dateOnly(value: string | null) {
  if (!value) return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function dateTime(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function editionLabel(record: MarcacaoExportRow) {
  return editionOf(record) === AUTUMN_EDITION ? "Footcamp Outono 2026" : "Footcamp Verão 2026";
}

function typeLabel(tipo: string) {
  if (tipo === "footcamp") return "Footcamp";
  if (tipo === "individual") return "Treino Individual";
  if (tipo === "grupo") return "Treino de Grupo";
  return cleanText(tipo);
}

export function deduplicateRecords(records: MarcacaoExportRow[]) {
  return [...new Map(records.map((record) => [record.id, record])).values()];
}

export function partitionRecords(records: MarcacaoExportRow[]) {
  const unique = deduplicateRecords(records);
  return {
    inscricoes: unique.filter((record) => record.tipo === "footcamp"),
    marcacoes: unique.filter((record) => record.tipo !== "footcamp"),
  };
}

const allColumns: ColumnDefinition<MarcacaoExportRow>[] = [
  { header: "ID", value: (r) => r.id },
  { header: "Nome do atleta", value: (r) => cleanText(r.nome) },
  { header: "Idade", value: (r) => cleanText(r.idade) },
  { header: "Data de nascimento", value: (r) => dateOnly(r.data_nascimento) },
  { header: "Telemóvel", value: (r) => cleanText(r.telemovel) },
  { header: "Email do encarregado", value: (r) => text(r.email_encarregado) },
  { header: "Encarregado de educação", value: (r) => text(r.encarregado) },
  { header: "Contacto de emergência", value: (r) => text(r.emergencia_nome) },
  { header: "Parentesco de emergência", value: (r) => text(r.emergencia_parentesco) },
  { header: "Telemóvel de emergência", value: (r) => text(r.emergencia_telemovel) },
  { header: "Tipo de atividade", value: (r) => typeLabel(r.tipo) },
  { header: "Edição", value: editionLabel },
  { header: "Data", value: (r) => dateOnly(r.data) },
  { header: "Hora", value: (r) => text(r.hora) },
  { header: "Período / Semanas", value: (r) => (r.semanas || []).map(cleanText).join(" | ") },
  { header: "Estado", value: (r) => cleanText(r.estado) },
  { header: "Pagamento confirmado", value: (r) => yesNo(r.confirmado) },
  { header: "Criado em", value: (r) => dateTime(r.created_at) },
  { header: "Clube atual", value: (r) => text(r.clube_atual) },
  { header: "Posição", value: (r) => text(r.posicao) },
  { header: "Escalão", value: (r) => text(r.escalao) },
  { header: "Seguro anual", value: (r) => yesNo(r.seguro_anual) },
  { header: "Seguro existente declarado", value: (r) => yesNo(r.seguro_existente_declarado) },
  { header: "Seguro validado", value: (r) => yesNo(r.seguro_validado) },
  { header: "Participou anteriormente", value: (r) => yesNo(r.participou_anterior) },
  { header: "Kit elegível", value: (r) => yesNo(r.kit_elegivel) },
  { header: "Tamanho da T-shirt", value: (r) => text(r.tamanho_tshirt) },
  { header: "Tamanho dos calções", value: (r) => text(r.tamanho_calcas) },
  { header: "Desconto de irmãos solicitado", value: (r) => yesNo(r.desconto_irmaos) },
  { header: "Nome do(s) irmão(s)", value: (r) => text(r.nome_irmaos) },
  { header: "Desconto guardado (%)", value: (r) => r.desconto_percentagem },
  { header: "Autorização de imagem", value: (r) => yesNo(r.autorizacao_imagem) },
  { header: "Restrição alimentar", value: (r) => yesNo(r.restricao_alimentar) },
  { header: "Descrição da restrição alimentar", value: (r) => text(r.restricao_alimentar_desc) },
  { header: "Tem alergias", value: (r) => yesNo(r.tem_alergias) },
  { header: "Descrição das alergias", value: (r) => text(r.alergias_descricao) },
  { header: "Toma medicação", value: (r) => yesNo(r.toma_medicacao) },
  { header: "Descrição da medicação", value: (r) => text(r.medicacao_descricao) },
  { header: "Informação médica", value: (r) => text(r.informacao_medica) },
  { header: "Observações", value: (r) => text(r.observacoes) },
  { header: "Participação guardada (€)", value: (r) => r.preco_base },
  { header: "Seguro guardado (€)", value: (r) => r.seguro_valor },
  { header: "Desconto guardado (€)", value: (r) => r.desconto_valor },
  { header: "Total guardado (€)", value: (r) => r.valor_total },
];

const financialColumns: ColumnDefinition<MarcacaoExportRow>[] = [
  { header: "ID", value: (r) => r.id },
  { header: "Nome do atleta", value: (r) => cleanText(r.nome) },
  { header: "Edição", value: editionLabel },
  { header: "Tipo de atividade", value: (r) => typeLabel(r.tipo) },
  { header: "Estado", value: (r) => cleanText(r.estado) },
  { header: "Pagamento confirmado", value: (r) => yesNo(r.confirmado) },
  { header: "Criado em", value: (r) => dateTime(r.created_at) },
  { header: "Participação guardada (€)", value: (r) => r.preco_base },
  { header: "Seguro anual", value: (r) => yesNo(r.seguro_anual) },
  { header: "Seguro existente declarado", value: (r) => yesNo(r.seguro_existente_declarado) },
  { header: "Seguro validado", value: (r) => yesNo(r.seguro_validado) },
  { header: "Seguro guardado (€)", value: (r) => r.seguro_valor },
  { header: "Desconto de irmãos solicitado", value: (r) => yesNo(r.desconto_irmaos) },
  { header: "Nome do(s) irmão(s)", value: (r) => text(r.nome_irmaos) },
  { header: "Desconto guardado (%)", value: (r) => r.desconto_percentagem },
  { header: "Desconto guardado (€)", value: (r) => r.desconto_valor },
  { header: "Total guardado (€)", value: (r) => r.valor_total },
  { header: "Valor pago (€)", value: (r) => r.valor_total == null ? null : r.confirmado ? r.valor_total : 0 },
  { header: "Valor em falta (€)", value: (r) => r.valor_total == null ? null : r.confirmado ? 0 : r.valor_total },
];

function columnLetter(column: number) {
  let letters = "";
  let current = column;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    letters = String.fromCharCode(65 + remainder) + letters;
    current = Math.floor((current - 1) / 26);
  }
  return letters;
}

function displayLength(value: CellValue) {
  if (value == null) return 0;
  if (value instanceof Date) return 16;
  return Math.max(...String(value).split("\n").map((line) => line.length), 0);
}

function addDataSheet<T>(
  workbook: ExcelJS.Workbook,
  name: string,
  tableName: string,
  records: T[],
  columns: ColumnDefinition<T>[],
) {
  const sheet = workbook.addWorksheet(name, { views: [{ state: "frozen", ySplit: 1 }] });
  const rows = records.map((record) => columns.map((column) => column.value(record)));

  if (records.length > 0) {
    sheet.addTable({
      name: tableName,
      ref: "A1",
      headerRow: true,
      totalsRow: false,
      style: { theme: "TableStyleMedium2", showRowStripes: true },
      columns: columns.map((column) => ({ name: column.header })),
      rows,
    });
  } else {
    sheet.addRow(columns.map((column) => column.header));
    sheet.autoFilter = { from: "A1", to: `${columnLetter(columns.length)}1` };
  }

  sheet.getRow(1).height = 32;
  sheet.getRow(1).font = { name: "Arial", size: 11, bold: true, color: { argb: "FF111111" } };
  sheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF2C230" } };
  sheet.getRow(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

  columns.forEach((column, index) => {
    const excelColumn = sheet.getColumn(index + 1);
    const contentWidth = Math.max(column.header.length, ...rows.map((row) => displayLength(row[index])));
    excelColumn.width = Math.min(Math.max(contentWidth + 3, 12), 50);
    if (CURRENCY_HEADERS.has(column.header)) excelColumn.numFmt = EURO_FORMAT;
    if (column.header === "Data" || column.header === "Data de nascimento") excelColumn.numFmt = DATE_FORMAT;
    if (column.header === "Criado em") excelColumn.numFmt = DATETIME_FORMAT;
    if (column.header === "Desconto guardado (%)") excelColumn.numFmt = '0.0"%"';
    excelColumn.alignment = { vertical: "top", wrapText: true };
    excelColumn.font = { name: "Arial", size: 10 };
  });
  sheet.getRow(1).font = { name: "Arial", size: 11, bold: true, color: { argb: "FF111111" } };
  return sheet;
}

const STATE_LABELS: Record<string, string> = {
  pendente: "pendentes",
  contactado: "contactadas",
  confirmado: "confirmadas",
  cancelado: "canceladas",
};

function stateLabel(state: string) {
  return STATE_LABELS[state] || state;
}

function addSummarySheet(
  workbook: ExcelJS.Workbook,
  inscricoes: MarcacaoExportRow[],
  marcacoes: MarcacaoExportRow[],
) {
  const states = [...new Set([
    "pendente", "contactado", "confirmado", "cancelado",
    ...inscricoes.map((r) => r.estado), ...marcacoes.map((r) => r.estado),
  ])];
  const summary = [
    { indicador: "Total de inscrições", valor: inscricoes.length, formula: "inscricoes-total" },
    { indicador: "Total de marcações", valor: marcacoes.length, formula: "marcacoes-total" },
    ...states.map((estado) => ({
      indicador: `Inscrições ${stateLabel(estado)}`,
      valor: inscricoes.filter((r) => r.estado === estado).length,
      formula: `inscricoes:${estado}`,
    })),
    ...states.map((estado) => ({
      indicador: `Marcações ${stateLabel(estado)}`,
      valor: marcacoes.filter((r) => r.estado === estado).length,
      formula: `marcacoes:${estado}`,
    })),
  ];
  const sheet = addDataSheet(workbook, "Resumo Geral", "TabelaResumoGeral", summary, [
    { header: "Indicador", value: (r: (typeof summary)[number]) => r.indicador },
    { header: "Valor", value: (r: (typeof summary)[number]) => r.valor },
  ]);

  const inscriptionEnd = Math.max(2, inscricoes.length + 1);
  const bookingEnd = Math.max(2, marcacoes.length + 1);
  const stateIndex = allColumns.findIndex((column) => column.header === "Estado") + 1;
  const stateLetter = columnLetter(stateIndex);
  const formulas: Record<string, string> = {
    "inscricoes-total": `=COUNTA('Inscrições'!$A$2:$A$${inscriptionEnd})`,
    "marcacoes-total": `=COUNTA('Marcações'!$A$2:$A$${bookingEnd})`,
  };
  for (const estado of states) {
    formulas[`inscricoes:${estado}`] = `=COUNTIF('Inscrições'!$${stateLetter}$2:$${stateLetter}$${inscriptionEnd},"${estado.replace(/"/g, '""')}")`;
    formulas[`marcacoes:${estado}`] = `=COUNTIF('Marcações'!$${stateLetter}$2:$${stateLetter}$${bookingEnd},"${estado.replace(/"/g, '""')}")`;
  }
  summary.forEach((row, index) => {
    sheet.getCell(index + 2, 2).value = { formula: formulas[row.formula].slice(1), result: row.valor };
  });
}

function addPaymentFormulas(sheet: ExcelJS.Worksheet, records: MarcacaoExportRow[]) {
  const totalColumn = columnLetter(financialColumns.findIndex((column) => column.header === "Total guardado (€)") + 1);
  const confirmationColumn = columnLetter(financialColumns.findIndex((column) => column.header === "Pagamento confirmado") + 1);
  const paidIndex = financialColumns.findIndex((column) => column.header === "Valor pago (€)") + 1;
  const missingIndex = financialColumns.findIndex((column) => column.header === "Valor em falta (€)") + 1;
  const paidColumn = columnLetter(paidIndex);

  records.forEach((record, index) => {
    const row = index + 2;
    const paid = record.valor_total == null ? null : record.confirmado ? record.valor_total : 0;
    const missing = record.valor_total == null ? null : Math.round((record.valor_total - (paid || 0)) * 100) / 100;
    sheet.getCell(row, paidIndex).value = {
      formula: `IF(${totalColumn}${row}="","",IF(${confirmationColumn}${row}="Sim",${totalColumn}${row},0))`,
      result: paid ?? "",
    };
    sheet.getCell(row, missingIndex).value = {
      formula: `IF(${totalColumn}${row}="","",${totalColumn}${row}-${paidColumn}${row})`,
      result: missing ?? "",
    };
  });
}

export async function buildMarcacoesExcel(records: MarcacaoExportRow[]) {
  const unique = deduplicateRecords(records);
  const { inscricoes, marcacoes } = partitionRecords(unique);
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ProTopo Academy";
  workbook.lastModifiedBy = "ProTopo Academy";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.calcProperties.fullCalcOnLoad = true;

  addSummarySheet(workbook, inscricoes, marcacoes);
  addDataSheet(workbook, "Inscrições", "TabelaInscricoes", inscricoes, allColumns);
  addDataSheet(workbook, "Marcações", "TabelaMarcacoes", marcacoes, allColumns);
  const financialSheet = addDataSheet(workbook, "Pagamentos e Valores", "TabelaPagamentosValores", unique, financialColumns);
  addPaymentFormulas(financialSheet, unique);

  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

export function exportExcelFilename(date = new Date()) {
  return `ProTopo_Academy_Inscricoes_Marcacoes_${date.toISOString().slice(0, 10)}.xlsx`;
}
