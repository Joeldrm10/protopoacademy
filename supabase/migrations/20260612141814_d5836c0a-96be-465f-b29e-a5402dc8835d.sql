
-- Roles infrastructure
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Seed existing admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('4f207bad-d715-4db8-8ecd-1257e370a112', 'admin')
ON CONFLICT DO NOTHING;

-- Restrict marcacoes to admin-only (keep public INSERT)
DROP POLICY IF EXISTS "Authenticated users can read bookings" ON public.marcacoes;
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON public.marcacoes;
DROP POLICY IF EXISTS "Authenticated users can delete bookings" ON public.marcacoes;

CREATE POLICY "Admins can read bookings"
  ON public.marcacoes FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update bookings"
  ON public.marcacoes FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete bookings"
  ON public.marcacoes FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
