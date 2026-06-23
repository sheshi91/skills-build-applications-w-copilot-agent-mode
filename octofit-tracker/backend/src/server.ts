import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
const PORT = Number(process.env.PORT || 8000)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

app.use(express.json())

// Codespaces-aware API URL support
// If running in Codespaces the forwarded preview host is: {CODESPACE_NAME}-<port>.githubpreview.dev
const codespaceName = process.env.CODESPACE_NAME
const codespaceApiUrl = codespaceName ? `https://${codespaceName}-8000.githubpreview.dev` : undefined

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  codespaceApiUrl
].filter(Boolean) as string[]

app.use(cors({ origin: allowedOrigins }))

// Basic health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// API routes
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

async function start() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.warn('Could not connect to MongoDB:', err)
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    if (codespaceApiUrl) {
      console.log(`Codespaces preview URL: ${codespaceApiUrl}`)
    }
  })
}

start()
