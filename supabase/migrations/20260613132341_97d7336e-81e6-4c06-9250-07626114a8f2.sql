ALTER TABLE public.marcacoes
  ADD COLUMN IF NOT EXISTS autorizacao_imagem boolean,
  ADD COLUMN IF NOT EXISTS restricao_alimentar boolean,
  ADD COLUMN IF NOT EXISTS restricao_alimentar_desc text;