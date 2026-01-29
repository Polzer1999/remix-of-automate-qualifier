import { ChatInterface } from "@/components/ChatInterface";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { OffersGrid } from "@/components/landing/OffersGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="pt-16" />
      
      <HeroSection />
      <OffersGrid />
      
      {/* Existing Parrita Chatbot */}
      <section className="px-2 md:px-4 pb-8">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <ChatInterface />
        </div>
      </section>
    </div>
  );
};

export default Index;
