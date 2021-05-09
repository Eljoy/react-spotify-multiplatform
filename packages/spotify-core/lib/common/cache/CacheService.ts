import { Entities } from '../../entities'

enum Keys {
  Token = 'Token',
}

export abstract class CacheService {
  async getToken(): Promise<Entities.Token | null> {
    const tokenDAO: Record<string, unknown> = await this.get(Keys.Token)
    return tokenDAO ? Entities.Token.deserialize(tokenDAO) : null
  }

  async putToken(token: Entities.Token): Promise<void> {
    return this.put(Keys.Token, token.toString())
  }

  async removeToken(): Promise<void> {
    return this.removeItem(Keys.Token)
  }

  abstract put(key: string, item: string): Promise<void>

  abstract get<T>(key: string): Promise<T | null>

  abstract removeItem(key: string): Promise<void>

  abstract multiRemove(keys: string[]): Promise<void>

  abstract getAllKeys(): Promise<string[]>
}
