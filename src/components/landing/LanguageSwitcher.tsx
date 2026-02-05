 import { useNavigate, useLocation } from 'react-router-dom';
 import { useLanguage } from '@/i18n/LanguageContext';
 import { Globe } from 'lucide-react';
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
 } from '@/components/ui/dropdown-menu';
 import { Button } from '@/components/ui/button';
 
 const languages = [
   { code: 'fr', label: 'FR', flag: '🇫🇷' },
   { code: 'en', label: 'EN', flag: '🇬🇧' },
   { code: 'zh', label: '中文', flag: '🇨🇳' },
 ] as const;
 
 export const LanguageSwitcher = () => {
   const { lang } = useLanguage();
   const navigate = useNavigate();
   const location = useLocation();
 
   const handleLanguageChange = (newLang: string) => {
     // Get current path without language prefix
     let currentPath = location.pathname;
     
     // Remove existing language prefix if present
     if (currentPath.startsWith('/en') || currentPath.startsWith('/zh')) {
       currentPath = currentPath.slice(3) || '/';
     }
     
     // Navigate to new language path
     if (newLang === 'fr') {
       navigate(currentPath);
     } else {
       navigate(`/${newLang}${currentPath === '/' ? '' : currentPath}`);
     }
   };
 
   const currentLang = languages.find(l => l.code === lang) || languages[0];
 
   return (
     <DropdownMenu>
       <DropdownMenuTrigger asChild>
         <Button 
           variant="ghost" 
           size="sm"
           className="gap-2 text-foreground/80 hover:text-foreground hover:bg-foreground/10"
         >
           <Globe className="h-4 w-4" />
           <span className="hidden sm:inline">{currentLang.flag} {currentLang.label}</span>
           <span className="sm:hidden">{currentLang.flag}</span>
         </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align="end" className="bg-card border-primary/30">
         {languages.map((language) => (
           <DropdownMenuItem
             key={language.code}
             onClick={() => handleLanguageChange(language.code)}
             className={`cursor-pointer ${lang === language.code ? 'bg-primary/20 text-primary' : ''}`}
           >
             <span className="mr-2">{language.flag}</span>
             {language.label}
           </DropdownMenuItem>
         ))}
       </DropdownMenuContent>
     </DropdownMenu>
   );
 };