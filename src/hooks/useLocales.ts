import { useTranslation } from 'react-i18next';
import { Locale } from "@models/theme";
import { useApp } from "@hooks/useApp";
import { Nullable } from "@models/common";

export const useLocales = () => {
  const {i18n, t} = useTranslation();
  const {locale, langStorageKey, setAppConfig} = useApp();

  const storageLocale: Nullable<Locale> = typeof window !== 'undefined' ? localStorage.getItem(langStorageKey) as Locale : undefined;

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
