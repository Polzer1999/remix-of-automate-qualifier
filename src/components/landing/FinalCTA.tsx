import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  const handleBookCall = () => {
    window.open("https://calendar.app.google/L153uVn5hqFgnQ6U9", "_blank");
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-[#111111]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Prêt à accélérer ?
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Réservez un appel de 30 min pour discuter de votre projet. Pas de slide, pas de pitch — juste une conversation honnête.
        </p>
        
        <Button
          onClick={handleBookCall}
          className="w-full sm:w-auto bg-[#9ACD32] text-[#0a0a0a] hover:bg-[#b8e04a] font-semibold px-8 py-4 text-lg rounded-lg"
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
