import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const CALENDAR_LINK = "https://calendar.app.google/Mo4YPm6kTrZzbvPN9";

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center px-4 md:px-8 pt-20 pb-16">
      <div className="max-w-[1400px] mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] mb-8 max-w-4xl">
          {t.hero.headline1}
          <br />
          {t.hero.headline2}
          <br />
          <span className="text-primary">{t.hero.highlight}</span>
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed font-light">
          {t.hero.subtitle}
        </p>
        <p className="text-base md:text-lg text-foreground font-semibold mb-10">
          {t.hero.subtitleBold}
        </p>

        <a href={CALENDAR_LINK} target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="btn-shimmer bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-10 py-6 rounded-lg text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(72_100%_50%_/_0.3)]"
          >
            {t.hero.cta}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </a>
      </div>
    </section>
  );
};
