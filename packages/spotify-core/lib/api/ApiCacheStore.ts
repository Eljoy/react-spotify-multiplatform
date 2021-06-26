import { CacheService } from '../common'
import { AppDependencies } from '../dependencies'
import { spotifyAppDecorators } from '../inversify.config'
const { lazyInject } = spotifyAppDecorators

type ExpiryItem<V> = {
  expires: number
  value: V
}

export default class ApiCacheStore {
  private readonly prefix = 'axios-cache'

  @lazyInject(AppDependencies.Common.CacheService)
  private readonly cacheService: CacheService

  calculateTTL(value) {
    const now = Date.now()
    if (value?.expires > now) {
      return value.expires - now
    }
    return -1
  }

  transformKey(key) {
    return this.prefix + '_' + key
  }

  async getItem(key) {
    const item = await this.cacheService.get<ExpiryItem<unknown>>(
      this.transformKey(key)
    )
    return item?.value
  }

  async setItem(key, value) {
    const computedKey = this.transformKey(key)
    const ttl = this.calculateTTL(value)
    if (ttl > 0) {
      const expItem: ExpiryItem<unknown> = {
        value,
        expires: ttl,
      }
      await this.cacheService.put(computedKey, JSON.stringify(expItem))
    }
    return value
  }

  async removeItem(key) {
    await this.cacheService.removeItem(this.transformKey(key))
  }

  async getCacheStoreKeys(): Promise<string[]> {
    const keys = await this.cacheService.getAllKeys()
    return keys.filter((key) => key.startsWith(this.prefix))
  }

  async clear() {
    const keysToRemove = await this.getCacheStoreKeys()
    await this.cacheService.multiRemove(keysToRemove)
  }

  async length() {
    const keys = await this.cacheService.getAllKeys()
    return keys.length
  }

  async iterate(fn: (item: unknown, key: string) => unknown) {
    const runFunction = async (key) => {
      const item = (await this.cacheService.get(key)) || null
      return await fn(item, key)
    }
    const keys = await this.getCacheStoreKeys()
    return Promise.all(keys.map((key) => runFunction(key)))
  }
}
