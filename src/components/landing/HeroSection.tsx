import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import paulPhoto from "@/assets/paul-photo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { NodeNetwork } from "./NodeNetwork";

export const HeroSection = () => {
  const { t } = useLanguage();

  const handleScrollToCalendar = () => {
    document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScrollToOffers = () => {
    document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="flex-1 flex items-center px-4 md:px-10 relative py-10 md:py-0 aurora-glow">
      <div className="max-w-[1140px] mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          {/* Badge */}
          <div className="inline-block glass-card rounded-full px-4 py-2 mb-8">
            <p className="text-primary text-sm font-medium tracking-wide">
              {t.hero.badge}
            </p>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-[46px] lg:text-[56px] font-black text-foreground mb-5 leading-[1.05]">
            {t.hero.title1}
            <br />
            <span className="text-muted-foreground font-medium">{t.hero.title2}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-foreground/70 mb-3 leading-relaxed">
            <span className="text-primary font-semibold">{t.hero.subtitle}</span> — {t.hero.subtitleEnd}
          </p>

          {/* Stats line */}
          <p className="text-sm text-muted-foreground mb-2">{t.hero.experience}</p>
          <p className="text-xs text-muted-foreground/50 mb-8">{t.hero.proof}</p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              onClick={handleScrollToCalendar}
              size="lg"
              className="btn-shimmer bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-5 rounded-lg text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_-5px_hsl(160_84%_39%_/_0.4)]"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              onClick={handleScrollToOffers}
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-secondary font-medium px-8 py-5 rounded-lg text-base transition-all duration-200"
            >
              {t.hero.ctaSecondary}
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground/50 uppercase tracking-widest">
              {t.hero.socialProof}
            </p>
          </div>
        </div>
        
        {/* Photo + Node Network */}
        <div className="flex-shrink-0 relative w-48 sm:w-56 md:w-64 lg:w-72">
          <div className="relative rounded-2xl overflow-hidden">
            <NodeNetwork className="rounded-2xl" />
            <img 
              src={paulPhoto} 
              alt="Paul Larmaraud — Parrit.ai" 
              className="relative z-10 w-full h-auto object-contain"
              style={{ 
                filter: "drop-shadow(0 16px 40px hsla(160, 84%, 39%, 0.1))",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button 
        onClick={handleScrollToOffers}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center cursor-pointer opacity-30 hover:opacity-60 transition-opacity duration-300"
      >
        <span className="text-[10px] text-muted-foreground mb-2 tracking-[0.2em] uppercase">{t.hero.scrollIndicator}</span>
        <ChevronDown className="w-4 h-4 text-primary animate-bounce-slow" />
      </button>
    </section>
  );
};
