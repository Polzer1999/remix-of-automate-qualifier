import { useLanguage } from "@/i18n/LanguageContext";

export const LogoBar = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10 px-4 border-b border-border/50">
      <div className="max-w-[1140px] mx-auto text-center">
        <p className="text-[10px] font-mono-tech tracking-[0.25em] uppercase text-muted-foreground/50 mb-6">
          {t.logoBar.title}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {["Chamas Tacos", "Lionel Mimoun Avocats"].map((name) => (
            <span key={name} className="text-foreground/25 text-sm font-medium tracking-tight hover:text-foreground/50 transition-colors duration-300">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
