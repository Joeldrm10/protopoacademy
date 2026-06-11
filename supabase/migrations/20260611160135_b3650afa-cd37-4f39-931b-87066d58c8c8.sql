ALTER TABLE public.marcacoes DROP CONSTRAINT IF EXISTS marcacoes_tipo_check;
ALTER TABLE public.marcacoes ADD CONSTRAINT marcacoes_tipo_check CHECK (tipo IN ('individual','grupo','footcamp'));