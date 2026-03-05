import { ArrowRight, Check, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const CALENDAR_LINK = "https://calendar.app.google/Mo4YPm6kTrZzbvPN9";

export const FinalCTA = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="contact" className="py-20 md:py-28 px-4 md:px-8">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8">
              {t.contact.title1}
              <br />
              <span className="text-primary">{t.contact.title2}</span>
            </h2>
            <p className="text-muted-foreground text-base font-light leading-relaxed mb-8">
              {t.contact.subtitle}
            </p>

            <div className="space-y-4">
              {t.contact.promises.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground font-light">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center gap-6">
            <a href={CALENDAR_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="btn-shimmer bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-12 py-6 rounded-lg text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(72_100%_50%_/_0.3)]"
              >
                {t.contact.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>

            <div className="text-center text-sm text-muted-foreground font-light space-y-1">
              <p>
                <a href="mailto:paul.larmaraud@parrit.ai" className="text-primary hover:underline">
                  paul.larmaraud@parrit.ai
                </a>
              </p>
              <a
                href="https://www.linkedin.com/in/paul-larmaraud-365538179/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
