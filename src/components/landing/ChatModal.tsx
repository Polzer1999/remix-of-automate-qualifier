import { useState } from "react";
import { X } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1001] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card border border-primary/30 rounded-2xl w-full max-w-[600px] max-h-[80vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fermer le chat"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="h-[80vh] max-h-[600px]">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};
