CREATE TABLE public.testemunhos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  idade TEXT,
  experiencia TEXT NOT NULL,
  avaliacao INTEGER NOT NULL CHECK (avaliacao >= 1 AND avaliacao <= 5),
  aprovado BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testemunhos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a testemunho"
ON public.testemunhos
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can read approved testemunhos"
ON public.testemunhos
FOR SELECT
TO anon, authenticated
USING (aprovado = true);

CREATE POLICY "Authenticated users can read all testemunhos"
ON public.testemunhos
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update testemunhos"
ON public.testemunhos
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testemunhos"
ON public.testemunhos
FOR DELETE
TO authenticated
USING (true);

CREATE INDEX idx_testemunhos_aprovado ON public.testemunhos(aprovado, created_at DESC);