import { useState } from "react";
import { Bot, Puzzle } from "lucide-react";
import { LeadCaptureModal, OfferType } from "./LeadCaptureModal";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { OfferCard } from "./OfferCard";

export const OffersGrid = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [selectedOffer, setSelectedOffer] = useState<{ id: OfferType; title: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePayClick = () => {
    setSelectedOffer({ id: "pay", title: t.offers.pay.title });
    setIsModalOpen(true);
  };

  const handleAgentiqueClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section id="offres" className="py-20 md:py-28 px-4 md:px-8">
        <div
          ref={ref}
          className={`max-w-[1400px] mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-[4px] mb-12">
            {t.offersSection.title}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <OfferCard
              number="01"
              icon={Bot}
              title={t.offers.pay.title}
              description={t.offers.pay.description}
              tag={t.offers.pay.badge}
              tiers={t.offers.pay.tiers}
              cta={t.offers.pay.cta}
              onCtaClick={handlePayClick}
            />
            <OfferCard
              number="02"
              icon={Puzzle}
              title={t.offers.agentique.title}
              description={t.offers.agentique.description}
              tag={t.offers.agentique.badge}
              bullets={[...t.offers.agentique.bullets]}
              cta={t.offers.agentique.cta}
              onCtaClick={handleAgentiqueClick}
            />
          </div>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offerType={selectedOffer?.id ?? null}
        offerTitle={selectedOffer?.title ?? ""}
      />
    </>
  );
};
