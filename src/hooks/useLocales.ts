import { useTranslation } from 'react-i18next';
import { Locale } from "@models/theme";
import { changeLocale as changeLocaleAction } from "@redux/slices/appSlice";
import { useDispatch } from "react-redux";
import { useApp } from "@hooks/useApp";

export const useLocales = () => {
  const {i18n, t} = useTranslation();
  const dispatch = useDispatch();
  const {locale, langStorageKey} = useApp();

  const storageLocale: Locale = typeof window !== 'undefined' ? localStorage.getItem(langStorageKey) : undefined;

  const currentLocale: Locale = storageLocale || locale;

  const changeLocale = (locale: Locale) => {
    dispatch(changeLocaleAction(locale));
    i18n.changeLanguage(locale);
  };

  return {
    t,
    changeLocale,
    currentLocale,
  };
}
