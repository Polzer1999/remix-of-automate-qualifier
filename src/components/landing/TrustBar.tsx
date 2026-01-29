import { Check } from "lucide-react";

const trustItems = [
  "+15 projets déployés",
  "3 secteurs d'activité",
  "100% sur-mesure",
  "Coaching inclus",
];

export const TrustBar = () => {
  return (
    <section className="py-6 px-4 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#9ACD32]" />
              <span className="text-muted-foreground text-sm md:text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
