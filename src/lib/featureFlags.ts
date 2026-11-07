/**
 * Feature flags for temporarily enabling/disabling site sections.
 *
 * NOTE: Para reativar treinos individuais e de grupo no futuro,
 * basta colocar SHOW_INDIVIDUAL_GROUP_TRAININGS = true.
 * Todo o código continua presente — apenas oculto via esta flag.
 */
export const SHOW_INDIVIDUAL_GROUP_TRAININGS = false;

/**
 * Estado pós-evento: o Footcamp Verão 2026 terminou a 31 de julho de 2026.
 * Com esta flag a true:
 *  - o formulário de inscrição fica desativado (página /marcar mostra "Inscrições encerradas");
 *  - todos os CTAs de inscrição passam a "Quero saber da próxima edição" (WhatsApp);
 *  - textos de "Inscrições abertas" / "Vagas limitadas" passam a estado concluído.
 * Para abrir a próxima edição: colocar a false (nada é apagado).
 */
export const FOOTCAMP_ENCERRADO = false;
