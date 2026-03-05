import { useLanguage } from "@/i18n/LanguageContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const tools = [
  "Claude", "Alibaba Cloud", "Microsoft", "Monday.com", "Baidu", "Unity", "Docker",
  "Dify", "Anthropic", "Gemini", "xAI", "HeyGen", "LangChain", "Midjourney",
  "Perplexity", "Make.com", "Lovable", "Tencent", "Vertex AI", "Cursor", "N8N",
];

export const StackSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="stack" className="py-20 md:py-28 px-4 md:px-8">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-primary text-xs font-semibold uppercase tracking-[4px] mb-3">
          {t.stack.label}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{t.stack.title}</h2>
        <p className="text-muted-foreground text-sm font-light mb-12 max-w-2xl">
          {t.stack.subtitle}
        </p>

        {/* Tools grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 mb-10">
          {tools.map((tool) => (
            <div
              key={tool}
              className="glass-card rounded-xl p-3 text-center text-xs font-medium text-foreground/70 hover:border-primary/40 hover:text-foreground transition-all duration-200 cursor-default"
            >
              {tool}
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {t.stack.cards.map((card, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-bold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Integration notice */}
        <div className="glass-card rounded-xl p-5 flex items-start gap-3">
          <span className="text-primary text-lg flex-shrink-0">🔌</span>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            {t.stack.integration}
          </p>
        </div>
      </div>
    </section>
  );
};
