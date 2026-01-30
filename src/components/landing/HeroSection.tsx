import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import paulPhoto from "@/assets/paul-photo.png";

export const HeroSection = () => {
  const handleScrollToCalendar = () => {
    const element = document.getElementById('calendrier');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToOffers = () => {
    const element = document.getElementById('offres');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="flex-1 flex items-center px-4 md:px-10 relative">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          {/* Value badge */}
          <div className="inline-block bg-primary/10 border border-primary/30 rounded-lg px-5 py-3 mb-7 max-w-[500px]">
            <p className="text-primary text-[15px] font-medium italic leading-relaxed">
              Repartez avec des insights concrets pour faire grandir votre business — que nous travaillions ensemble ou non.
            </p>
          </div>
          
          {/* Pain-point title */}
          <h1 className="text-[32px] md:text-[40px] lg:text-[44px] font-bold text-foreground mb-4 leading-[1.15]">
            Vos équipes perdent 20h/semaine
            <br />
            <span className="text-muted-foreground">sur des tâches automatisables.</span>
          </h1>
          
          {/* Solution subtitle */}
          <p className="text-lg md:text-xl text-foreground/90 mb-3">
            <span className="text-primary font-semibold">IA, Automatisation & Agentique</span> — 
            <br className="sm:hidden" />
            Je construis les systèmes qui libèrent votre temps.
          </p>
          
          {/* Inline proof */}
          <p className="text-[15px] text-muted-foreground mb-7">
            Prospection automatisée • Agents IA sur-mesure • Coaching inclus
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              onClick={handleScrollToCalendar}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(154,205,50,0.4)] active:translate-y-0"
            >
              Réserver 15 min — Gratuit
            </Button>
            <Button
              onClick={handleScrollToOffers}
              variant="outline"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Voir les offres
            </Button>
          </div>
        </div>
        
        {/* Photo - hidden on small mobile, visible from sm */}
        <div className="hidden sm:flex flex-shrink-0 relative">
          <div className="relative">
            {/* Bottom fade gradient only */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            <img 
              src={paulPhoto} 
              alt="Paul - Parrit.ai" 
              className="relative w-48 md:w-64 lg:w-72 h-auto object-contain bg-transparent animate-float"
              style={{ 
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
                background: "transparent"
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button 
        onClick={handleScrollToOffers}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
      >
        <span className="text-[13px] text-muted-foreground mb-2">Découvrir les offres</span>
        <ChevronDown className="w-6 h-6 text-primary animate-bounce-slow" />
      </button>
    </section>
  );
};
