import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustBar } from "@/components/landing/TrustBar";
import { OffersGrid } from "@/components/landing/OffersGrid";
import { WhySection } from "@/components/landing/WhySection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ChatbotSection } from "@/components/landing/ChatbotSection";
import { FloatingChatButton } from "@/components/landing/FloatingChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="pt-16" />
      
      <HeroSection />
      <TrustBar />
      <OffersGrid />
      <WhySection />
      <FinalCTA />
      <ChatbotSection />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
