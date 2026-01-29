import { useState } from "react";
import { Bot, Rocket, Puzzle, GraduationCap } from "lucide-react";
import { OfferCard } from "./OfferCard";
import { ContactModal, OfferType } from "./ContactModal";

interface TwoColumnsData {
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
}

interface Offer {
  id: OfferType;
  icon: typeof Bot;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  cta: string;
  bullets?: string[];
  steps?: string[];
  examples?: string[];
  mention?: string;
  legalMention?: string;
  accentColor?: string;
  twoColumns?: TwoColumnsData;
}

const offers: Offer[] = [
  {
    id: "pay",
    icon: Bot,
    title: "PaY — Your SAP AI Assistant",
    subtitle: "Pour utilisateurs SAP & consultants",
    description: "Trouvez vos réponses en 10 secondes au lieu de 20 minutes.",
    badge: "Accès Bêta",
    cta: "Tester gratuitement",
    accentColor: "#4F46E5",
    bullets: [
      "\"Comment créer une commande d'achat ?\" → Réponse instantanée",
      "\"Erreur M7001, je fais quoi ?\" → Solution étape par étape",
      "Transactions, procédures, support fonctionnel",
      "Modules MM, FI, SD couverts",
      "Base de connaissances validée par consultants seniors",
      "Déploiement on-premise sécurisé ou test cloud immédiat",
    ],
    legalMention: "PaY n'est pas affilié à SAP SE.",
  },
  {
    id: "prospection",
    icon: Rocket,
    title: "Prospection Signaux d'Intention",
    description: "On génère votre croissance et on remplit votre pipeline",
    badge: "Setup 5K€",
    cta: "Découvrir l'offre",
    twoColumns: {
      left: {
        title: "Ce que vous nous donnez :",
        items: [
          "Votre ICP (client idéal)",
          "Votre produit et ses bénéfices",
          "Les problèmes qu'il résout",
          "Vos valeurs et votre positionnement",
        ],
      },
      right: {
        title: "Ce qu'on fait pour vous :",
        items: [
          "Détection des signaux d'intention",
          "Système d'acquisition automatisé",
          "Pipeline alimenté en leads chauds",
          "Coaching acquisition inclus",
        ],
      },
    },
  },
  {
    id: "agentique",
    icon: Puzzle,
    title: "Projets Agentiques",
    description: "Solutions IA & Automatisation sur-mesure pour défis uniques",
    badge: "Sur devis",
    cta: "Prendre RDV",
    examples: [
      "SEO & génération d'articles depuis briefs d'agence",
      "Contenu automatisé pour réseaux sociaux",
      "Assistant WhatsApp connecté à votre CRM",
      "Remplissage automatique de catalogues",
      "Process métier complexes (franchises, juridique...)",
      "Votre projet sur-mesure",
    ],
    mention: "High-ticket • Demandes inédites • Accompagnement premium",
  },
  {
    id: "formation",
    icon: GraduationCap,
    title: "Formation & Prise de parole",
    description: "Maîtrisez l'IA et transformez votre quotidien",
    cta: "En savoir plus",
    bullets: [
      "Formation : déployer agents & automatisations par métier",
      "Masterclass : de l'IA générative à l'agentique",
      "Coaching individuel : outils optimaux, mindset, démos live",
      "Prise de parole : conférences et ateliers pour vos équipes",
    ],
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
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-fr">
          {offers.map((offer) => (
          <OfferCard
              key={offer.id}
              icon={offer.icon}
              title={offer.title}
              subtitle={offer.subtitle}
              description={offer.description}
              badge={offer.badge}
              cta={offer.cta}
              bullets={offer.bullets}
              steps={offer.steps}
              examples={offer.examples}
              mention={offer.mention}
              legalMention={offer.legalMention}
              accentColor={offer.accentColor}
              twoColumns={offer.twoColumns}
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
