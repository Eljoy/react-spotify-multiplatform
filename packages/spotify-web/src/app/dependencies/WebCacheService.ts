import { CacheService } from "spotify-core";
import { injectable } from "inversify";

@injectable()
export default class WebCacheService extends CacheService {
  async removeItem(key: string): Promise<void> {
    return window.localStorage.removeItem(key);
  }

  async get<T>(key: string): Promise<T | null> {
    const itemStr = window.localStorage.getItem(key);
    try {
      return itemStr ? JSON.parse(itemStr) as unknown as T : null;
    } catch (e) {
      return itemStr as unknown as T | null;
    }
  }

  async put(key: string, item: string): Promise<void> {
    return window.localStorage.setItem(key, item);
  }
}
