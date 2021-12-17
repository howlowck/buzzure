import { config } from 'dotenv'
config()
import makeServer from './server'

const port = process.env.port ?? process.env.PORT ?? 8080
const server = makeServer({
  environment: (process.env.NODE_ENV as 'prod' | 'dev' | 'test') ?? 'prod',
})

server.listen(port, () => {
  console.log(`Buzzure running on port ${port}!`)
})
