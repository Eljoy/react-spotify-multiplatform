import { CacheService } from "spotify-core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { injectable } from "inversify";

@injectable()
export default class NativeCacheService extends CacheService {
  async get<T>(key: string): Promise<T | null> {
    const itemStr = await AsyncStorage.getItem(key);
    try {
      return itemStr ? JSON.parse(itemStr) as unknown as T : null;
    } catch (e) {
      return itemStr as unknown as T | null;
    }
  }

  put(key: string, item: string): Promise<void> {
    return AsyncStorage.setItem(key, item)
  }

  removeItem(key: string): Promise<void> {
    return AsyncStorage.removeItem(key)
  }
}
