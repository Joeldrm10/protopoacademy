
-- Make data/hora nullable for footcamp inscriptions
ALTER TABLE public.marcacoes ALTER COLUMN data DROP NOT NULL;
ALTER TABLE public.marcacoes ALTER COLUMN hora DROP NOT NULL;

-- Add footcamp-specific columns
ALTER TABLE public.marcacoes ADD COLUMN IF NOT EXISTS semanas text[];
ALTER TABLE public.marcacoes ADD COLUMN IF NOT EXISTS seguro_anual boolean DEFAULT false;
ALTER TABLE public.marcacoes ADD COLUMN IF NOT EXISTS desconto_irmaos boolean DEFAULT false;
ALTER TABLE public.marcacoes ADD COLUMN IF NOT EXISTS observacoes text;
ALTER TABLE public.marcacoes ADD COLUMN IF NOT EXISTS encarregado text;
ALTER TABLE public.marcacoes ADD COLUMN IF NOT EXISTS estado text NOT NULL DEFAULT 'pendente';

-- Validate estado values
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'marcacoes_estado_check'
  ) THEN
    ALTER TABLE public.marcacoes
      ADD CONSTRAINT marcacoes_estado_check
      CHECK (estado IN ('pendente','contactado','confirmado','cancelado'));
  END IF;
END $$;

-- Backfill estado from confirmado for existing rows
UPDATE public.marcacoes SET estado = 'confirmado' WHERE confirmado = true AND estado = 'pendente';
