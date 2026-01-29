import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OfferCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  cta: string;
  bullets?: string[];
  steps?: string[];
  examples?: string[];
  mention?: string;
  legalMention?: string;
  accentColor?: string;
  onClick: () => void;
}

export const OfferCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  badge,
  cta,
  bullets,
  steps,
  examples,
  mention,
  legalMention,
  accentColor,
  onClick,
}: OfferCardProps) => {
  const accent = accentColor || "#9ACD32";
  const accentHover = accentColor ? accentColor : "#808000";
  
  return (
    <div
      onClick={onClick}
      className="group relative p-6 md:p-8 rounded-2xl bg-[#111111] border border-[#333333] text-left transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm w-full flex flex-col cursor-pointer hover:border-[var(--accent-hover)] hover:shadow-[0_8px_30px_var(--accent-shadow)]"
      style={{
        ["--accent-color" as string]: accent,
        ["--accent-hover" as string]: accentHover,
        ["--accent-shadow" as string]: `${accent}26`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="p-3 rounded-xl bg-[#1a1a1a] transition-colors"
          style={{ color: accent }}
        >
          <Icon className="w-6 h-6" />
        </div>
        {badge && (
          <Badge 
            className="border"
            style={{ 
              backgroundColor: `${accent}33`, 
              color: accent, 
              borderColor: `${accent}4D` 
            }}
          >
            {badge}
          </Badge>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
      {subtitle && (
        <p className="text-sm mb-2" style={{ color: accent }}>{subtitle}</p>
      )}
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {/* Bullets list */}
      {bullets && bullets.length > 0 && (
        <ul className="text-sm text-muted-foreground mb-4 space-y-1">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-[#9ACD32] mt-1">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      
      {/* Numbered steps */}
      {steps && steps.length > 0 && (
        <ol className="text-sm text-muted-foreground mb-4 space-y-1">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-[#9ACD32] font-semibold">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
      
      {/* Examples in italic */}
      {examples && examples.length > 0 && (
        <ul className="text-sm text-muted-foreground/80 mb-4 space-y-1 italic">
          {examples.map((example, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-[#9ACD32] not-italic mt-1">•</span>
              <span>{example}</span>
            </li>
          ))}
        </ul>
      )}
      
      {/* Mention */}
      {mention && (
        <p className="text-sm mb-4" style={{ color: `${accent}CC` }}>{mention}</p>
      )}
      
      {/* Legal Mention */}
      {legalMention && (
        <p className="text-xs text-muted-foreground/60 mb-4 italic">{legalMention}</p>
      )}
      
      <div className="mt-auto pt-4">
        <span 
          className="inline-flex items-center font-medium group-hover:underline"
          style={{ color: accent }}
        >
          {cta}
          <svg
            className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
};
