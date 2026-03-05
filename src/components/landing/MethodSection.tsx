import { useLanguage } from "@/i18n/LanguageContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export const MethodSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="methode" className="py-20 md:py-28 px-4 md:px-8">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12">{t.method.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.method.steps.map((step, i) => (
            <div
              key={i}
              className="glass-card card-hover relative overflow-hidden rounded-2xl p-6 flex flex-col"
            >
              <span className="absolute top-3 right-4 text-5xl font-black text-primary/10 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-bold mb-2 relative z-10">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed relative z-10 flex-grow">
                {step.desc}
              </p>
              <span className="inline-block mt-4 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                {step.timeline}
              </span>
            </div>
          ))}
        </div>

        {/* Differentiator */}
        <div className="mt-8 p-5 glass-card rounded-xl border border-border flex items-start gap-4">
          <span className="text-primary text-xl flex-shrink-0">⚡</span>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            {t.method.diff}
          </p>
        </div>
      </div>
    </section>
  );
};
