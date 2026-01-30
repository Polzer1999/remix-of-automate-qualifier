import { X } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import parritLogo from "@/assets/parrit-logo.png";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/85 flex items-center justify-center z-[1001] p-4 md:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-card border border-primary/30 rounded-2xl w-full max-w-[500px] max-h-[90vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - fixed */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-primary/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src={parritLogo} alt="Parrit.ai" className="w-8 h-8" />
            <span className="text-foreground font-medium">parrit.ai</span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl transition-colors p-1"
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