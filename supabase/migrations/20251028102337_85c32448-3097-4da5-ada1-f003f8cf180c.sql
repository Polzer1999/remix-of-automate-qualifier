-- Fix Critical Security Issues

-- 1. Fix chat_messages: Remove public access, restrict to service role only
DROP POLICY IF EXISTS "Allow public select on chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Allow public insert on chat_messages" ON public.chat_messages;

CREATE POLICY "Service role can manage chat_messages"
ON public.chat_messages
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 2. Fix lead_conversations: Remove public update, restrict updates to service role
DROP POLICY IF EXISTS "Allow public update on lead_conversations" ON public.lead_conversations;
DROP POLICY IF EXISTS "Allow public select on lead_conversations" ON public.lead_conversations;
DROP POLICY IF EXISTS "Allow public insert on lead_conversations" ON public.lead_conversations;

CREATE POLICY "Service role can manage lead_conversations"
ON public.lead_conversations
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 3. Create rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(session_id)
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage rate_limits"
ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_session_id ON public.rate_limits(session_id);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window_start ON public.rate_limits(window_start);