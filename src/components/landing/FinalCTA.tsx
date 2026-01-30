import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  const handleBookCall = () => {
    window.open("https://calendar.app.google/L153uVn5hqFgnQ6U9", "_blank");
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-card mt-10 md:mt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-[28px] md:text-[32px] font-semibold text-foreground mb-4">
          Prêt à accélérer ?
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Réservez un appel de 30 min pour discuter de votre projet. Pas de slide, pas de pitch — juste une conversation honnête.
        </p>
        
        <Button
          onClick={handleBookCall}
          className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-4 text-base rounded-lg"
        >
          Réserver un créneau
        </Button>
        
        <p className="text-sm text-muted-foreground mt-6">
          Réponse sous 24h • 100% gratuit • Sans engagement
        </p>
      </div>
    </section>
  );
};
