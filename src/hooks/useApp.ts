import { useSelector } from "react-redux";
import { selectApp } from "@redux/selectors/appSelector";

export const useApp = () => {
  return useSelector(selectApp);
}
