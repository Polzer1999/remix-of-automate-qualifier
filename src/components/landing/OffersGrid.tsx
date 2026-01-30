import { useState } from "react";
import { Bot, Rocket, Puzzle, GraduationCap } from "lucide-react";
import { OfferCard } from "./OfferCard";
import { LeadCaptureModal, OfferType } from "./LeadCaptureModal";

interface Offer {
  id: OfferType;
  icon: typeof Bot;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  cta: string;
  ctaAction: "modal" | "external";
  ctaUrl?: string;
  bullets?: string[];
  mention?: string;
  legalMention?: string;
  twoColumns?: {
    left: { title: string; items: string[] };
    right: { title: string; items: string[] };
  };
}

const offers: Offer[] = [
  {
    id: "pay",
    icon: Bot,
    title: "PaY — Your SAP AI Assistant",
    subtitle: "Pour utilisateurs SAP & consultants",
    description: "Trouvez vos réponses en 10 secondes au lieu de 20 minutes.",
    badge: "Accès Bêta",
    badgeColor: "#4F46E5",
    cta: "Demander l'accès bêta",
    ctaAction: "modal",
    bullets: [
      "\"Comment créer une commande d'achat ?\" → Réponse instantanée",
      "\"Erreur M7001, je fais quoi ?\" → Solution étape par étape",
      "Modules MM, FI, SD couverts",
    ],
    mention: "Base de connaissances validée par consultants seniors",
    legalMention: "PaY n'est pas affilié à SAP SE.",
  },
  {
    id: "prospection",
    icon: Rocket,
    title: "Prospection Signaux d'Intention",
    subtitle: "On remplit votre pipeline de RDV qualifiés",
    description: "Vous nous donnez votre ICP, on détecte ceux qui sont prêts à acheter.",
    badge: "Setup 5K€",
    cta: "Découvrir l'offre",
    ctaAction: "modal",
    twoColumns: {
      left: {
        title: "Ce que vous fournissez :",
        items: [
          "Votre client idéal (ICP)",
          "Votre offre et ses bénéfices",
          "Les problèmes que vous résolvez",
        ],
      },
      right: {
        title: "Ce qu'on livre :",
        items: [
          "Système de détection des signaux",
          "Pipeline alimenté en continu",
          "Leads chauds dans votre CRM",
        ],
      },
    },
    mention: "Coaching acquisition inclus dans le setup",
  },
  {
    id: "agentique",
    icon: Puzzle,
    title: "Projets Agentiques Sur-Mesure",
    subtitle: "Solutions IA pour vos défis uniques",
    description: "Automatisation, agents IA, workflows complexes — on construit ce qui n'existe pas encore.",
    badge: "Sur devis",
    cta: "Prendre RDV",
    ctaAction: "modal",
    bullets: [
      "Catalogues automatisés (maisons de vente aux enchères)",
      "Assistants WhatsApp connectés à votre CRM",
      "Process métier : franchises, juridique, RH",
      "Génération de contenu : SEO, réseaux sociaux",
    ],
    mention: "Accompagnement premium de A à Z",
  },
  {
    id: "formation",
    icon: GraduationCap,
    title: "Formation & Prise de Parole",
    subtitle: "Montez en compétence sur l'IA et l'agentique",
    description: "Pour équipes, dirigeants, ou événements — on forme et on inspire.",
    badge: "Sur demande",
    cta: "En savoir plus",
    ctaAction: "modal",
    bullets: [
      "Formation déploiement d'agents IA",
      "Masterclass \"De l'IA à l'Agentique\"",
      "Coaching individuel (outils, mindset, démos)",
      "Conférences et ateliers en entreprise",
    ],
    mention: "Formats adaptés à vos contraintes",
  },
];

export const OffersGrid = () => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
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
              ctaUrl={offer.ctaUrl}
              bullets={offer.bullets}
              mention={offer.mention}
              legalMention={offer.legalMention}
              twoColumns={offer.twoColumns}
              onModalOpen={() => handleOpenModal(offer)}
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
