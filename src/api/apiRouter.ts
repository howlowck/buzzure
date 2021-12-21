import express from 'express'

const router = express.Router()

router.get('/healthz', async (req, res) => {
  return res.status(200).json({ status: 'OK' })
})

router.post('/sessions/:sessionId', async (req, res) => {
  const { sessionId } = req.params
  const { sessionName } = req.body
  // TODO: create sessions
})

router.post('/sessions/:sessionId/teams', async (req, res) => {
  const { sessionId } = req.params
  const { teamName } = req.body
})

router.post('/sessions/:sessionId/users', async (req, res) => {
  const { sessionId } = req.params
  const { userName } = req.body
})

export default router
