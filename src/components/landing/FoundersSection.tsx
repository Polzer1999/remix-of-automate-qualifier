import { Linkedin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export const FoundersSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Paul */}
          <div className="glass-card card-hover relative overflow-hidden rounded-2xl p-7 md:p-8">
            <h3 className="text-xl font-bold mb-1">{t.founders.paul.name}</h3>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              {t.founders.paul.role}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed font-light mb-5">
              {t.founders.paul.desc}
            </p>
            <a
              href="https://www.linkedin.com/in/paul-larmaraud-365538179/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>

          {/* Yukun */}
          <div className="glass-card card-hover relative overflow-hidden rounded-2xl p-7 md:p-8">
            <h3 className="text-xl font-bold mb-1">{t.founders.yukun.name}</h3>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              {t.founders.yukun.role}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed font-light">
              {t.founders.yukun.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
