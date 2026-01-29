import { Button } from "@/components/ui/button";
import paulPhoto from "@/assets/paul-photo.png";

export const HeroSection = () => {
  const handleBookCall = () => {
    window.open("https://calendar.app.google/L153uVn5hqFgnQ6U9", "_blank");
  };

  const handleScrollToOffers = () => {
    const offersSection = document.getElementById("offers-section");
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Parrit.ai donne vie à vos projets de croissance
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            Déploiement produit • Automatisation • Prospection par signaux d'intention
          </p>
          <p className="text-sm md:text-base text-[#9ACD32] font-medium mb-8">
            Coaching IA & Agentique inclus dans chaque projet
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">
            <Button
              onClick={handleBookCall}
              className="bg-[#9ACD32] text-[#0a0a0a] hover:bg-[#b8e04a] font-semibold px-6 py-3 rounded-lg"
            >
              Réserver un appel découverte
            </Button>
            <Button
              onClick={handleScrollToOffers}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg"
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
            {/* Subtle glow effect behind the photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#9ACD32]/10 to-transparent blur-2xl scale-110" />
            {/* Bottom fade gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 pointer-events-none" />
            <img 
              src={paulPhoto} 
              alt="Paul - Parrit.ai" 
              className="relative w-48 md:w-64 lg:w-80 h-auto object-contain"
              style={{ 
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
