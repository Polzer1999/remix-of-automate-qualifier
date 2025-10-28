-- Create table for lead conversations
CREATE TABLE public.lead_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  is_qualified BOOLEAN DEFAULT false,
  qualification_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for chat messages
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.lead_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.lead_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (no auth required for lead generation)
CREATE POLICY "Allow public insert on lead_conversations"
  ON public.lead_conversations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public select on lead_conversations"
  ON public.lead_conversations
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public update on lead_conversations"
  ON public.lead_conversations
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow public insert on chat_messages"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public select on chat_messages"
  ON public.chat_messages
  FOR SELECT
  USING (true);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_lead_conversations_updated_at
  BEFORE UPDATE ON public.lead_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_lead_conversations_session_id ON public.lead_conversations(session_id);
CREATE INDEX idx_chat_messages_conversation_id ON public.chat_messages(conversation_id);
CREATE INDEX idx_lead_conversations_created_at ON public.lead_conversations(created_at DESC);