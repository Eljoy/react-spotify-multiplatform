import AsyncStorage from '@react-native-async-storage/async-storage';
import {injectable} from 'inversify';
import {CacheService} from 'spotify-core';

@injectable()
export default class NativeCacheService implements CacheService {
  async get<T>(key: string): Promise<T | null> {
    const itemStr = await AsyncStorage.getItem(key);
    try {
      return itemStr ? ((JSON.parse(itemStr) as unknown) as T) : null;
    } catch (e) {
      return (itemStr as unknown) as T | null;
    }
  }

  put(key: string, item: string): Promise<void> {
    if(item === null){
      return this.removeItem(key)
    } else {
      return AsyncStorage.setItem(key, item);
    }
  }

  removeItem(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }

  getAllKeys(): Promise<string[]> {
    return AsyncStorage.getAllKeys();
  }

  multiRemove(keys: string[]): Promise<void> {
    return AsyncStorage.multiRemove(keys);
  }
}
