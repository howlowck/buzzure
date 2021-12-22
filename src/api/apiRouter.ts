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
      const { gameName, teams } = req.body
      const gameId = nanoid()
      const teamsData = teams.map((_) => {
        const teamId = nanoid()
        return {
          teamId,
          ..._,
        }
      })
      await storage.setItem(gameId, mainGameKey, {
        gameName,
        teams: teamsData,
      })

      res.json({ gameId })
    }
  )

  router.get<{ gameId: string }, ApiGetGameResponse>(
    '/games/:gameId',
    async (req, res) => {
      const { gameId } = req.params
      const { data: gameInfo } = await axios.get<ApiGetGameResponse>(
        `/api/games/${gameId}`
      )
      res.json(gameInfo)
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
