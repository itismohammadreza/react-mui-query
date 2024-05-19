import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enLocales from './en/common';
import faLocales from './fa/common';
import { globalConfig } from "@config/globalConfig";
import { Locale } from "@models/theme";

const resources: Partial<Record<Locale, { translation: any }>> = {
  'enUS': {translation: enLocales},
  'faIR': {translation: faLocales},
}

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
  resources,
  lng: globalConfig.locale,
  fallbackLng: globalConfig.locale,
  detection: {
    lookupLocalStorage: globalConfig.langStorageKey,
    lookupSessionStorage: globalConfig.langStorageKey
  },
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
