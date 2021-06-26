import { Entities } from '../../../entities'

export interface AuthService {
  validateToken(token: Entities.Token): boolean

  requestToken(code: string, redirectUri: string): Promise<Entities.Token>

  refreshToken(token: Entities.Token): Promise<Entities.Token>
}
