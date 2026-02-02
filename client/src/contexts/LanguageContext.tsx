import React, { createContext, useContext, useState, ReactNode } from 'react';
import { content, Language } from '@/lib/content';

// Define a recursive type that allows string values to vary between languages
type DeepContent = {
  [key: string]: string | string[] | DeepContent | readonly string[] | readonly DeepContent[];
};

// Use the English content structure as the base type, but allow values to be strings (not just specific string literals)
type Content = typeof content.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('sv');

  return (
    // Cast content[language] to Content to satisfy TypeScript
    // This is safe because both en and sv objects follow the same structural schema
    <LanguageContext.Provider value={{ language, setLanguage, t: content[language] as unknown as Content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
