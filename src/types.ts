export interface StorageClient {
  getItem: <T>(property: string, defaultValue?: T) => Promise<T>
  setItem: <T>(property: string, value: T) => Promise<void>
}
