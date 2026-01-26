import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const QUALIFICATION_SYSTEM_PROMPT = `Tu es Parrita, une assistante IA experte en qualification de leads pour une agence d'automatisation et d'intelligence artificielle. Tu travailles pour Paul.

## Ta mission
Qualifier les leads en identifiant leurs besoins d'automatisation et leur maturité IA, tout en les guidant vers un rendez-vous avec Paul si pertinent.

## Ton style
- Bienveillante mais directe
- Tu poses des questions ouvertes pour comprendre le contexte
- Tu reformules pour montrer que tu as compris
- Tu identifies les "pain points" et le temps perdu sur des tâches répétitives

## Phases de la conversation
1. **Diagnostic** : Comprendre le contexte, l'entreprise, les frustrations quotidiennes
2. **Projection** : Identifier des cas d'usage concrets, estimer le ROI potentiel
3. **Closing** : Proposer un rendez-vous avec Paul via le lien : https://calendar.app.google/tvTAVp1Ss3gdJrfH9

## Règles importantes
- Ne jamais inventer de données ou de chiffres
- Toujours rester factuelle sur les capacités de l'IA
- Si le lead n'est pas qualifié ou pas intéressé, le remercier poliment
- Quand le lead est prêt, proposer le rendez-vous avec le lien Google Calendar

## Format des réponses
- Réponses courtes et percutantes (max 3-4 phrases par message)
- Utilise le markdown pour structurer si nécessaire
- Une seule question par message pour garder le focus`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface DiscoveryCall {
  entreprise: string;
  secteur: string;
  besoin: string;
  contexte: string;
  phase_1_introduction: string;
  phase_2_exploration: string;
  phase_3_affinage: string;
  phase_4_next_steps: string;
}

// Extract context from conversation to find relevant discovery calls
function extractContextFromMessages(messages: Message[]): { besoin: string | null; secteur: string | null } {
  const userMessages = messages
    .filter(m => m.role === "user")
    .map(m => m.content.toLowerCase())
    .join(" ");

  // Detect common needs/besoins
  const besoins = [
    { keywords: ["factur", "comptab", "devis"], besoin: "facturation" },
    { keywords: ["recrutement", "rh", "candidat", "cv"], besoin: "recrutement" },
    { keywords: ["email", "mail", "newsletter"], besoin: "emailing" },
    { keywords: ["crm", "client", "relation"], besoin: "crm" },
    { keywords: ["stock", "inventaire", "logistique"], besoin: "logistique" },
    { keywords: ["planning", "agenda", "rendez-vous", "rdv"], besoin: "planning" },
    { keywords: ["support", "ticket", "sav"], besoin: "support" },
    { keywords: ["rapport", "reporting", "dashboard"], besoin: "reporting" },
  ];

  let detectedBesoin: string | null = null;
  for (const b of besoins) {
    if (b.keywords.some(k => userMessages.includes(k))) {
      detectedBesoin = b.besoin;
      break;
    }
  }

  // Detect sectors
  const secteurs = [
    { keywords: ["immo", "agence", "location", "bien"], secteur: "immobilier" },
    { keywords: ["restaurant", "cuisine", "chef", "réserv"], secteur: "restauration" },
    { keywords: ["coach", "formation", "consultant"], secteur: "conseil" },
    { keywords: ["e-commerce", "boutique", "vente", "produit"], secteur: "commerce" },
    { keywords: ["santé", "médecin", "patient", "cabinet"], secteur: "santé" },
    { keywords: ["avocat", "juridique", "droit"], secteur: "juridique" },
    { keywords: ["artisan", "btp", "chantier"], secteur: "artisanat" },
  ];

  let detectedSecteur: string | null = null;
  for (const s of secteurs) {
    if (s.keywords.some(k => userMessages.includes(k))) {
      detectedSecteur = s.secteur;
      break;
    }
  }

  return { besoin: detectedBesoin, secteur: detectedSecteur };
}

