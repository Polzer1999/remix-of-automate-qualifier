import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const QUALIFICATION_SYSTEM_PROMPT = `Tu es un assistant expert en qualification de leads pour Parrit AI, une entreprise spécialisée dans l'automatisation et l'intelligence artificielle.

TON RÔLE:
- Qualifier le besoin du prospect de manière conversationnelle et naturelle
- Poser des questions pertinentes une à une (PAS TOUTES EN MÊME TEMPS)
- Être professionnel mais chaleureux
- Résumer et confirmer les informations avant de conclure

PARCOURS DE QUALIFICATION:

1. ACCUEIL & TYPE DE BESOIN
   Commence par souhaiter la bienvenue et demande quel est leur besoin principal:
   - Acculturation (formation, sensibilisation à l'IA)
   - Automatisation (optimisation de processus)

2. SI ACCULTURATION:
   - Type de formation: Formation COMEX, Formation opérationnelle, Ateliers pratiques, ou autre?
   - Public cible et nombre de participants estimé
   - Objectifs spécifiques

3. SI AUTOMATISATION:
   - Quel type de tâche souhaitent-ils automatiser? (laisse-les décrire librement)
   - Temps passé par semaine sur cette tâche
   - Nombre d'ETP mobilisés
   - Impact attendu de l'automatisation

4. QUALIFICATION ENTREPRISE:
   - Nom de l'entreprise
   - Secteur d'activité
   - Taille de l'entreprise (nombre d'employés)

5. QUALIFICATION CONTACT:
   - Nom et prénom
   - Fonction/rôle dans l'entreprise
   - Email professionnel
   - Est-il/elle décisionnaire ou partie prenante du projet?
   - Fait-il/elle partie d'une équipe projet?

6. CONTEXTE:
   - Connaît-il/elle déjà le processus à améliorer/automatiser?
   - Délai envisagé pour le projet
   - Budget estimé (optionnel)

RÈGLES IMPORTANTES:
- Pose UNE question à la fois
- Adapte tes questions selon les réponses précédentes
- Reste conversationnel et naturel
- Ne demande pas toutes les informations d'un coup
- Reformule et confirme les informations importantes
- À la fin, résume ce qui a été discuté avant de conclure

QUAND QUALIFIER LE LEAD:
Le lead est considéré comme qualifié quand tu as au minimum:
- Type de besoin (acculturation ou automatisation)
- Détails du besoin selon le type
- Nom de l'entreprise
- Nom et prénom du contact
- Email professionnel
- Rôle du contact (décisionnaire ou non)

Une fois qualifié, remercie chaleureusement et indique qu'un expert Parrit AI les contactera rapidement.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversationId, sessionId, message } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get or create conversation
    let convId = conversationId;
    if (!convId) {
      const { data: newConv, error: convError } = await supabase
        .from('lead_conversations')
        .insert({ session_id: sessionId })
        .select()
        .single();
      
      if (convError) throw convError;
      convId = newConv.id;
    }

    // Store user message
    await supabase.from('chat_messages').insert({
      conversation_id: convId,
      role: 'user',
      content: message
    });

    // Get conversation history
    const { data: messages, error: msgError } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true });

    if (msgError) throw msgError;

    // Prepare messages for AI
    const aiMessages = [
      { role: 'system', content: QUALIFICATION_SYSTEM_PROMPT },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ];

    // Call Lovable AI with streaming
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: aiMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Trop de requêtes, réessayez dans un instant.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Service temporairement indisponible.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error('AI gateway error');
    }

    // Store assistant response in background
    let fullResponse = '';
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    // Create a transform stream to capture and store the response
    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = decoder.decode(chunk, { stream: true });
        controller.enqueue(chunk);
        
        // Parse SSE and extract content
        const lines = text.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const jsonStr = line.slice(6);
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullResponse += content;
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      },
      async flush() {
        // Store the complete assistant message
        if (fullResponse) {
          await supabase.from('chat_messages').insert({
            conversation_id: convId,
            role: 'assistant',
            content: fullResponse
          });

          // Update conversation with qualification data if detected
          // Simple heuristic: if we have email, consider it qualified
          if (fullResponse.toLowerCase().includes('@') || messages.length > 8) {
            await supabase
              .from('lead_conversations')
              .update({ 
                is_qualified: true,
                qualification_data: { messages: messages.length, timestamp: new Date().toISOString() }
              })
              .eq('id', convId);
          }
        }
      }
    });

    return new Response(response.body?.pipeThrough(transformStream), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/event-stream',
        'X-Conversation-Id': convId 
      },
    });

  } catch (error) {
    console.error('Error in chat-qualification:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});