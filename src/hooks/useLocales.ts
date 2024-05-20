import { useTranslation } from 'react-i18next';
import { Locale } from "@models/theme";
import { useApp } from "@hooks/useApp";

export const useLocales = () => {
  const {i18n, t} = useTranslation();
  const {locale, langStorageKey, setAppConfig} = useApp();

  const storageLocale: Locale = typeof window !== 'undefined' ? localStorage.getItem(langStorageKey) : undefined;

  const currentLocale: Locale = storageLocale || locale;

  const changeLocale = (locale: Locale) => {
    setAppConfig({locale});
    i18n.changeLanguage(locale);
  };

  return {
    t,
    changeLocale,
    currentLocale,
  };
}
