# Autumn Footcamp
- [ ] Corrigir consistência financeira, seguro, kit e período no Admin; testar quatro totais sem alterar históricos nem publicar.
- [x] Adapt public autumn information and open registration using existing pages.
- [x] Adapt existing form, pricing, insurance and WhatsApp summary.
- [x] Separate editions in Admin and preserve historic values.
- [x] Verify calculations, registration and Admin on desktop/mobile; eight unit tests passed, three real submissions read back and test-only records removed, legacy 91-record fingerprint unchanged.
- Existing document/export/email generation was not found in this project; no replacement system was added.

# Correções e simplificações Outono 2026
- [x] Formulário: escolha exclusiva "já participou" vs "primeira vez (+10€ seguro)"; checkbox de seguro removida; atleta anterior fica sinalizado para validação no Admin.
- [x] Kit: textos de elegibilidade removidos; texto único "oferecido a quem se inscreve pela primeira vez"; sem T-shirt casual.
- [x] Seguro: textos novos e consistentes; resumo mostra "Seguro anual: 10€" ou "0€ — Já incluído".
- [x] Matemática verificada (90/80/72/82) no formulário, WhatsApp e base de dados; testes unitários passam.
- [x] Balneários com água quente garantidos; "Acompanhamento técnico especializado" removido.
- [x] Testes: cenários no navegador, inscrição real (90€ na BD, registo de teste removido), 91 legados intactos, mobile sem overflow.

# Revisão final do formulário
- [x] Simplificar kit e horário; exigir tamanhos apenas para novos atletas e preservar valores ocultos.
- [x] Cobrar seguro provisoriamente até confirmação de cobertura válida no Admin; proteção aplicada apenas a novas inserções/atualizações, sem reescrever históricos.
- [x] Confirmar validações, consentimentos independentes e valores; 21 testes passaram. Reabrir WhatsApp não volta a inserir o pedido.
- [x] Verificar formulário em 1280/394px e Admin autenticado com leitura simulada do pedido; sem erros ou overflow. Não publicado.
- Limitação: envio/receção efetivos no WhatsApp e criação/leitura reais de nova inscrição não testados nesta revisão para não alterar os dados existentes; testes de envio usaram respostas simuladas. Uma re-submissão independente ainda pode criar outro pedido (não foi imposta unicidade por atleta).
