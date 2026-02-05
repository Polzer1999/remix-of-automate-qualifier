import { ParritGlyph } from "@/components/ParritGlyph";
 import { LanguageSwitcher } from "./LanguageSwitcher";
 import { useLanguage } from "@/i18n/LanguageContext";

export const Header = () => {
   const { lang } = useLanguage();
   
   // Build home link based on language
   const homeLink = lang === 'fr' ? '/' : `/${lang}`;
 
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#333333]/50">
       <div className="max-w-6xl mx-auto flex items-center justify-between">
         <a href={homeLink} className="flex items-center">
          <ParritGlyph />
        </a>
         <LanguageSwitcher />
      </div>
    </header>
  );
};
