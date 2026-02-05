 import { useLanguage } from "@/i18n/LanguageContext";
 
export const Footer = () => {
   const { t } = useLanguage();
 
  return (
    <footer className="py-6 px-4 md:px-5 border-t border-primary/20 text-center">
      <div className="flex justify-center items-center gap-6 flex-wrap">
        <p className="text-muted-foreground text-sm m-0">
           {t.footer.copyright}
        </p>
        <a 
          href="https://docs.google.com/document/d/1q6Pq_KgNOZAkn1fE7WwD-phGn_26HVU_/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/80 text-sm no-underline hover:text-primary transition-colors"
        >
           {t.footer.legal}
        </a>
      </div>
    </footer>
  );
};
