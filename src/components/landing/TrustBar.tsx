import { Check } from "lucide-react";

const trustItems = [
  "2,5 ans d'expertise",
  "Multi-secteurs",
  "Expertise Growth",
  "Coaching inclus",
];

export const TrustBar = () => {
  return (
    <section className="py-3 md:py-4 px-4 md:px-5 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className="group flex items-center gap-3 transition-transform duration-200 hover:scale-105">
              <Check className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
              <span className="text-muted-foreground text-sm md:text-base font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
