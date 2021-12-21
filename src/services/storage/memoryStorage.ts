import { StorageClient } from '../../types'

const data: { [key: string]: any } = {}

const memoryStorage: StorageClient = {
  getItem: (name) => {
    return data[name]
  },
  setItem: (name, value) => {
    data[name] = value
    return Promise.resolve()
  },
}

export default memoryStorage
