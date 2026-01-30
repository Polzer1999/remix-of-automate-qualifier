import { MessageCircle, Zap, GraduationCap } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const reasons = [
  {
    icon: MessageCircle,
    title: "Pas de bullshit",
    text: "On parle vrai. Si un projet n'a pas de sens, on vous le dit.",
  },
  {
    icon: Zap,
    title: "Exécution rapide",
    text: "POC en 2 semaines, déploiement en 4-8 semaines selon le scope.",
  },
  {
    icon: GraduationCap,
    title: "Coaching inclus",
    text: "On ne livre pas juste un outil. On vous rend autonome.",
  },
];

const WhyCard = ({ reason, index }: { reason: typeof reasons[0]; index: number }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const Icon = reason.icon;
  
  return (
    <div 
      ref={ref}
      className={`group text-center p-6 rounded-2xl transition-all duration-300 ease-out stagger-${index + 1} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } hover:-translate-y-1 hover:bg-primary/5`}
    >
      <div className="w-[72px] h-[72px] mx-auto rounded-2xl bg-card flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {reason.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {reason.text}
      </p>
    </div>
  );
};

export const WhySection = () => {
  return (
    <section className="py-10 md:py-[60px] px-4 md:px-5">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-[28px] md:text-[32px] font-semibold text-foreground text-center mb-8 md:mb-10">
          Pourquoi travailler avec Parrit.ai ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {reasons.map((reason, index) => (
            <WhyCard key={index} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
