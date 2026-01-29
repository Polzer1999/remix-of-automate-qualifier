import { ChatInterface } from "@/components/ChatInterface";

export const ChatbotSection = () => {
  return (
    <section className="px-2 md:px-4 pb-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-muted-foreground mb-4">
          💬 Une question rapide ? Parrita vous répond.
        </p>
        <div className="animate-fade-in">
          <ChatInterface />
        </div>
      </div>
    </section>
  );
};
