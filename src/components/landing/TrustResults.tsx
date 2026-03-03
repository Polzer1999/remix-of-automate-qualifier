import { TrendingUp, Headphones, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const icons = [TrendingUp, Headphones, ShieldCheck];

export const TrustResults = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-[1140px] mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
          {t.trustResults.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.trustResults.items.map((item, index) => {
            const Icon = icons[index];
            return <TrustCard key={index} icon={Icon} title={item.title} text={item.text} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

const TrustCard = ({ icon: Icon, title, text, index }: { icon: typeof TrendingUp; title: string; text: string; index: number }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bento-glow glass-card p-8 rounded-xl text-center transition-all duration-500 stagger-${index + 1} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-5">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
};
