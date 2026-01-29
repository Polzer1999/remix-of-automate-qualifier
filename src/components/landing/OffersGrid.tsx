import { useState } from "react";
import { Bot, Rocket, Puzzle, GraduationCap } from "lucide-react";
import { OfferCard } from "./OfferCard";
import { ContactModal, OfferType } from "./ContactModal";

interface Offer {
  id: OfferType;
  icon: typeof Bot;
  title: string;
  description: string;
  badge?: string;
  cta: string;
}

const offers: Offer[] = [
  {
    id: "sap",
    icon: Bot,
    title: "Chatbot SAP",
    description: "Votre assistant IA connecté à SAP",
    badge: "Bêta",
    cta: "Devenir testeur",
  },
  {
    id: "growth",
    icon: Rocket,
    title: "Growth Machine",
    description: "Des leads qualifiés dans votre pipeline",
    badge: "5K€",
    cta: "Découvrir",
  },
  {
    id: "custom",
    icon: Puzzle,
    title: "Projets Sur-mesure",
    description: "IA & automatisation pilotés de A à Z",
    cta: "Discutons",
  },
  {
    id: "formation",
    icon: GraduationCap,
    title: "Formation",
    description: "Formez vos équipes à l'IA et l'automatisation",
    cta: "En savoir plus",
  },
];

export const OffersGrid = () => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="px-4 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              icon={offer.icon}
              title={offer.title}
              description={offer.description}
              badge={offer.badge}
              cta={offer.cta}
              onClick={() => handleCardClick(offer)}
            />
          ))}
        </div>
      </section>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offerType={selectedOffer?.id ?? null}
        offerTitle={selectedOffer?.title ?? ""}
      />
    </>
  );
};
