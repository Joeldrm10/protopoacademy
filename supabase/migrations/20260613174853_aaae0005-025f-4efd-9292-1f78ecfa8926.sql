ALTER TABLE public.marcacoes
  ADD COLUMN IF NOT EXISTS data_nascimento date,
  ADD COLUMN IF NOT EXISTS clube_atual text,
  ADD COLUMN IF NOT EXISTS posicao text,
  ADD COLUMN IF NOT EXISTS escalao text,
  ADD COLUMN IF NOT EXISTS email_encarregado text,
  ADD COLUMN IF NOT EXISTS emergencia_nome text,
  ADD COLUMN IF NOT EXISTS emergencia_parentesco text,
  ADD COLUMN IF NOT EXISTS emergencia_telemovel text,
  ADD COLUMN IF NOT EXISTS tem_alergias boolean,
  ADD COLUMN IF NOT EXISTS alergias_descricao text,
  ADD COLUMN IF NOT EXISTS toma_medicacao boolean,
  ADD COLUMN IF NOT EXISTS medicacao_descricao text,
  ADD COLUMN IF NOT EXISTS informacao_medica text;