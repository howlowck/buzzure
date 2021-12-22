import express, { NextFunction, Request, Response } from 'express'
import makeApiRouter from './api/apiRouter'
import bp from 'body-parser'
import { StorageClientChoice } from './types'
import makeStorageClient from './services/storageService'

type ServerConfig = {
  environment: 'prod' | 'test' | 'dev'
  storage: StorageClientChoice
}

export default ({ environment, storage }: ServerConfig) => {
  const app = express()
  const storageClient = makeStorageClient(storage)

  app.use(bp.json())
  app.use(bp.urlencoded({ extended: true }))
  app.use('/api', makeApiRouter(storageClient))

  const staticServe = express.static(`${__dirname}/static`)
  app.use('/', staticServe)
  app.use('*', staticServe)

  // Error Handling
  app.use(function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(`Unexpected error ${err.message} for request ${req}`)
    res.status(500).send()
  })

  return app
}
