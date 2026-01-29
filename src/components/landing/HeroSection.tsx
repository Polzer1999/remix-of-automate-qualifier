import paulPhoto from "@/assets/paul-photo.png";

export const HeroSection = () => {
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
          <p className="text-sm md:text-base text-[#9ACD32] font-medium">
            Coaching IA & Agentique inclus dans chaque projet
          </p>
        </div>
        
        {/* Photo - hidden on small mobile, visible from md */}
        <div className="hidden sm:flex flex-shrink-0 relative">
          <div className="relative">
            {/* Subtle glow effect behind the photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#9ACD32]/10 to-transparent blur-2xl scale-110" />
            <img 
              src={paulPhoto} 
              alt="Paul - Parrit.ai" 
              className="relative w-48 md:w-64 lg:w-80 h-auto object-contain drop-shadow-2xl"
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
