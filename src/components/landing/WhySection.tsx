import { MessageCircle, Zap, GraduationCap } from "lucide-react";

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

export const WhySection = () => {
  return (
    <section className="py-16 md:py-20 px-4 mt-10 md:mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[28px] md:text-[32px] font-semibold text-foreground text-center mb-12 md:mb-16">
          Pourquoi travailler avec Parrit.ai ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-xl bg-secondary mb-5">
                <reason.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-base">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
