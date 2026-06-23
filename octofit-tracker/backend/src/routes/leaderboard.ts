import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  // TODO: compute leaderboard
  res.json({ leaderboard: [] })
})

export default router
