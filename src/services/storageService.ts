import { StorageClient, StorageClientChoice } from '../types'
import memoryStorage from './storage/memoryStorage'
import makeAzTableClient from './storage/azTableStorage'

const makeStorageClient: (type: StorageClientChoice) => StorageClient = (
  type
) => {
  if (type === 'memory') {
    return memoryStorage
  }
  return makeAzTableClient()
}

export default makeStorageClient
