import axios from 'axios'
import express from 'express'
import { nanoid } from 'nanoid'
import {
  ApiCreateGameRequest,
  ApiCreateGameResponse,
  ApiGetGameResponse,
  StorageClient,
} from '../types'

const mainGameKey = '__game__'

const makeApiRouter = (storage: StorageClient) => {
  const router = express.Router()

  router.get('/healthz', async (req, res) => {
    return res.status(200).json({ status: 'OK' })
  })

  router.post<{}, ApiCreateGameResponse, ApiCreateGameRequest>(
    '/games',
    async (req, res) => {
      const { gameName, teams, adminPassword } = req.body
      const gameId = nanoid()
      const teamsData = teams.map((_) => {
        const teamId = nanoid()
        return {
          teamId,
          ..._,
        }
      })

      const data = {
        gameName,
        teams: teamsData,
        adminPassword,
      }

      console.log(gameId, mainGameKey, data)
      await storage.setItem(gameId, mainGameKey, data)

      res.json({ gameId })
    }
  )

  router.get<{ gameIdentifier: string }, ApiGetGameResponse>(
    '/games/:gameIdentifier',
    async (req, res) => {
      const { gameIdentifier } = req.params
      const { data: gameInfo } = await storage.getItem(
        gameIdentifier,
        mainGameKey
      )
      if (!gameInfo) {
        throw new Error(`game with id: ${gameIdentifier} is not found`)
      }
      const { gameId, gameName, teams } = gameInfo
      res.json({ gameId, gameName, teams })
    }
  )

  router.post('/games/:sessionId/teams', async (req, res) => {
    const { sessionId } = req.params
    const { teamName } = req.body
  })

  router.post('/games/:sessionId/users', async (req, res) => {
    const { sessionId } = req.params
    const { userName } = req.body
  })

  return router
}

export default makeApiRouter
