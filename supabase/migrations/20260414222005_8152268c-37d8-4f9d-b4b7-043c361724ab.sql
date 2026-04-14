
DROP POLICY "Apenas service role pode ler marcações" ON public.marcacoes;

CREATE POLICY "Qualquer pessoa pode ler marcações"
ON public.marcacoes
FOR SELECT
USING (true);
