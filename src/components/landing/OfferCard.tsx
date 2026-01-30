import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TwoColumnsData {
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
}

interface OfferCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  cta: string;
  ctaAction: "modal" | "external";
  ctaUrl?: string;
  bullets?: string[];
  mention?: string;
  legalMention?: string;
  twoColumns?: TwoColumnsData;
  onModalOpen?: () => void;
}

export const OfferCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  badge,
  badgeColor = "#9ACD32",
  cta,
  ctaAction,
  ctaUrl,
  bullets,
  mention,
  legalMention,
  twoColumns,
  onModalOpen,
}: OfferCardProps) => {
  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ctaAction === "external" && ctaUrl) {
      window.open(ctaUrl, "_blank");
    } else if (ctaAction === "modal" && onModalOpen) {
      onModalOpen();
    }
  };

  return (
    <div className="group relative p-6 md:p-8 rounded-2xl bg-card text-left transition-all duration-300 hover:-translate-y-1 w-full flex flex-col min-h-[480px] border border-primary/30 hover:border-primary hover:shadow-[0_0_30px_rgba(154,205,50,0.15)]">
      <div className="flex items-start justify-between mb-5">
        <div className="p-3 rounded-xl bg-background text-primary">
          <Icon className="w-6 h-6" />
        </div>
        {badge && (
          <Badge 
            className="border bg-transparent text-xs font-medium"
            style={{ 
              color: badgeColor, 
              borderColor: badgeColor 
            }}
          >
            {badge}
          </Badge>
        )}
      </div>
      
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{title}</h3>
      {subtitle && (
        <p className="text-base italic mb-3 text-primary font-medium">{subtitle}</p>
      )}
      <p className="text-muted-foreground mb-5">{description}</p>
      
      {/* Bullets list */}
      {bullets && bullets.length > 0 && (
        <ul className="text-sm text-muted-foreground mb-5 space-y-2 flex-grow">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      
      {/* Two columns layout */}
      {twoColumns && (
        <div className="text-sm text-muted-foreground mb-5 grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
          <div>
            <p className="font-semibold text-foreground mb-2">{twoColumns.left.title}</p>
            <ul className="space-y-1">
              {twoColumns.left.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">{twoColumns.right.title}</p>
            <ul className="space-y-1">
              {twoColumns.right.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Mention */}
      {mention && (
        <p className="text-sm text-primary mb-4 font-medium">{mention}</p>
      )}
      
      {/* Legal Mention */}
      {legalMention && (
        <p className="text-xs text-muted-foreground/60 mb-4 italic">{legalMention}</p>
      )}
      
      <div className="mt-auto pt-5">
        <Button
          onClick={handleCtaClick}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg"
        >
          {cta}
        </Button>
      </div>
    </div>
  );
};
