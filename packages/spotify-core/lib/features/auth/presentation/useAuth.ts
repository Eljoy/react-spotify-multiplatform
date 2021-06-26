import { useDispatch, useSelector } from "react-redux";
import { authSelectors, signIn, signOut } from "../data";

export default function useAuth() {
  const dispatch = useDispatch()
  return {
    signIn: () => dispatch(signIn.request()),
    signOut: () => dispatch(signOut.request()),
    isSignedIn: useSelector(authSelectors.isSignedIn)
  }
}
