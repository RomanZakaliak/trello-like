import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { ELanguage } from '../Enums/language.enum';

const supportedLangs = Object.values(ELanguage);

i18next
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: supportedLangs[0],
    supportedLngs: supportedLangs,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
