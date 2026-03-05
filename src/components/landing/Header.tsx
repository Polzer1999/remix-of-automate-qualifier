import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { key: "offers", href: "#offres" },
  { key: "systems", href: "#systemes" },
  { key: "method", href: "#methode" },
  { key: "tools", href: "#stack" },
  { key: "contact", href: "#contact" },
] as const;

export const Header = () => {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-xl font-bold tracking-tight">
          parrit<span className="text-primary">.</span>ai
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav[item.key as keyof typeof t.nav]}
            </button>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border pt-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              {t.nav[item.key as keyof typeof t.nav]}
            </button>
          ))}
          <LanguageSwitcher />
        </nav>
      )}
    </header>
  );
};
