-- Banco da loja SIBIONICS: checkout Pix, painel /admin e integrações.
-- Cole tudo no editor de SQL do Lovable Cloud (ou do Supabase) e rode uma vez.
-- Pode rodar de novo sem problema: só cria o que ainda não existe.

-- 1) Eventos do funil (visitas, cliques, etapas do checkout)
CREATE TABLE IF NOT EXISTS public.funnel_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  path TEXT,
  bundle_id TEXT,
  bundle_name TEXT,
  value NUMERIC,
  referrer TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_funnel_events_created_at ON public.funnel_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_funnel_events_session ON public.funnel_events (session_id);
CREATE INDEX IF NOT EXISTS idx_funnel_events_type ON public.funnel_events (event_type);
GRANT INSERT ON public.funnel_events TO anon, authenticated;
GRANT ALL ON public.funnel_events TO service_role;
ALTER TABLE public.funnel_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert events" ON public.funnel_events;
CREATE POLICY "Anyone can insert events" ON public.funnel_events
  FOR INSERT TO anon, authenticated WITH CHECK (true);
ALTER TABLE public.funnel_events REPLICA IDENTITY FULL;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime')
     AND NOT EXISTS (
       SELECT 1 FROM pg_publication_tables
       WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'funnel_events'
     ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.funnel_events;
  END IF;
END $$;

-- 2) Configurações públicas da loja (preços do painel, botão de WhatsApp)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
CREATE POLICY "Public can read site settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.site_settings (key, value) VALUES ('whatsapp_enabled', 'true'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 3) Configurações privadas (chaves dos gateways, UTMify, Meta, Pushcut, nome no gateway).
--    Sem acesso público: só o servidor lê.
CREATE TABLE IF NOT EXISTS public.private_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.private_settings TO service_role;
ALTER TABLE public.private_settings ENABLE ROW LEVEL SECURITY;

-- 4) Pedidos Pix (sem acesso público: só o servidor lê e grava)
CREATE TABLE IF NOT EXISTS public.pix_orders (
  id text PRIMARY KEY,
  status text NOT NULL DEFAULT 'waiting_payment',
  amount_cents integer NOT NULL,
  customer jsonb NOT NULL,
  bundle_id text NOT NULL,
  bundle_name text NOT NULL,
  utm jsonb,
  fbp text,
  fbc text,
  ip text,
  ua text,
  url text,
  paid_reported_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.pix_orders ADD COLUMN IF NOT EXISTS report_result jsonb;
GRANT ALL ON public.pix_orders TO service_role;
ALTER TABLE public.pix_orders ENABLE ROW LEVEL SECURITY;
