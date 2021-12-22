import { config } from 'dotenv'
config()
import makeServer from './server'

const port = process.env.port ?? process.env.PORT ?? 8585
const server = makeServer({
  environment: (process.env.NODE_ENV as 'prod' | 'dev' | 'test') ?? 'prod',
  storage: process.env.AZ_STORAGE_TABLE_NAME ? 'azTable' : 'memory',
})

server.listen(port, () => {
  console.log(`Buzzure running on port ${port}!`)
})
