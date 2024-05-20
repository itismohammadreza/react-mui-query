import { globalStateService } from "@services/globalStateService";

export const useLoading = () => {
  return globalStateService.useSelector(state => state.loading);
}
