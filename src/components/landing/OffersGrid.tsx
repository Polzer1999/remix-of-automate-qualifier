import { useState } from "react";
import { Bot, Rocket, Puzzle, GraduationCap } from "lucide-react";
import { OfferCard } from "./OfferCard";
import { LeadCaptureModal, OfferType } from "./LeadCaptureModal";
 import { useLanguage } from "@/i18n/LanguageContext";

interface Offer {
  id: OfferType;
  icon: typeof Bot;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  cta: string;
  ctaAction: "modal" | "scroll";
  bullets?: string[];
   twoColumns?: {
     left: { title: string; items: readonly string[] };
     right: { title: string; items: readonly string[] };
   };
  mention?: string;
  legalMention?: string;
}

 const icons = [Bot, Rocket, Puzzle, GraduationCap];
 const offerIds: OfferType[] = ["pay", "prospection", "agentique", "formation"];
 const ctaActions: ("modal" | "scroll")[] = ["modal", "modal", "scroll", "modal"];

export const OffersGrid = () => {
   const { t } = useLanguage();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

   // Build offers from translations
   const offers: Offer[] = [
     {
       id: "pay",
       icon: icons[0],
       title: t.offers.pay.title,
       subtitle: t.offers.pay.subtitle,
       description: t.offers.pay.description,
       badge: t.offers.pay.badge,
       badgeColor: "#4F46E5",
       cta: t.offers.pay.cta,
       ctaAction: "modal",
       bullets: [...t.offers.pay.bullets],
       mention: t.offers.pay.mention,
       legalMention: t.offers.pay.legalMention,
     },
     {
       id: "prospection",
       icon: icons[1],
       title: t.offers.prospection.title,
       subtitle: t.offers.prospection.subtitle,
       description: t.offers.prospection.description,
       badge: t.offers.prospection.badge,
       cta: t.offers.prospection.cta,
       ctaAction: "modal",
       twoColumns: t.offers.prospection.twoColumns,
       mention: t.offers.prospection.mention,
     },
     {
       id: "agentique",
       icon: icons[2],
       title: t.offers.agentique.title,
       subtitle: t.offers.agentique.subtitle,
       description: t.offers.agentique.description,
       badge: t.offers.agentique.badge,
       cta: t.offers.agentique.cta,
       ctaAction: "scroll",
       bullets: [...t.offers.agentique.bullets],
       mention: t.offers.agentique.mention,
     },
     {
       id: "formation",
       icon: icons[3],
       title: t.offers.formation.title,
       subtitle: t.offers.formation.subtitle,
       description: t.offers.formation.description,
       badge: t.offers.formation.badge,
       cta: t.offers.formation.cta,
       ctaAction: "modal",
       bullets: [...t.offers.formation.bullets],
       mention: t.offers.formation.mention,
     },
   ];
 
  const handleCtaClick = (offer: Offer) => {
    if (offer.ctaAction === "scroll") {
      document.getElementById("calendrier")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setSelectedOffer(offer);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section id="offres" className="py-10 md:py-[60px] px-4 md:px-5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {offers.map((offer, index) => (
            <OfferCard
              key={offer.id}
              icon={offer.icon}
              title={offer.title}
              subtitle={offer.subtitle}
              description={offer.description}
              badge={offer.badge}
              badgeColor={offer.badgeColor}
              cta={offer.cta}
              ctaAction={offer.ctaAction}
              bullets={offer.bullets}
              mention={offer.mention}
              legalMention={offer.legalMention}
              twoColumns={offer.twoColumns}
              onCtaClick={() => handleCtaClick(offer)}
              staggerIndex={index}
            />
          ))}
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
