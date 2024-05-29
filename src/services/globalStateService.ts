import { globalState } from "@utils/globalState";
import { RootState } from "@models/dataModel";
import { globalConfig } from "@config/globalConfig";

export const globalStateService = globalState<RootState>({
  app: globalConfig,
  user: {}
});
