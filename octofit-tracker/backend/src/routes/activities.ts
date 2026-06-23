import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  res.json({ activities: [] })
})

router.post('/', async (req, res) => {
  const activity = req.body
  // TODO: persist activity
  res.status(201).json({ activity })
})

export default router
