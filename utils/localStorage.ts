import { LanguageType } from '@/context/language/LanguageContext';

export const getLocalStorageLanguage = ():any => {
  return localStorage.getItem("language");
}

export const setLocalStorageLanguage = (language: LanguageType) => {
  localStorage.setItem('language', language);
}
