import { createContext } from 'react';

export type LanguageType = 
| "ES"
| "EN" 

interface ContextProps {
    language: LanguageType;
    changeLanguage: (language: LanguageType) => void
}

export const LanguageContext = createContext({} as ContextProps);