import { Entities } from '../../../entities'

export interface AuthApi {
  refreshToken(token: Entities.Token): Promise<Entities.Token>

  requestToken(code: string, redirectUri: string): Promise<Entities.Token>
}
