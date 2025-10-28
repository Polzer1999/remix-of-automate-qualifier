import { ChatInterface } from "@/components/ChatInterface";
import parritLogo from "@/assets/parrit-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl mx-auto text-center mb-6 animate-slide-up">
        <img 
          src={parritLogo} 
          alt="Parrit.ai - L'Évasion de l'Administration" 
          className="w-48 sm:w-56 mx-auto mb-3 hover:scale-105 transition-transform duration-300"
        />
      </div>

      <ChatInterface />

      <footer className="mt-6 text-center text-xs sm:text-sm text-muted-foreground animate-fade-in">
        <p>Parlons de votre projet d'IA et d'automatisation 🚀</p>
      </footer>
    </div>
  );
};

export default Index;