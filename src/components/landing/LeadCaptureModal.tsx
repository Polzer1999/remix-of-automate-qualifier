import { useState } from "react";
import { X, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import paulPhoto from "@/assets/paul-photo.png";

export type OfferType = "pay" | "prospection" | "agentique" | "formation";

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
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    problem: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.email.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        email: formData.email.trim(),
        phone: '',
        need: formData.problem.trim() || '',
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
      setFormData({ firstName: "", email: "", problem: "" });
    } catch (error) {
      console.error("Erreur webhook:", error);
      setIsSuccess(true);
      setFormData({ firstName: "", email: "", problem: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({ firstName: "", email: "", problem: "" });
    onClose();
  };

  if (!isOpen || !offerType || offerType === "agentique") return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[1001] p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="bg-card border border-primary/30 rounded-2xl w-full max-w-[500px] p-8 md:p-10 relative animate-scale-in max-h-[90vh] overflow-y-auto"
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
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              {t.modal.successTitle}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-[350px] mx-auto">
              {t.modal.successMessage}
            </p>
            <Button
              onClick={handleClose}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t.modal.close}
            </Button>
          </div>
        ) : (
          <>
            {/* Trust header: photo + reassurance */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={paulPhoto}
                alt="Paul"
                className="w-14 h-14 rounded-full object-cover border-2 border-primary/40 flex-shrink-0"
              />
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-1">
                  <Clock className="w-3 h-3" />
                  {t.modal.subtitle}
                </span>
                <p className="text-xs text-muted-foreground/70">
                  {t.modal.reassurance}
                </p>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 leading-tight">
              {t.modal.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {offerTitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder={t.modal.firstName}
                required
                className="bg-background border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />

              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t.modal.email}
                required
                className="bg-background border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />

              <Textarea
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder={t.modal.problem}
                rows={5}
                className="bg-background border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary resize-y min-h-[120px]"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(154,205,50,0.3)] flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                {isSubmitting ? t.modal.sending : t.modal.submit}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground/60 text-center mt-4">
              {t.modal.reassurance}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
