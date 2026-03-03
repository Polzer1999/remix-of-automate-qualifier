import paulPhoto from "@/assets/paul-photo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export const AboutSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="py-16 md:py-24 px-4">
      <div
        ref={ref}
        className={`max-w-[1140px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden bg-secondary">
            <img
              src={paulPhoto}
              alt="Linn Manette — Fondateur Parrit.ai"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
            {t.about.text}
          </p>
          <p className="text-sm text-muted-foreground/70 italic">
            {t.about.tagline}
          </p>
        </div>
      </div>
    </section>
  );
};
