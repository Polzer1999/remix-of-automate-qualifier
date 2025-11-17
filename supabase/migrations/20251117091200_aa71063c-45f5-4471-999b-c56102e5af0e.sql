-- Politique RLS pour permettre au service role de gérer les leads Parrita
CREATE POLICY "Service role can manage parrita_leads"
ON public.parrita_leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);