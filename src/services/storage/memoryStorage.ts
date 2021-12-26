import { StorageClient } from '../../types'

const data: Record<string, { [key: string]: any }> = {}

const memoryStorage: StorageClient = {
  getItem: (partition, name, defaultValue) => {
    if (!data[partition]) {
      return defaultValue
    }
    return data[partition][name] ?? defaultValue
  },
  setItem: (partition, name, value) => {
    if (!data[partition]) {
      data[partition] = {}
    }
    data[partition][name] = value
    return Promise.resolve()
  },
  deleteItem: (partition, name) => {
    if (!data[partition]) {
      return Promise.resolve()
    }
    data[partition][name] = undefined
    return Promise.resolve()
  },
}

export default memoryStorage
