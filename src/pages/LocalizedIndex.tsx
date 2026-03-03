import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { LogoBar } from "@/components/landing/LogoBar";
import { OffersGrid } from "@/components/landing/OffersGrid";
import { AboutSection } from "@/components/landing/AboutSection";
import { WhySection } from "@/components/landing/WhySection";
import { TrustResults } from "@/components/landing/TrustResults";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { CalendarSection } from "@/components/landing/CalendarSection";
import { FloatingChatButton } from "@/components/landing/FloatingChatButton";
import { Footer } from "@/components/landing/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";

interface LocalizedIndexProps {
  lang?: Language;
}

const LocalizedIndex = ({ lang }: LocalizedIndexProps) => {
  return (
    <LanguageProvider lang={lang}>
      <div className="min-h-screen bg-background">
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="pt-16 flex-shrink-0" />
          <div className="flex-1 flex flex-col">
            <HeroSection />
          </div>
        </div>
        
        <LogoBar />
        <OffersGrid />
        <AboutSection />
        <WhySection />
        <TrustResults />
        <FinalCTA />
        <CalendarSection />
        <Footer />
        <FloatingChatButton />
      </div>
    </LanguageProvider>
  );
};

export default LocalizedIndex;
