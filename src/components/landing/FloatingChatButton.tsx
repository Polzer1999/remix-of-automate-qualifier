import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { ChatModal } from "./ChatModal";

export const FloatingChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-[60px] h-[60px] bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(154,205,50,0.4)] z-50 transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_30px_rgba(154,205,50,0.6)] border-none"
        aria-label="Ouvrir le chatbot"
      >
        <MessageCircle className="w-7 h-7 text-primary-foreground" />
      </button>
      
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};
