import paulPhoto from "@/assets/paul-photo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const timelineSteps = [
  { year: "2021", key: "step1" as const },
  { year: "2022", key: "step2" as const },
  { year: "2024", key: "step3" as const },
];

export const AboutSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="py-16 md:py-24 px-4 aurora-glow">
      <div
        ref={ref}
        className={`max-w-[1140px] mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Section title */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-16 tracking-tight">
          {t.about.title}
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
          {/* Photo */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden glass-card p-1">
              <img
                src={paulPhoto}
                alt="Paul Larmaraud — Fondateur Parrit.ai"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-6">
              {t.about.text}
            </p>
            <p className="text-xs text-primary font-mono-tech uppercase tracking-widest mb-8">
              {t.about.tagline}
            </p>

            {/* Timeline */}
            <div className="relative pl-6 border-l border-border">
              {timelineSteps.map((step, i) => (
                <div key={step.key} className={`relative pb-6 last:pb-0 stagger-${i + 1}`}>
                  <div className="absolute -left-[calc(0.25rem+1.5rem)] top-1 w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-mono-tech text-muted-foreground/60 uppercase tracking-wider">{step.year}</span>
                  <p className="text-sm text-foreground/70 mt-0.5">
                    {t.about.timeline[step.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
