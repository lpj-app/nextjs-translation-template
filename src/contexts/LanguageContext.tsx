'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie'; 

//Import translations
import PageLayoutTranslation from './PageLayoutTranslation';
import HomeTranslation from './HomeTranslation';

type Language = 'en' | 'de';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    de: {
        ...PageLayoutTranslation.de,
        ...HomeTranslation.de,
    },
    en: {
        ...PageLayoutTranslation.en,
        ...HomeTranslation.en,
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const COOKIE_NAME = 'language-template_app-lang'; 

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');
    
    // check if cookie is checked yet, helps avoid flickering
    const [isLoaded, setIsLoaded] = useState(false);

    // 3. Check Cookie on Mount
    useEffect(() => {
        const savedLanguage = Cookies.get(COOKIE_NAME) as Language;
        
        // If cookie exists and is valid, set it
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
            setLanguageState(savedLanguage);
        }
        // Set cookie on first website call
        Cookies.set(COOKIE_NAME, language, { expires: 365 }); 
        setIsLoaded(true);
    }, []);

    // Update state and Cookie
    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        Cookies.set(COOKIE_NAME, lang, { expires: 365 }); 
    };

    const t = (key: string): string => {
        // check if language is not fully loaded, fallback to en
        const currentLang = translations[language] ? language : 'en';
        return translations[currentLang][key as keyof typeof translations['en']] || key;
    };

    
    if (!isLoaded) {
        return null; 
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}