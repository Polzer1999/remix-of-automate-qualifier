import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { OffersGrid } from "@/components/landing/OffersGrid";
import { WhySection } from "@/components/landing/WhySection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { CalendarSection } from "@/components/landing/CalendarSection";
import { FloatingChatButton } from "@/components/landing/FloatingChatButton";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero wrapper - takes exactly 100vh */}
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Spacer for fixed header */}
        <div className="pt-16 flex-shrink-0" />
        
        {/* Hero fills remaining space */}
        <div className="flex-1 flex flex-col">
          <HeroSection />
        </div>
      </div>
      
      {/* Content below the fold */}
      <OffersGrid />
      <WhySection />
      <FinalCTA />
      <CalendarSection />
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
