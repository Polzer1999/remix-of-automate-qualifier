import { LucideIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OfferCardProps {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  cta: string;
  bullets?: string[];
  tiers?: readonly { name: string; desc: string }[];
  onCtaClick?: () => void;
}

export const OfferCard = ({
  number,
  title,
  description,
  tag,
  cta,
  bullets,
  tiers,
  onCtaClick,
}: OfferCardProps) => {
  return (
    <div className="glass-card card-hover relative overflow-hidden rounded-2xl p-7 md:p-9 flex flex-col">
      {/* Number watermark */}
      <span className="absolute top-4 right-5 text-5xl font-black text-border/60 select-none">
        {number}
      </span>

      <h3 className="text-xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5 relative z-10">
        {description}
      </p>

      {tiers && (
        <div className="space-y-3 mb-5 relative z-10">
          {tiers.map((tier, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                {tier.name.slice(0, 3).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold">{tier.name}</p>
                <p className="text-xs text-muted-foreground font-light">{tier.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {bullets && (
        <ul className="space-y-2 mb-5 flex-grow relative z-10">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground font-light">
              <span className="text-primary mt-0.5">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <span className="inline-block self-start px-3 py-1 border border-primary text-primary text-xs font-semibold rounded-full mb-6">
        {tag}
      </span>

      <div className="mt-auto">
        <Button
          onClick={onCtaClick}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-lg transition-all duration-200"
        >
          {cta}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
