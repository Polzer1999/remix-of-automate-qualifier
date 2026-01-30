import { Button } from "@/components/ui/button";
import paulPhoto from "@/assets/paul-photo.png";

export const HeroSection = () => {
  const handleScrollToCalendar = () => {
    document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToOffers = () => {
    const offersSection = document.getElementById('offres');
    if (offersSection) {
      const yOffset = -20;
      const y = offersSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 md:py-14 px-4 md:px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-[40px] md:text-[44px] lg:text-[48px] font-bold text-foreground mb-6 leading-tight">
            Parrit.ai donne vie à vos projets de croissance
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            Déploiement produit • Automatisation • Prospection par signaux d'intention
          </p>
          <p className="text-base md:text-lg text-primary font-medium italic mb-8">
            Coaching IA & Agentique inclus dans chaque projet
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">
            <Button
              onClick={handleScrollToCalendar}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-3 rounded-lg text-base"
            >
              Réserver un appel découverte
            </Button>
            <Button
              onClick={handleScrollToOffers}
              variant="outline"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold px-6 py-3 rounded-lg text-base"
            >
              Voir les offres
            </Button>
          </div>
          
          {/* Social proof */}
          <p className="text-sm text-muted-foreground">
            Déjà 15+ projets livrés • Maisons de vente • Restauration • Services B2B
          </p>
        </div>
        
        {/* Photo - hidden on small mobile, visible from md */}
        <div className="hidden sm:flex flex-shrink-0 relative">
          <div className="relative">
            {/* Bottom fade gradient only */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            <img 
              src={paulPhoto} 
              alt="Paul - Parrit.ai" 
              className="relative w-48 md:w-64 lg:w-80 h-auto object-contain bg-transparent"
              style={{ 
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
                background: "transparent"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
