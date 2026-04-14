ALTER TABLE public.marcacoes ADD COLUMN confirmado boolean NOT NULL DEFAULT false;

CREATE POLICY "Qualquer pessoa pode atualizar marcações"
ON public.marcacoes
FOR UPDATE
USING (true)
WITH CHECK (true);