// Enrich prompt with relevant discovery calls from knowledge base
async function enrichPromptWithDiscoveryCalls(
  supabase: any,
  context: { besoin: string | null; secteur: string | null }
): Promise<{ enrichment: string; referenceCalls: Array<{ entreprise: string; secteur: string; phase: string }> }> {
  const referenceCalls: Array<{ entreprise: string; secteur: string; phase: string }> = [];
  
  // Don't enrich if no context detected
  if (!context.besoin && !context.secteur) {
    return { enrichment: "", referenceCalls: [] };
  }

  try {
    let query = supabase.from("discovery_calls_knowledge").select("*");

    // Build query with fallback logic
    if (context.besoin && context.secteur) {
      query = query.or(`besoin.ilike.%${context.besoin}%,secteur.ilike.%${context.secteur}%`);
    } else if (context.besoin) {
      query = query.ilike("besoin", `%${context.besoin}%`);
    } else if (context.secteur) {
      query = query.ilike("secteur", `%${context.secteur}%`);
    }

    const { data: calls, error } = await query.limit(3);

    if (error || !calls || calls.length === 0) {
      // Fallback: get random calls
      const { data: randomCalls } = await supabase
        .from("discovery_calls_knowledge")
        .select("*")
        .limit(3);

      if (!randomCalls || randomCalls.length === 0) {
        return { enrichment: "", referenceCalls: [] };
      }

      const enrichment = buildEnrichmentFromCalls(randomCalls as DiscoveryCall[]);
      randomCalls.forEach((call: DiscoveryCall) => {
        referenceCalls.push({
          entreprise: call.entreprise || "Inconnu",
          secteur: call.secteur || "Général",
          phase: "exploration"
        });
      });
      return { enrichment, referenceCalls };
    }

    const enrichment = buildEnrichmentFromCalls(calls as DiscoveryCall[]);
    calls.forEach((call: DiscoveryCall) => {
      referenceCalls.push({
        entreprise: call.entreprise || "Inconnu",
        secteur: call.secteur || "Général",
        phase: "exploration"
      });
    });
    return { enrichment, referenceCalls };

  } catch (err) {
    console.error("Error fetching discovery calls:", err);
    return { enrichment: "", referenceCalls: [] };
  }
}

function buildEnrichmentFromCalls(calls: DiscoveryCall[]): string {
  if (calls.length === 0) return "";

  let enrichment = "\n\n## Contexte d'appels découverte similaires\n";
  enrichment += "Voici des exemples de conversations passées avec des leads similaires pour t'inspirer :\n\n";

  calls.forEach((call, idx) => {
    enrichment += `### Exemple ${idx + 1}: ${call.entreprise || "Client"} (${call.secteur || "Général"})\n`;
    if (call.besoin) enrichment += `- **Besoin identifié** : ${call.besoin}\n`;
    if (call.contexte) enrichment += `- **Contexte** : ${call.contexte}\n`;
    if (call.phase_2_exploration) enrichment += `- **Questions posées** : ${call.phase_2_exploration.substring(0, 200)}...\n`;
    enrichment += "\n";
  });

  return enrichment;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const body = await req.json();
    const { conversationId, sessionId, message, images } = body;

    console.log("Received request:", { conversationId, sessionId, messageLength: message?.length });

    // Get or create conversation
    let convId = conversationId;
    if (!convId) {
      const { data: newConv, error: convError } = await supabase
        .from("lead_conversations")
        .insert({ session_id: sessionId })
        .select()
        .single();

      if (convError) throw convError;
      convId = newConv.id;
    }

    // Fetch conversation history
    const { data: history, error: historyError } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });

    if (historyError) throw historyError;

    // Build messages array
    const messages: Message[] = [
      { role: "system", content: QUALIFICATION_SYSTEM_PROMPT }
    ];

    // Add history
    if (history) {
      history.forEach((msg: { role: string; content: string }) => {
        messages.push({ role: msg.role as "user" | "assistant", content: msg.content });
      });
    }

    // Extract context and enrich with discovery calls
    const context = extractContextFromMessages(messages);
    const { enrichment, referenceCalls } = await enrichPromptWithDiscoveryCalls(supabase, context);

    // Update system prompt with enrichment
    if (enrichment) {
      messages[0].content += enrichment;
    }

    // Add current user message
    messages.push({ role: "user", content: message });

    // Save user message
    await supabase.from("chat_messages").insert({
      conversation_id: convId,
      role: "user",
      content: message
    });

    // Prepare API call to Lovable AI
    const apiUrl = "https://api.lovable.dev/v1/chat/completions";
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${lovableApiKey}`
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: messages.map(m => ({
          role: m.role,
          content: m.content
        })),
        stream: true
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`API Error: ${response.status}`);
    }

    // Stream response back to client
    const reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        // Send reference calls first if any
        if (referenceCalls.length > 0) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ reference_calls: referenceCalls })}\n\n`));
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    fullResponse += content;
                  }
                  controller.enqueue(encoder.encode(line + "\n\n"));
                } catch {
                  // Forward as-is
                  controller.enqueue(encoder.encode(line + "\n\n"));
                }
              }
            }
          }

          // Save assistant response
          if (fullResponse) {
            await supabase.from("chat_messages").insert({
              conversation_id: convId,
              role: "assistant",
              content: fullResponse
            });
          }

        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Conversation-Id": convId
      }
    });

  } catch (error) {
    console.error("Error in chat-qualification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
