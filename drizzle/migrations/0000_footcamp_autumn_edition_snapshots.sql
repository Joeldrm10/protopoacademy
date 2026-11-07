ALTER TABLE public.marcacoes
 ADD COLUMN IF NOT EXISTS edicao text,
 ADD COLUMN IF NOT EXISTS participou_anterior boolean,
 ADD COLUMN IF NOT EXISTS seguro_existente_declarado boolean,
 ADD COLUMN IF NOT EXISTS seguro_validado boolean,
 ADD COLUMN IF NOT EXISTS kit_elegivel boolean,
 ADD COLUMN IF NOT EXISTS preco_base numeric,
 ADD COLUMN IF NOT EXISTS seguro_valor numeric,
 ADD COLUMN IF NOT EXISTS desconto_valor numeric,
 ADD COLUMN IF NOT EXISTS desconto_percentagem numeric;
COMMENT ON COLUMN public.marcacoes.edicao IS 'NULL identifies legacy summer records; autumn registrations explicitly store outono-2026.';
CREATE OR REPLACE FUNCTION public.guard_autumn_registration() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF NEW.edicao = 'outono-2026' THEN
  IF TG_OP = 'INSERT' THEN
   NEW.preco_base := 80;
   NEW.desconto_percentagem := 10;
   NEW.desconto_valor := 0;
   NEW.seguro_validado := false;
   NEW.kit_elegivel := CASE WHEN COALESCE(NEW.participou_anterior,false) THEN NULL ELSE true END;
   NEW.seguro_valor := CASE WHEN COALESCE(NEW.seguro_existente_declarado,false) THEN 0 ELSE 10 END;
   NEW.valor_total := NEW.preco_base + NEW.seguro_valor;
   NEW.estado := 'pendente';
   NEW.confirmado := false;
   NEW.data := '2026-11-16';
   NEW.hora := '09:00–12:30';
   NEW.semanas := ARRAY['1 SEMANA — 16 a 20 de novembro de 2026'];
  END IF;
 END IF;
 RETURN NEW;
END; $$;
CREATE TRIGGER guard_autumn_registration BEFORE INSERT ON public.marcacoes FOR EACH ROW EXECUTE FUNCTION public.guard_autumn_registration();