import { Check } from "lucide-react";

const trustItems = [
  "+15 projets déployés",
  "3 secteurs d'activité",
  "100% sur-mesure",
  "Coaching inclus",
];

export const TrustBar = () => {
  return (
    <section className="py-6 px-4 bg-secondary mt-10 md:mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-muted-foreground text-sm md:text-base font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
