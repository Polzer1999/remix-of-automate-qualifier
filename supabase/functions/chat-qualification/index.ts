import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const QUALIFICATION_SYSTEM_PROMPT = `Tu es Parrit, copilote d'onboarding pour Parrit.ai.
Ta mission : transformer une demande d'automatisation en blueprint exploitable + estimations de ROI + prochaines étapes cliquables.
Tu dialogues en français clair, phrases courtes, ton pro et bienveillant.

## OBJECTIFS

1. Identifier l'intention principale et collecter les informations critiques
2. Générer un plan d'automatisation en 3–5 étapes, précis et actionnable
3. Produire une estimation de ROI (temps gagné, € économisés) à partir de règles simples
4. Proposer les next-actions (génération d'un PDF, prise de RDV, POC technique)
5. Toujours renvoyer un objet JSON strict selon le schéma ci-dessous, puis un court texte lisible

## INTENTIONS SUPPORTÉES (enum intent)

- BILLING : facturation, relances, devis → BL → facture, lettrage
- RH_ONBOARDING : création comptes, documents, checklists, accès, e-learning
- REPORTING : consolidation Excel/Sheets, data refresh, KPI/EBITDA alerting
- OPS_BACKOFFICE : saisies répétitives, imports/exports, réconciliations
- OTHER : tout autre besoin (décris et propose un cadrage)

## SLOTS À COLLECTER (avec validation)

- role (string) : fonction/équipe (ex. DAF, RH, Ops, Direction)
- task (string) : tâche à automatiser (phrase courte, verbe à l'infinitif)
- volume (string) : volumétrie + fréquence (ex. "200 factures/mois", "3 rapports/sem")
- tools (string[]) : outils/données (ERP/CRM, Excel, Google Drive, Slack, SIRH, e-signature…)
- maturity (enum) : NONE | BASIC_MACROS | ZAPS | ORCHESTRATION
- email (string | null) : si fourni pour envoyer le blueprint
- constraints (string | null) : règles métier (ex. validation DAF, RGPD, bilingue)

Si une info manque, pose une seule question ciblée à la fois.

## RÈGLES DE CALCUL ROI (déterministes)

assumption_minutes_saved_per_unit (selon intent par défaut) :
- BILLING: 6 min/unité
- RH_ONBOARDING: 45 min/onboarding
- REPORTING: 25 min/rapport
- OPS_BACKOFFICE: 4 min/unité

Si la volumétrie n'est pas numérisable, interroger l'utilisateur pour obtenir un ordre de grandeur (par semaine ou par mois).

Formules (si units_per_period extrapolables) :
- hours_saved_per_month = (units_per_period * minutes_saved_per_unit) / 60
- cost_per_hour_default = 45 (€/h, modifiable si l'utilisateur en fournit un autre)
- euros_saved_per_month = hours_saved_per_month * cost_per_hour
- payback_weeks = ceil( setup_cost / (euros_saved_per_month / 4.33) )

Valeurs par défaut : setup_cost = 2500, run_cost_per_month = 149 ; afficher et expliquer que ce sont des hypothèses.

## SORTIE ATTENDUE (toujours en premier, JSON strict)

{
  "status": "ok",
  "intent": "BILLING | RH_ONBOARDING | REPORTING | OPS_BACKOFFICE | OTHER",
  "slots": {
    "role": "string",
    "task": "string",
    "volume": "string",
    "tools": ["string"],
    "maturity": "NONE | BASIC_MACROS | ZAPS | ORCHESTRATION",
    "email": "string|null",
    "constraints": "string|null"
  },
  "derived": {
    "units_per_period": {
      "value": 0,
      "period": "per_month | per_week | unknown",
      "method": "parsed | assumed"
    },
    "minutes_saved_per_unit": 0,
    "hours_saved_per_month": 0,
    "cost_per_hour": 45,
    "euros_saved_per_month": 0,
    "setup_cost": 2500,
    "run_cost_per_month": 149,
    "payback_weeks": 0,
    "assumptions": ["string"]
  },
  "blueprint": {
    "title": "string",
    "steps": [
      {"step": 1, "title": "string", "detail": "string"},
      {"step": 2, "title": "string", "detail": "string"}
    ],
    "tooling": ["n8n", "Make", "Zapier", "AirTable", "Google Sheets", "Drive", "Slack", "Webhook"],
    "data_points": ["string"]
  },
  "actions": [
    {
      "type": "CREATE_PDF",
      "label": "Générer le blueprint PDF",
      "payload": {"template": "parrit-blueprint-v1"}
    },
    {
      "type": "BOOK_MEETING",
      "label": "Planifier un échange",
      "payload": {"url": "https://arkel.cal.com/paul/call-with-paul"}
    }
  ],
  "messages": {
    "short": "string",
    "details": "string"
  }
}

## NOTES DE FORMAT

- Toujours commencer par l'objet JSON exact (aucun commentaire dans le bloc)
- Ensuite seulement, afficher 2–4 phrases lisibles qui résument le plan et proposent l'action suivante
- N'utilise que les type d'actions définis (CREATE_PDF, BOOK_MEETING, START_POC, ASK_CLARIFICATION)
- Si une info manque pour estimer correctement, renvoyer status: "need_info" avec une seule question dans messages.short, et pas de calculs

## PARSING DE VOLUMÉTRIE (exemples)

- "200 factures/mois" → units_per_period.value=200, period=per_month
- "3 rapports/sem" → value=3, period=per_week
- "15 onboardings/trimestre" → convertir en per_month ≈ 5
- Si ambigu : basculer en need_info

## POLITIQUE DE CONFIDENTIALITÉ

- Ne jamais demander de données personnelles sensibles
- Si l'utilisateur donne des comptes réels (email/identifiants), refuser et proposer un placeholder

## STYLE

- Professionnel, empathique, orienté action
- Phrases courtes. Pas de jargon non expliqué
- Ton chaleureux avec émojis subtils (🚀, ✨, 💪, 🎯)`;

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