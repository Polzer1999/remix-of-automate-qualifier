import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  const handleBookCall = () => {
    window.open("https://calendar.app.google/L153uVn5hqFgnQ6U9", "_blank");
  };

  return (
    <section className="py-24 md:py-28 px-4 mt-24 md:mt-28">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Prêt à accélérer ?
        </h2>
        <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
          Réservez un appel de 30 min pour discuter de votre projet. Pas de slide, pas de pitch — juste une conversation honnête.
        </p>
        
        <Button
          onClick={handleBookCall}
          className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(154,205,50,0.4)] font-semibold px-8 py-4 text-base rounded-lg transition-all duration-200"
        >
          Réserver un créneau
        </Button>
        
        <p className="text-sm text-muted-foreground/70 mt-4">
          Réponse sous 24h • 100% gratuit • Sans engagement
        </p>
      </div>
    </section>
  );
};
