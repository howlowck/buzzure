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
const adminKeyPartition = 'admin_keys'

const makeApiRouter = (storage: StorageClient) => {
  const router = express.Router()

  router.get('/healthz', async (req, res) => {
    return res.status(200).json({ status: 'OK' })
  })

  router.post<{}, ApiCreateGameResponse, ApiCreateGameRequest>(
    '/games',
    async (req, res) => {
      const { gameName, teams, adminPassword } = req.body
      const gameId = `g-${nanoid()}`
      const teamsData = teams.map((_) => {
        const teamId = `t-${nanoid()}`
        return {
          teamId,
          ..._,
        }
      })

      const data = {
        gameName,
        teams: JSON.stringify(teamsData, null, ''),
        adminPassword,
      }
      console.log(gameId, mainGameKey, data)
      const adminKey = `adminkey-${nanoid()}`
      await Promise.all([
        // Set Game Data
        storage.setItem(gameId, mainGameKey, data),
        // Generate admin key
        storage.setItem(adminKeyPartition, adminKey, {
          gameId,
        }),
      ])
      res.json({ gameId, adminKey })
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
      res.json({ gameId, gameName, teams: JSON.parse(teams) })
    }
  )
  router.get<{ adminKey: string }, ApiGetGameResponse>(
    '/games/admin-key/:adminKey',
    async (req, res) => {
      const { adminKey } = req.params
      const {
        data: { gameId },
      } = await storage.getItem(adminKeyPartition, adminKey)
      const { data: gameInfo } = await storage.getItem(gameId, mainGameKey)
      const { gameName, teams } = gameInfo
      res.json({ gameId, gameName, teams: JSON.parse(teams) })
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
