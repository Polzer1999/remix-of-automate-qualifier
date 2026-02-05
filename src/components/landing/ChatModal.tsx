import { X } from "lucide-react";
 import { Wrench } from "lucide-react";
 import { useLanguage } from "@/i18n/LanguageContext";
 
 const maintenanceText = {
   fr: {
     title: "Chatbot en maintenance",
     message: "Notre assistant IA est actuellement en cours de déploiement. Revenez bientôt !",
     cta: "En attendant, réservez un appel",
   },
   en: {
     title: "Chatbot under maintenance",
     message: "Our AI assistant is currently being deployed. Come back soon!",
     cta: "In the meantime, book a call",
   },
   zh: {
     title: "聊天机器人维护中",
     message: "我们的AI助手正在部署中。请稍后再来！",
     cta: "同时，您可以预约通话",
   },
 };

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
   const { lang } = useLanguage();
   const text = maintenanceText[lang] || maintenanceText.fr;
 
  if (!isOpen) return null;
 
   const handleBookCall = () => {
     onClose();
     document.getElementById('calendrier')?.scrollIntoView({ behavior: 'smooth' });
   };

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
        
         {/* Body - maintenance message */}
         <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
           <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
             <Wrench className="w-8 h-8 text-primary" />
           </div>
           <h3 className="text-xl font-semibold text-foreground mb-3">
             {text.title}
           </h3>
           <p className="text-muted-foreground mb-6 max-w-[300px]">
             {text.message}
           </p>
           <button
             onClick={handleBookCall}
             className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
           >
             {text.cta}
           </button>
        </div>
      </div>
    </div>
  );
};