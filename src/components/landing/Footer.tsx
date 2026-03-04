import { useLanguage } from "@/i18n/LanguageContext";
import { Linkedin } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-10 px-4 border-t border-border/50">
      <div className="max-w-[1140px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-foreground/80 mb-1 tracking-tight">
              {t.footer.positioning}
            </p>
            <p className="text-[10px] text-muted-foreground/50">
              {t.footer.copyright}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://docs.google.com/document/d/1q6Pq_KgNOZAkn1fE7WwD-phGn_26HVU_/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-muted-foreground/40 hover:text-foreground/60 transition-colors"
            >
              {t.footer.legal}
            </a>
            <a 
              href="https://www.linkedin.com/in/linnmanette/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/40 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
