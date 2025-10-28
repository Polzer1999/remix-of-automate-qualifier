import { ChatInterface } from "@/components/ChatInterface";
import parritLogo from "@/assets/parrit-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center mb-8 animate-fade-in">
        <img 
          src={parritLogo} 
          alt="Parrit.ai - L'Évasion de l'Administration" 
          className="w-64 mx-auto mb-4"
        />
      </div>

      <ChatInterface />

      <footer className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
        <p>Parlons de votre projet d'IA et d'automatisation</p>
      </footer>
    </div>
  );
};

export default Index;