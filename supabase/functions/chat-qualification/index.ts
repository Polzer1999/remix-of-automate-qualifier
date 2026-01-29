import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const QUALIFICATION_SYSTEM_PROMPT = `Tu es Parrita, une assistante IA chaleureuse et experte en automatisation et simplification des processus métier. Tu travailles pour Paul, fondateur de Parrit.

## TON RÔLE
Tu guides les utilisateurs à travers un processus de découverte pour identifier leurs besoins d'automatisation, qualifier leur niveau de maturité, et les orienter vers les bonnes solutions.

## TON STYLE
- Bienveillante mais professionnelle
- Tu poses des questions ouvertes pour comprendre le contexte
- Tu reformules pour confirmer ta compréhension
- Tu proposes des solutions concrètes basées sur l'expertise de Paul

## PROCESSUS DE QUALIFICATION

### Phase 1 : Exploration (2-3 échanges)
- Comprendre le contexte métier
- Identifier les tâches répétitives ou chronophages
- Évaluer le temps perdu sur ces tâches

### Phase 2 : Approfondissement (2-3 échanges)
- Explorer les outils actuellement utilisés
- Comprendre les frustrations principales
- Identifier les priorités

### Phase 3 : Proposition (1-2 échanges)
- Synthétiser les besoins identifiés
- Proposer une prochaine étape concrète

## CLÔTURE DE CONVERSATION
Quand tu sens que l'utilisateur est prêt ou après avoir bien compris ses besoins, propose-lui ces options :

**Option 1** : Réserver un appel découverte avec Paul → lien : https://calendar.app.google/tvTAVp1Ss3gdJrfH9

**Option 2** : Recevoir un récapitulatif par email

**Option 3** : Continuer à explorer d'autres sujets

## IMPORTANT
- Ne jamais inventer de fonctionnalités ou promesses
- Rester focalisée sur l'automatisation et la simplification
- Toujours valoriser l'expertise de Paul sans survendre
- Le texte doit rester lisible et clair (pas de formatage complexe)`;

async function enrichPromptWithDiscoveryCalls(
  supabase: any,
  userMessage: string
): Promise<{ enrichedPrompt: string; referenceCalls: any[] }> {
  try {
    const { data: calls, error } = await supabase
      .from("discovery_calls_knowledge")
      .select("entreprise, secteur, besoin, contexte, phase_1_introduction, phase_2_exploration, phase_3_affinage, phase_4_next_steps")
      .limit(5);

    if (error || !calls || calls.length === 0) {
      return { enrichedPrompt: "", referenceCalls: [] };
    }

    const relevantCalls = calls.slice(0, 3);
    const referenceCalls = relevantCalls.map((call: any) => ({
      entreprise: call.entreprise || "Anonyme",
      secteur: call.secteur || "Non spécifié",
      phase: "discovery",
    }));

    const contextBlock = relevantCalls
      .map(
        (call: any, idx: number) =>
          `--- Appel ${idx + 1} (${call.entreprise || "Anonyme"}, ${call.secteur || "secteur non spécifié"}) ---
Besoin: ${call.besoin || "Non spécifié"}
Contexte: ${call.contexte || "Non spécifié"}
Introduction: ${call.phase_1_introduction || ""}
Exploration: ${call.phase_2_exploration || ""}
Affinage: ${call.phase_3_affinage || ""}
Prochaines étapes: ${call.phase_4_next_steps || ""}`
      )
      .join("\n\n");

    const enrichedPrompt = `\n\n## CONTEXTE D'APPELS DÉCOUVERTE SIMILAIRES\nVoici des exemples d'appels découverte passés qui peuvent t'aider à mieux répondre :\n\n${contextBlock}\n\nUtilise ces exemples pour adapter ton approche et tes suggestions.`;

    return { enrichedPrompt, referenceCalls };
  } catch (e) {
    console.error("Error enriching prompt:", e);
    return { enrichedPrompt: "", referenceCalls: [] };
  }
}

async function checkRateLimit(
  supabase: any,
  sessionId: string
): Promise<boolean> {
  const windowStart = new Date(Date.now() - 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("rate_limits")
    .select("request_count")
    .eq("session_id", sessionId)
    .gte("window_start", windowStart)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Rate limit check error:", error);
    return true;
  }

  if (!data) {
    await supabase.from("rate_limits").insert({
      session_id: sessionId,
      request_count: 1,
      window_start: new Date().toISOString(),
    });
    return true;
  }

  if (data.request_count >= 10) {
    return false;
  }

  await supabase
    .from("rate_limits")
    .update({ request_count: data.request_count + 1 })
    .eq("session_id", sessionId)
    .gte("window_start", windowStart);

  return true;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { conversationId, sessionId, message, images } = await req.json();

    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Session ID required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const allowed = await checkRateLimit(supabase, sessionId);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please wait." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let convId = conversationId;
    if (!convId) {
      const { data: newConv, error: convError } = await supabase
        .from("lead_conversations")
        .insert({ session_id: sessionId })
        .select("id")
        .single();

      if (convError) throw convError;
      convId = newConv.id;
    }

    await supabase.from("chat_messages").insert({
      conversation_id: convId,
      role: "user",
      content: message,
    });

    const { data: history } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });

    const { enrichedPrompt, referenceCalls } =
      await enrichPromptWithDiscoveryCalls(supabase, message);

    const systemPrompt = QUALIFICATION_SYSTEM_PROMPT + enrichedPrompt;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    console.log("Calling Lovable AI with", messages.length, "messages");

    const aiResponse = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages,
        stream: true,
        max_tokens: 1000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const responseHeaders = new Headers(corsHeaders);
    responseHeaders.set("Content-Type", "text/event-stream");
    responseHeaders.set("Cache-Control", "no-cache");
    responseHeaders.set("Connection", "keep-alive");
    responseHeaders.set("X-Conversation-Id", convId);

    let fullResponse = "";

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        fullResponse += text;
        controller.enqueue(chunk);
      },
      async flush(controller) {
        if (referenceCalls.length > 0) {
          const refData = `data: ${JSON.stringify({ reference_calls: referenceCalls })}\n\n`;
          controller.enqueue(new TextEncoder().encode(refData));
        }

        const lines = fullResponse.split("\n");
        let assistantContent = "";
        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const parsed = JSON.parse(line.slice(6));
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) assistantContent += content;
            } catch {
              // Ignore parse errors
            }
          }
        }

        if (assistantContent) {
          await supabase.from("chat_messages").insert({
            conversation_id: convId,
            role: "assistant",
            content: assistantContent,
          });
        }
      },
    });

    return new Response(aiResponse.body?.pipeThrough(transformStream), {
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    console.error("Edge function error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
