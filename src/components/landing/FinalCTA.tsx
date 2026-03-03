import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const FinalCTA = () => {
  const { t } = useLanguage();

  const scrollToCalendar = () => {
    document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-secondary">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
          {t.finalCta.title}
        </h2>
        <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto leading-relaxed">
          {t.finalCta.subtitle}
        </p>
        
        <Button
          onClick={scrollToCalendar}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg font-semibold px-10 py-5 text-base rounded-lg transition-all duration-200"
        >
          {t.finalCta.cta}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        
        <p className="text-sm text-muted-foreground/60 mt-5">
          {t.finalCta.proof}
        </p>
      </div>
    </section>
  );
};
