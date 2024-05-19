import { useSelector } from "react-redux";
import { selectLoading } from "@redux/selectors/loadingSelector";

export const useLoading = () => {
  return useSelector(selectLoading);
}
