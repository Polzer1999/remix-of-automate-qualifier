import { ParritGlyph } from "@/components/ParritGlyph";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

export const Header = () => {
  const { lang } = useLanguage();
  const homeLink = lang === 'fr' ? '/' : `/${lang}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-background/60 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-[1140px] mx-auto flex items-center justify-between">
        <a href={homeLink} className="flex items-center">
          <ParritGlyph />
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
};
