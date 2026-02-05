 import { createContext, useContext, ReactNode } from 'react';
 import { useParams } from 'react-router-dom';
 import { translations, Language, Translations } from './translations';
 
 interface LanguageContextType {
   lang: Language;
   t: Translations;
 }
 
 const LanguageContext = createContext<LanguageContextType>({
   lang: 'fr',
   t: translations.fr,
 });
 
 export const useLanguage = () => useContext(LanguageContext);
 
 interface LanguageProviderProps {
   children: ReactNode;
   lang?: Language;
 }
 
 export const LanguageProvider = ({ children, lang: propLang }: LanguageProviderProps) => {
   const params = useParams<{ lang?: string }>();
   
   // Determine language from route param or prop
   let lang: Language = 'fr';
   if (propLang) {
     lang = propLang;
   } else if (params.lang === 'en' || params.lang === 'zh') {
     lang = params.lang;
   }
   
   const t = translations[lang];
   
   return (
     <LanguageContext.Provider value={{ lang, t }}>
       {children}
     </LanguageContext.Provider>
   );
 };