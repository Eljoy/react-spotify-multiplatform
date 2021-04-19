import { useDispatch } from 'react-redux'
import { signIn } from '../data'

export default function useAuth() {
  const dispatch = useDispatch()
  return {
    signIn: (args: { authUrl: string }) => dispatch(signIn.request(args)),
  }
}
