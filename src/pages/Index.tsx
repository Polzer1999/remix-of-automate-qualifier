import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FoundersSection } from "@/components/landing/FoundersSection";
import { ConstatSection } from "@/components/landing/ConstatSection";
import { OffersGrid } from "@/components/landing/OffersGrid";
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection";
import { MethodSection } from "@/components/landing/MethodSection";
import { StackSection } from "@/components/landing/StackSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { FloatingChatButton } from "@/components/landing/FloatingChatButton";
import { LanguageProvider } from "@/i18n/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider lang="fr">
      <div className="min-h-screen bg-background noise-bg">
        <Header />
        <HeroSection />
        <FoundersSection />
        <ConstatSection />
        <OffersGrid />
        <CaseStudiesSection />
        <MethodSection />
        <StackSection />
        <FinalCTA />
        <Footer />
        <FloatingChatButton />
      </div>
    </LanguageProvider>
  );
};

export default Index;
