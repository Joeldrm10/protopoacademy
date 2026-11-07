CREATE OR REPLACE FUNCTION public.guard_autumn_registration() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF NEW.edicao = 'outono-2026' AND TG_OP = 'INSERT' THEN
   NEW.preco_base := 80;
   NEW.desconto_percentagem := 10;
   NEW.desconto_valor := 0;
   NEW.seguro_validado := false;
   NEW.kit_elegivel := CASE WHEN COALESCE(NEW.participou_anterior,false) THEN NULL ELSE true END;
   NEW.seguro_valor := 10;
   NEW.seguro_anual := false;
   NEW.valor_total := 90;
   NEW.estado := 'pendente';
   NEW.confirmado := false;
   NEW.data := '2026-11-16';
   NEW.hora := '09:00–12:30';
   NEW.semanas := ARRAY['1 SEMANA — 16 a 20 de novembro de 2026'];
 END IF;
 RETURN NEW;
END; $$;
CREATE OR REPLACE FUNCTION public.require_valid_autumn_coverage() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF NEW.edicao = 'outono-2026' AND OLD.estado IS DISTINCT FROM 'confirmado'
    AND COALESCE(NEW.seguro_valor,10) = 0
    AND NOT (COALESCE(NEW.seguro_existente_declarado,false) AND COALESCE(NEW.seguro_validado,false)) THEN
   RAISE EXCEPTION 'A cobertura anual deve ser confirmada antes de atribuir seguro gratuito.';
 END IF;
 RETURN NEW;
END; $$;
CREATE TRIGGER require_valid_autumn_coverage BEFORE UPDATE ON public.marcacoes FOR EACH ROW EXECUTE FUNCTION public.require_valid_autumn_coverage();