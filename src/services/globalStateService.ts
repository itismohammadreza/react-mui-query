import { globalState } from "@utils/globalState";
import { RootState } from "@models/common";
import { globalConfig } from "@config/globalConfig";

export const globalStateService = globalState<RootState>({
  config: globalConfig,
  user: null
});
