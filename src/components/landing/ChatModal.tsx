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
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[1001] p-4 md:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-card border border-primary/30 rounded-2xl w-full max-w-[500px] max-h-[90vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - fixed */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-primary/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Icône Parrit - deux vagues/flèches */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M 4 16 C 4 16, 8 8, 16 8 C 24 8, 28 12, 28 16 C 28 20, 24 24, 16 24 C 12 24, 8 22, 6 20 L 16 16 L 10 12 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M 16 8 L 16 24"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                className="opacity-60"
              />
              <path
                d="M 12 12 L 16 16 M 20 12 L 16 16 M 12 20 L 16 16 M 20 20 L 16 16"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeLinecap="round"
                className="opacity-40"
              />
            </svg>
            <span className="text-foreground font-medium">parrit.ai</span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Fermer le chat"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Body - scrollable chat interface */}
        <div className="flex-1 overflow-hidden min-h-0">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};