import { LucideIcon, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

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
  featured?: boolean;
}

export const OfferCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  badge,
  badgeColor,
  cta,
  bullets,
  mention,
  legalMention,
  twoColumns,
  onCtaClick,
  staggerIndex = 0,
  recommended = false,
  featured = false,
}: OfferCardProps) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div 
      ref={ref}
      className={`bento-glow glass-card relative p-6 md:p-8 rounded-xl text-left w-full flex flex-col min-h-[420px] transition-all duration-500 stagger-${staggerIndex + 1} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${featured ? 'md:col-span-2 md:row-span-1' : ''} ${
        recommended ? 'ring-1 ring-primary/20' : ''
      }`}
    >
      {/* Recommended tag */}
      {recommended && (
        <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          ★ Recommandé
        </div>
      )}

      <div className="flex items-start justify-between mb-5">
        <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-5 h-5" />
        </div>
        {badge && (
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-md border"
            style={badgeColor 
              ? { color: badgeColor, borderColor: `${badgeColor}33` } 
              : { color: 'hsl(160 84% 39%)', borderColor: 'hsl(160 84% 39% / 0.2)' }
            }
          >
            {badge}
          </span>
        )}
      </div>
      
      <h3 className="text-lg md:text-xl font-bold text-foreground mb-1.5 tracking-tight">{title}</h3>
      {subtitle && (
        <p className="text-xs italic mb-3 text-primary/80 font-medium">{subtitle}</p>
      )}
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>
      
      {bullets && bullets.length > 0 && (
        <ul className="text-sm text-muted-foreground mb-5 space-y-2 flex-grow">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="text-primary mt-1 text-[8px]">▸</span>
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      
      {twoColumns && (
        <div className="text-sm text-muted-foreground mb-5 grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
          <div>
            <p className="text-foreground/60 mb-2 text-[10px] uppercase tracking-wider">{twoColumns.left.title}</p>
            <ul className="space-y-1.5">
              {twoColumns.left.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1 text-[8px]">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-foreground/60 mb-2 text-[10px] uppercase tracking-wider">{twoColumns.right.title}</p>
            <ul className="space-y-1.5">
              {twoColumns.right.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1 text-[8px]">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {mention && (
        <p className="text-xs text-primary/70 mb-3 font-medium">{mention}</p>
      )}
      
      {legalMention && (
        <p className="text-[10px] text-muted-foreground/40 mb-3 italic">{legalMention}</p>
      )}
      
      <div className="mt-auto pt-4">
        <Button
          onClick={onCtaClick}
          className="w-full btn-shimmer bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg py-5 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_-5px_hsl(160_84%_39%_/_0.3)]"
        >
          {cta}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
