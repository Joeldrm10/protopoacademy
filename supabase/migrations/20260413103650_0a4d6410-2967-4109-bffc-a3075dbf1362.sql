
CREATE TABLE public.marcacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  idade TEXT NOT NULL,
  telemovel TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('individual', 'grupo')),
  data DATE NOT NULL,
  hora TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.marcacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer pessoa pode criar marcação"
  ON public.marcacoes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Apenas service role pode ler marcações"
  ON public.marcacoes
  FOR SELECT
  TO authenticated
  USING (false);
