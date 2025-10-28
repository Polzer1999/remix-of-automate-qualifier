import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";

interface Webhook {
  id: string;
  name: string;
  webhook_url: string;
  trigger_event: string;
  is_active: boolean;
}

export default function WebhookConfig() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadWebhooks();
  }, []);

  const loadWebhooks = async () => {
    try {
      const { data, error } = await supabase
        .from('n8n_webhooks')
        .select('*')
        .order('name');

      if (error) throw error;
      setWebhooks(data || []);
    } catch (error) {
      console.error('Error loading webhooks:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les webhooks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateWebhook = async (id: string, updates: Partial<Webhook>) => {
    try {
      const { error } = await supabase
        .from('n8n_webhooks')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Webhook mis à jour",
        description: "La configuration a été sauvegardée",
      });

      loadWebhooks();
    } catch (error) {
      console.error('Error updating webhook:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le webhook",
        variant: "destructive",
      });
    }
  };

  const getEventDescription = (event: string) => {
    switch (event) {
      case 'conversation_qualified':
        return 'Déclenché quand une conversation est qualifiée (email détecté ou 8+ messages)';
      case 'blueprint_generated':
        return 'Déclenché quand un blueprint d\'automatisation est généré';
      case 'meeting_scheduled':
        return 'Déclenché quand un meeting est planifié';
      default:
        return event;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-light text-foreground mb-2">Configuration n8n</h1>
          <p className="text-muted-foreground">
            Configurez vos webhooks n8n pour automatiser l'envoi d'emails, la collecte de données et les notifications.
          </p>
        </div>

        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <Card key={webhook.id} className="frosted-glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">{webhook.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      {getEventDescription(webhook.trigger_event)}
                    </CardDescription>
                  </div>
                  <Switch
                    checked={webhook.is_active}
                    onCheckedChange={(checked) => 
                      updateWebhook(webhook.id, { is_active: checked })
                    }
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor={`webhook-${webhook.id}`} className="text-foreground">
                    URL du webhook n8n
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id={`webhook-${webhook.id}`}
                      value={webhook.webhook_url}
                      onChange={(e) => {
                        const updated = webhooks.map(w =>
                          w.id === webhook.id ? { ...w, webhook_url: e.target.value } : w
                        );
                        setWebhooks(updated);
                      }}
                      placeholder="https://votre-instance.n8n.cloud/webhook/..."
                      className="flex-1 bg-background/50"
                    />
                    <Button
                      onClick={() => updateWebhook(webhook.id, { webhook_url: webhook.webhook_url })}
                      className="bg-primary text-primary-foreground"
                    >
                      Sauvegarder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="frosted-glass border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">Comment configurer n8n ?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-foreground/80">
            <div>
              <h4 className="font-medium text-foreground mb-2">1. Créez un workflow n8n</h4>
              <p>Connectez-vous à votre instance n8n et créez un nouveau workflow.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">2. Ajoutez un trigger Webhook</h4>
              <p>Ajoutez un nœud "Webhook" en début de workflow et copiez l'URL générée.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">3. Configurez vos actions</h4>
              <p>Ajoutez des nœuds pour envoyer des emails (Gmail, SendGrid), créer des tickets (Notion, Airtable), ou envoyer des notifications (Slack, Discord).</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">4. Collez l'URL ici</h4>
              <p>Copiez l'URL du webhook n8n et collez-la dans le champ correspondant ci-dessus.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
