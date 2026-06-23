import { Router } from 'express'

const router = Router()

// GET /api/users/ - list users (placeholder)
router.get('/', async (_req, res) => {
  res.json({ users: [] })
})

// POST /api/users/ - create user (placeholder)
router.post('/', async (req, res) => {
  const user = req.body
  // TODO: persist user with Mongoose model
  res.status(201).json({ user })
})

export default router
