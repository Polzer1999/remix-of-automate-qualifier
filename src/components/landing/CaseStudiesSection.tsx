import { useLanguage } from "@/i18n/LanguageContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface CaseStudy {
  sector: string;
  title: string;
  before: string;
  after: string;
  metrics: { value: string; label: string }[];
  stack: string;
}

export const CaseStudiesSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  const cases: CaseStudy[] = t.caseStudies.cases as unknown as CaseStudy[];

  return (
    <section id="systemes" className="py-20 md:py-28 px-4 md:px-8">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-extrabold">{t.caseStudies.title}</h2>
          <span className="px-5 py-2 border-2 border-primary rounded-lg text-primary font-bold text-sm">
            {t.caseStudies.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {cases.map((c, i) => (
            <CaseCard key={i} data={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseCard = ({ data, index }: { data: CaseStudy; index: number }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`glass-card card-hover relative overflow-hidden rounded-2xl p-5 md:p-6 flex flex-col gap-4 transition-all duration-500 stagger-${index + 1} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div>
        <p className="text-[10px] text-primary uppercase tracking-[2px] font-semibold leading-relaxed">
          {data.sector}
        </p>
        <h3 className="text-base font-bold mt-2 leading-snug">{data.title}</h3>
      </div>

      {/* Before */}
      <div className="text-xs">
        <span className="label-before inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider mb-1.5">
          Avant
        </span>
        <p className="text-muted-foreground font-light leading-relaxed">{data.before}</p>
      </div>

      {/* After */}
      <div className="text-xs p-3 rounded-lg bg-primary/5 border border-primary/10">
        <span className="label-after inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider mb-1.5">
          Après
        </span>
        <p className="text-muted-foreground font-light leading-relaxed">{data.after}</p>
      </div>

      {/* Metrics */}
      <div className="flex gap-4 mt-auto">
        {data.metrics.map((m, j) => (
          <div key={j} className="flex-1">
            <p className="text-xl font-extrabold text-primary leading-none">{m.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1 font-light">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Stack */}
      <p className="text-[10px] text-muted-foreground/60 font-light">
        Stack : {data.stack}
      </p>
    </div>
  );
};
