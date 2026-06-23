import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  res.json({ teams: [] })
})

router.post('/', async (req, res) => {
  const team = req.body
  // TODO: persist team
  res.status(201).json({ team })
})

export default router
