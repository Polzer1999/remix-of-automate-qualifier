import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export type OfferType = "pay" | "prospection" | "agentique" | "formation";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerType: OfferType | null;
  offerTitle: string;
}

const WEBHOOK_URL = "https://n8n.parrit.ai/webhook/landing-form";

export const ContactModal = ({
  isOpen,
  onClose,
  offerType,
  offerTitle,
}: ContactModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        source: "landing",
        offer: offerType,
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        message: formData.message.trim() || undefined,
        timestamp: new Date().toISOString(),
      };

      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });

      toast.success("Merci ! On vous recontacte rapidement.");
      setFormData({ name: "", email: "", company: "", message: "" });
      
      // Fermer le modal après 2 secondes
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111111] border-[#333333] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl">
            {offerTitle}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Laissez-nous vos coordonnées, on vous recontacte rapidement.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Nom <span className="text-[#9ACD32]">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Votre nom"
              required
              className="bg-[#0a0a0a] border-[#333333] text-foreground placeholder:text-muted-foreground focus:border-[#808000]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email <span className="text-[#9ACD32]">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="votre@email.com"
              required
              className="bg-[#0a0a0a] border-[#333333] text-foreground placeholder:text-muted-foreground focus:border-[#808000]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-foreground">
              Entreprise
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Votre entreprise"
              className="bg-[#0a0a0a] border-[#333333] text-foreground placeholder:text-muted-foreground focus:border-[#808000]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">
              Message
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Décrivez votre projet..."
              rows={3}
              className="bg-[#0a0a0a] border-[#333333] text-foreground placeholder:text-muted-foreground focus:border-[#808000] resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#9ACD32] text-[#0a0a0a] hover:bg-[#808000] font-semibold"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
