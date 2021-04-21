import { Auth } from "../../features";

enum Keys {
  Token = "Token"
}

export abstract class CacheService {
  async getToken(): Promise<Auth.Token | null> {
    return this.get(Keys.Token);
  }

  async putToken(token: Auth.Token): Promise<void> {
    return this.put(Keys.Token, JSON.stringify(token));
  }

  async removeToken(): Promise<void> {
    return this.removeItem(Keys.Token)
  }

  abstract put(key: string, item: string): Promise<void>

  abstract get<T>(key: string): Promise<T | null>

  abstract removeItem(key: string): Promise<void>
}
