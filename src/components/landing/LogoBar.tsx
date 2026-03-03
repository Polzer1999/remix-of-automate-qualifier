import { useLanguage } from "@/i18n/LanguageContext";

export const LogoBar = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 px-4 border-b border-border">
      <div className="max-w-[1140px] mx-auto text-center">
        <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-8">
          {t.logoBar.title}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          <div className="logo-grayscale flex items-center gap-2">
            <span className="text-lg font-bold text-foreground/60 tracking-tight">🌮 Chamas Tacos</span>
          </div>
          <div className="logo-grayscale flex items-center gap-2">
            <span className="text-lg font-bold text-foreground/60 tracking-tight">⚖️ Lionel Mimoun Avocats</span>
          </div>
        </div>
      </div>
    </section>
  );
};
