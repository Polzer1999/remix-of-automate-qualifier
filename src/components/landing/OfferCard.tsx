import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ArrowRight } from "lucide-react";

interface TwoColumnsData {
  left: { title: string; items: readonly string[] };
  right: { title: string; items: readonly string[] };
}

interface OfferCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  cta: string;
  ctaAction: "modal" | "scroll";
  bullets?: string[];
  mention?: string;
  legalMention?: string;
  twoColumns?: TwoColumnsData;
  onCtaClick?: () => void;
  staggerIndex?: number;
  recommended?: boolean;
}

export const OfferCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  badge,
  badgeColor,
  cta,
  ctaAction,
  bullets,
  mention,
  legalMention,
  twoColumns,
  onCtaClick,
  staggerIndex = 0,
  recommended = false,
}: OfferCardProps) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div 
      ref={ref}
      className={`group relative p-7 md:p-8 rounded-xl bg-card text-left w-full flex flex-col min-h-[480px] border border-border shadow-sm transition-all duration-300 ease-out stagger-${staggerIndex + 1} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 ${
        recommended ? 'ring-2 ring-primary/30 border-primary/20' : ''
      }`}
    >
      {/* Recommended badge */}
      {recommended && (
        <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          ⭐ Recommandé
        </div>
      )}

      <div className="flex items-start justify-between mb-5">
        <div className="p-3 rounded-lg bg-secondary text-primary">
          <Icon className="w-5 h-5" />
        </div>
        {badge && (
          <Badge 
            variant="outline"
            className="text-xs font-medium"
            style={badgeColor ? { color: badgeColor, borderColor: badgeColor } : undefined}
          >
            {badge}
          </Badge>
        )}
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{title}</h3>
      {subtitle && (
        <p className="text-sm italic mb-3 text-primary font-medium">{subtitle}</p>
      )}
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>
      
      {bullets && bullets.length > 0 && (
        <ul className="text-sm text-muted-foreground mb-5 space-y-2 flex-grow">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="text-primary mt-0.5 text-xs">●</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      
      {twoColumns && (
        <div className="text-sm text-muted-foreground mb-5 grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
          <div>
            <p className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wide">{twoColumns.left.title}</p>
            <ul className="space-y-1.5">
              {twoColumns.left.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 text-xs">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wide">{twoColumns.right.title}</p>
            <ul className="space-y-1.5">
              {twoColumns.right.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 text-xs">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {mention && (
        <p className="text-xs text-primary mb-4 font-medium">{mention}</p>
      )}
      
      {legalMention && (
        <p className="text-xs text-muted-foreground/50 mb-4 italic">{legalMention}</p>
      )}
      
      <div className="mt-auto pt-5">
        <Button
          onClick={onCtaClick}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg py-5 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          {cta}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
