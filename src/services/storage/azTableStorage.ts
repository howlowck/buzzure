import {
  TableServiceClient,
  AzureNamedKeyCredential,
  TableClient,
} from '@azure/data-tables'

const account = '<account>'
const accountKey = '<accountkey>'

const credential = new AzureNamedKeyCredential(account, accountKey)
const serviceClient = new TableServiceClient(
  `https://${account}.table.core.windows.net`,
  credential
)

const makeClient = async () => {
  const tableName = `buzzure_table`
  // If the table 'newTable' already exists, createTable doesn' throw
  await serviceClient.createTable(tableName)
  const client = new TableClient(
    `https://${account}.table.core.windows.net`,
    tableName,
    credential
  )
}
