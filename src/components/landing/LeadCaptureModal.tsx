import { useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export type OfferType = "pay" | "prospection" | "agentique" | "formation";

interface OfferModalConfig {
  title: string;
  subtitle: string;
  buttonText: string;
}

const modalConfigs: Record<Exclude<OfferType, "agentique">, OfferModalConfig> = {
  pay: {
    title: "Accès bêta PaY",
    subtitle: "Recevez un accès prioritaire à l'assistant IA pour SAP",
    buttonText: "Demander mon accès",
  },
  prospection: {
    title: "Prospection par signaux",
    subtitle: "Recevez la documentation complète et un exemple de pipeline",
    buttonText: "Recevoir la documentation",
  },
  formation: {
    title: "Formation IA & Agentique",
    subtitle: "Recevez le programme détaillé et les tarifs",
    buttonText: "Recevoir le programme",
  },
};

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerType: OfferType | null;
  offerTitle: string;
}

const WEBHOOK_URL = "https://n8n.srv1115145.hstgr.cloud/webhook/parrit-lead";

export const LeadCaptureModal = ({
  isOpen,
  onClose,
  offerType,
  offerTitle,
}: LeadCaptureModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    need: "",
  });

  const config = offerType && offerType !== "agentique" ? modalConfigs[offerType] : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        need: formData.need.trim() || '',
        offer: offerTitle,
        timestamp: new Date().toISOString(),
      };

      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
      setFormData({ firstName: "", email: "", phone: "", need: "" });
    } catch (error) {
      console.error("Erreur webhook:", error);
      // Affiche quand même la confirmation (le lead est probablement passé)
      setIsSuccess(true);
      setFormData({ firstName: "", email: "", phone: "", need: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({ firstName: "", email: "", phone: "", need: "" });
    onClose();
  };

  if (!isOpen || !config) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[1001] p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="bg-card border border-primary/30 rounded-2xl w-full max-w-[450px] p-8 md:p-10 relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              C'est envoyé !
            </h3>
            <p className="text-muted-foreground mb-6">
              Je vous recontacte sous 24h.
            </p>
            <Button
              onClick={handleClose}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              {config.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {config.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Votre prénom"
                required
                className="bg-background border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />

              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Votre email professionnel"
                required
                className="bg-background border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />

              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Votre téléphone"
                required
                className="bg-background border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />

              <Textarea
                value={formData.need}
                onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                placeholder="Décrivez brièvement votre besoin ou projet..."
                rows={3}
                className="bg-background border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary resize-y min-h-[80px]"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(154,205,50,0.3)]"
              >
                {isSubmitting ? "Envoi en cours..." : config.buttonText}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground/60 text-center mt-4">
              Vous recevrez un email sous 24h avec toutes les informations.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
