import { globalStateService } from "@services/globalStateService";
import { ConfigState } from "@models/common";
import { useTranslation } from "react-i18next";

export const useConfig = () => {
  const [state, setGlobalState] = globalStateService.use();
  const {i18n} = useTranslation();

  return [
    state.config,
    (config: Partial<ConfigState>) => {
      setGlobalState(prev => ({...prev, config: {...prev.config, ...config}}));
      if (config.locale) {
        i18n.changeLanguage(config.locale);
      }
    }
  ] as [ConfigState, (config: Partial<ConfigState>) => void]
}
