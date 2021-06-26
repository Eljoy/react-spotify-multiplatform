export interface CacheService {
  put(key: string, item: string): Promise<void>

  get<T>(key: string): Promise<T | null>

  removeItem(key: string): Promise<void>

  multiRemove(keys: string[]): Promise<void>

  getAllKeys(): Promise<string[]>
}
