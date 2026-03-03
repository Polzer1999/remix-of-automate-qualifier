import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import paulPhoto from "@/assets/paul-photo.png";
import { useLanguage } from "@/i18n/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();

  const handleScrollToCalendar = () => {
    document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScrollToOffers = () => {
    document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="flex-1 flex items-center px-4 md:px-10 relative py-10 md:py-0">
      <div className="max-w-[1140px] mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          {/* Value badge */}
          <div className="inline-block bg-primary/8 border border-primary/20 rounded-full px-5 py-2.5 mb-8">
            <p className="text-primary text-sm font-medium">
              {t.hero.badge}
            </p>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-[44px] lg:text-[52px] font-extrabold text-foreground mb-5 leading-[1.1] tracking-tight">
            {t.hero.title1}
            <br />
            <span className="text-muted-foreground font-semibold">{t.hero.title2}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-foreground/80 mb-3 leading-relaxed">
            <span className="text-primary font-semibold">{t.hero.subtitle}</span> — {t.hero.subtitleEnd}
          </p>

          {/* Experience */}
          <p className="text-sm text-muted-foreground mb-2">{t.hero.experience}</p>
          
          {/* Proof */}
          <p className="text-sm text-muted-foreground/60 mb-8">{t.hero.proof}</p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              onClick={handleScrollToCalendar}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-5 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
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
        </div>
        
        {/* Photo */}
        <div className="flex-shrink-0 relative">
          <div className="relative w-40 sm:w-52 md:w-64 lg:w-72">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            <img 
              src={paulPhoto} 
              alt="Paul Larmaraud — Parrit.ai" 
              className="relative w-full h-auto object-contain"
              style={{ 
                filter: "drop-shadow(0 16px 32px rgba(0, 0, 0, 0.08))",
                animation: "float 4s ease-in-out infinite"
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button 
        onClick={handleScrollToOffers}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center cursor-pointer opacity-40 hover:opacity-70 transition-opacity duration-300"
      >
        <span className="text-xs text-muted-foreground mb-2 tracking-wide uppercase">{t.hero.scrollIndicator}</span>
        <ChevronDown className="w-5 h-5 text-primary animate-bounce-slow" />
      </button>
    </section>
  );
};
