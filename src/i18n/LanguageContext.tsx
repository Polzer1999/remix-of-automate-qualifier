import { createContext, useContext, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { translations, Language } from './translations';

// Use a generic string type so en/zh translations don't clash with fr literal types
type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
  ? DeepString<U>[]
  : T extends object
  ? { [K in keyof T]: DeepString<T[K]> }
  : T;

export type Translations = DeepString<typeof translations.fr>;

interface LanguageContextType {
  lang: Language;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  t: translations.fr as unknown as Translations,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
  lang?: Language;
}

export const LanguageProvider = ({ children, lang: propLang }: LanguageProviderProps) => {
  const params = useParams<{ lang?: string }>();
  
  let lang: Language = 'fr';
  if (propLang) {
    lang = propLang;
  } else if (params.lang === 'en' || params.lang === 'zh') {
    lang = params.lang;
  }
  
  const t = translations[lang] as unknown as Translations;
  
  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
