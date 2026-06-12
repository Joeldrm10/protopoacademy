
-- 1. user_roles: explicit admin-only mutation policies
CREATE POLICY "Admins can insert user roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update user roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete user roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. testemunhos: restrict update/delete to admins
DROP POLICY IF EXISTS "Authenticated users can delete testemunhos" ON public.testemunhos;
DROP POLICY IF EXISTS "Authenticated users can update testemunhos" ON public.testemunhos;
DROP POLICY IF EXISTS "Authenticated users can read all testemunhos" ON public.testemunhos;

CREATE POLICY "Admins can read all testemunhos"
  ON public.testemunhos FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testemunhos"
  ON public.testemunhos FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testemunhos"
  ON public.testemunhos FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Tighten SECURITY DEFINER function exposure
REVOKE EXECUTE ON FUNCTION public.sync_testemunho_aprovado() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
