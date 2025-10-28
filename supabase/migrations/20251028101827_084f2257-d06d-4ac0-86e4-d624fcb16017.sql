-- Create table for n8n webhook configurations
CREATE TABLE IF NOT EXISTS public.n8n_webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  webhook_url TEXT NOT NULL,
  trigger_event TEXT NOT NULL, -- 'conversation_qualified', 'blueprint_generated', 'meeting_scheduled'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.n8n_webhooks ENABLE ROW LEVEL SECURITY;

-- Create policies (public read for edge function, no client access for security)
CREATE POLICY "Service role can manage webhooks"
  ON public.n8n_webhooks
  FOR ALL
  USING (auth.role() = 'service_role');

-- Add trigger for updated_at
CREATE TRIGGER update_n8n_webhooks_updated_at
  BEFORE UPDATE ON public.n8n_webhooks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default webhook configurations (will be configured later)
INSERT INTO public.n8n_webhooks (name, webhook_url, trigger_event) VALUES
  ('Email Notification', '', 'conversation_qualified'),
  ('Blueprint Generated', '', 'blueprint_generated'),
  ('Meeting Scheduled', '', 'meeting_scheduled')
ON CONFLICT DO NOTHING;