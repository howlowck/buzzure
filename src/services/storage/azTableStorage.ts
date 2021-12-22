import {
  TableServiceClient,
  AzureNamedKeyCredential,
  TableClient,
} from '@azure/data-tables'
import { StorageClient } from '../../types'

const makeClient: () => StorageClient = () => {
  const account = process.env.AZ_STORAGE_ACCOUNT_NAME!
  const accountKey = process.env.AZ_STORAGE_ACCOUNT_ACCESS_KEY!
  const tableName = process.env.AZ_STORAGE_TABLE_NAME!

  const credential = new AzureNamedKeyCredential(account, accountKey)
  const client = new TableClient(
    `https://${account}.table.core.windows.net`,
    tableName,
    credential
  )
  const storageClient: StorageClient = {
    getItem: async <T extends object>(
      partition: string,
      row: string,
      defaultValue?: T
    ) => {
      const entity = await client.getEntity<T>(partition, row)
      return entity ?? defaultValue
    },
    setItem: async <T extends object>(
      partitionKey: string,
      rowKey: string,
      value: T
    ) => {
      const entity = {
        partitionKey,
        rowKey,
        ...value,
      }
      await client.upsertEntity(entity, 'Replace')
    },
    deleteItem: async (partitionKey: string, rowKey: string) => {
      await client.deleteEntity(partitionKey, rowKey)
    },
  }
  return storageClient
}

export default makeClient
