import express from 'express'

const router = express.Router()

router.get('/healthz', async (req, res) => {
  return res.status(200).json({ status: 'OK' })
})

export default router
