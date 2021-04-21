import { useSelector } from "react-redux";
import { userSelectors } from "../data";

export default function useCurrentUser() {
  return {
    currentUser: useSelector(userSelectors.getCurrentUser),
  };
}
