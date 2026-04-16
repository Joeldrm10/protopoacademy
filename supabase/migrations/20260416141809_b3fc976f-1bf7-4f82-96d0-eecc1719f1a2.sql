
-- Drop all existing policies
DROP POLICY IF EXISTS "Qualquer pessoa pode atualizar marcações" ON public.marcacoes;
DROP POLICY IF EXISTS "Qualquer pessoa pode criar marcação" ON public.marcacoes;
DROP POLICY IF EXISTS "Qualquer pessoa pode eliminar marcações" ON public.marcacoes;
DROP POLICY IF EXISTS "Qualquer pessoa pode ler marcações" ON public.marcacoes;

-- Allow anyone to insert (public booking form)
CREATE POLICY "Anyone can create a booking"
ON public.marcacoes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Authenticated users can read bookings"
ON public.marcacoes
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update bookings"
ON public.marcacoes
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete bookings"
ON public.marcacoes
FOR DELETE
TO authenticated
USING (true);
