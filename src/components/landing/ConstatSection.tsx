import { useLanguage } from "@/i18n/LanguageContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, useState, useRef } from "react";

const useCountUp = (end: number, duration: number, start: boolean) => {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, end, duration]);

  return value;
};

export const ConstatSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const count = useCountUp(80, 2000, isVisible);

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left — big number */}
          <div>
            <div className="big-number glow-lime">{count}<span className="text-[0.4em]">%</span></div>
            <p className="text-lg text-muted-foreground font-light mt-4">{t.constat.label}</p>
          </div>

          {/* Right — explanation */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-6">
              {t.constat.title}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed font-light mb-4">
              {t.constat.text1}
            </p>
            <p className="text-muted-foreground text-base leading-relaxed font-light mb-8">
              {t.constat.text2}
            </p>
            <div className="border-l-4 border-primary pl-6 py-2">
              <p className="text-lg font-semibold leading-snug">
                {t.constat.punchline1}
                <br />
                <span className="text-primary">{t.constat.punchline2}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
