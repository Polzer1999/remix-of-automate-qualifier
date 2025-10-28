import { Button } from "@/components/ui/button";
import { FileText, Users, BarChart3, MessageSquare, Sparkles } from "lucide-react";

interface QuickRepliesProps {
  onSelect: (message: string) => void;
  isVisible: boolean;
}

const quickReplies = [
  {
    icon: FileText,
    label: "Automatiser la facturation",
    message: "J'aimerais automatiser la gestion de la facturation dans mon entreprise.",
  },
  {
    icon: Users,
    label: "Optimiser l'onboarding RH",
    message: "Je souhaite optimiser le processus d'onboarding des nouveaux employés.",
  },
  {
    icon: BarChart3,
    label: "Générer des rapports financiers",
    message: "Je veux automatiser la génération de rapports financiers hebdomadaires.",
  },
  {
    icon: MessageSquare,
    label: "Améliorer la gestion client",
    message: "Je cherche à améliorer notre système de gestion de la relation client.",
  },
  {
    icon: Sparkles,
    label: "Autre besoin...",
    message: "J'ai un autre besoin en automatisation que j'aimerais discuter.",
  },
];

export const QuickReplies = ({ onSelect, isVisible }: QuickRepliesProps) => {
  if (!isVisible) return null;

  return (
    <div className="px-4 pb-4 animate-fade-in">
      <p className="text-xs text-muted-foreground mb-3 font-medium">
        Suggestions pour commencer :
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {quickReplies.map((reply, index) => {
          const Icon = reply.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-3 px-4 justify-start text-left hover:bg-primary/5 hover:border-primary/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
              onClick={() => onSelect(reply.message)}
            >
              <Icon className="w-4 h-4 mr-2 flex-shrink-0 text-primary/70 group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">{reply.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
