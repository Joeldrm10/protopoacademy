CREATE POLICY "Qualquer pessoa pode eliminar marcações"
ON public.marcacoes
FOR DELETE
USING (true);