import express, { NextFunction, Request, Response } from 'express'
import apiRouter from './api/apiRouter'
import bp from 'body-parser'

type ServerConfig = {
  environment: 'prod' | 'test' | 'dev'
}

export default ({ environment }: ServerConfig) => {
  const app = express()

  app.use(bp.json())
  app.use(bp.urlencoded({ extended: true }))

  app.use('/api', apiRouter)

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
