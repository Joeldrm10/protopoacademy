-- Add estado column to support 3 states: pendente, aprovado, rejeitado
ALTER TABLE public.testemunhos
ADD COLUMN IF NOT EXISTS estado text NOT NULL DEFAULT 'pendente';

-- Backfill from existing aprovado boolean
UPDATE public.testemunhos
SET estado = CASE WHEN aprovado = true THEN 'aprovado' ELSE 'pendente' END;

-- Add check constraint for valid states
ALTER TABLE public.testemunhos
DROP CONSTRAINT IF EXISTS testemunhos_estado_check;

ALTER TABLE public.testemunhos
ADD CONSTRAINT testemunhos_estado_check
CHECK (estado IN ('pendente', 'aprovado', 'rejeitado'));

-- Keep aprovado in sync with estado via trigger (so public RLS keeps working)
CREATE OR REPLACE FUNCTION public.sync_testemunho_aprovado()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.aprovado := (NEW.estado = 'aprovado');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_testemunho_aprovado ON public.testemunhos;
CREATE TRIGGER trg_sync_testemunho_aprovado
BEFORE INSERT OR UPDATE ON public.testemunhos
FOR EACH ROW EXECUTE FUNCTION public.sync_testemunho_aprovado();