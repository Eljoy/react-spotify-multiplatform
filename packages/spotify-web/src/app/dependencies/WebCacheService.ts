import { injectable } from 'inversify'
import localforage from 'localforage'
import { CacheService } from 'spotify-core'

@injectable()
export default class WebCacheService implements CacheService {
  private localforageInstance = localforage.createInstance({})

  async removeItem(key: string): Promise<void> {
    return this.localforageInstance.removeItem(key)
  }

  async get<T>(key: string): Promise<T | null> {
    const itemStr = await this.localforageInstance.getItem<string>(key)
    try {
      return itemStr ? ((JSON.parse(itemStr) as unknown) as T) : null
    } catch (e) {
      return (itemStr as unknown) as T | null
    }
  }

  async put(key: string, item: string): Promise<void> {
    await this.localforageInstance.setItem(key, item)
  }

  getAllKeys(): Promise<string[]> {
    return this.localforageInstance.keys()
  }

  async multiRemove(keys: string[]): Promise<void> {
    await Promise.all(
      keys.map((key) => this.localforageInstance.removeItem(key))
    )
  }
}
