import { Router } from 'express'
import Leaderboard from '../models/leaderboard'

const router = Router()

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find().populate('user').sort({ rank: 1 }).lean()
  res.json({ leaderboard: entries })
})

export default router
