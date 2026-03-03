import { MessageCircle, Zap, GraduationCap } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [MessageCircle, Zap, GraduationCap];

interface Reason { title: string; text: string; }

const WhyCard = ({ reason, index, icon: Icon }: { reason: Reason; index: number; icon: typeof MessageCircle }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref}
      className={`bento-glow glass-card text-center p-8 rounded-xl transition-all duration-500 stagger-${index + 1} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">{reason.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{reason.text}</p>
    </div>
  );
};

export const WhySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12 tracking-tight">
          {t.why.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.why.reasons.map((reason, index) => (
            <WhyCard key={index} reason={reason} index={index} icon={icons[index]} />
          ))}
        </div>
      </div>
    </section>
  );
};
