import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center mb-8 animate-fade-in">
        <h1 className="text-5xl font-bold text-foreground mb-3 tracking-tight">
          Parit<span className="text-primary">.ai</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Automatisation & Intelligence Artificielle pour votre entreprise
        </p>
      </div>

      <ChatInterface />

      <footer className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
        <p>Parlons de votre projet d'IA et d'automatisation</p>
      </footer>
    </div>
  );
};

export default Index;