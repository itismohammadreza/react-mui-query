import { useSelector } from "react-redux";
import { selectUser } from "@redux/selectors/userSelector";

export const useUser = () => {
  return useSelector(selectUser);
}
