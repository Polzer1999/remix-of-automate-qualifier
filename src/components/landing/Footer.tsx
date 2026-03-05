import { Linkedin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-10 px-4 md:px-8 border-t border-border/50">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm font-bold tracking-tight mb-0.5">
            parrit<span className="text-primary">.</span>ai
          </p>
          <p className="text-[11px] text-muted-foreground/50">
            {t.footer.copyright}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://docs.google.com/document/d/1q6Pq_KgNOZAkn1fE7WwD-phGn_26HVU_/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-muted-foreground/40 hover:text-foreground/60 transition-colors"
          >
            {t.footer.legal}
          </a>
          <a
            href="https://www.linkedin.com/in/paul-larmaraud-365538179/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/40 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
