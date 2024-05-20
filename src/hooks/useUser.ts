import { globalStateService } from "@services/globalStateService";

export const useUser = () => {
  return globalStateService.useSelector(state => state.user);
}
