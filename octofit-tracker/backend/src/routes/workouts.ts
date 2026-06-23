import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  res.json({ workouts: [] })
})

router.post('/', async (req, res) => {
  const workout = req.body
  // TODO: persist workout
  res.status(201).json({ workout })
})

export default router
