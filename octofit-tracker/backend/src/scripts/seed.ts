/**
 * Seed the octofit_db database with test data
 *
 * This script connects to the MongoDB database configured by MONGO_URI
 * and inserts sample documents for users, teams, activities, workouts,
 * and leaderboard entries.
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Workout from '../models/workout'
import Leaderboard from '../models/leaderboard'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB for seeding')

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  // Create users
  const users = await User.create([
    { name: 'Ava Johnson', email: 'ava@example.com', role: 'member' },
    { name: 'Liam Smith', email: 'liam@example.com', role: 'captain' },
    { name: 'Sophia Lee', email: 'sophia@example.com', role: 'member' }
  ])

  // Create a team
  const team = await Team.create({ name: 'Morning Rockets', members: [users[0]._id, users[1]._id] })

  // Update team reference on users
  await User.updateOne({ _id: users[0]._id }, { team: team._id })
  await User.updateOne({ _id: users[1]._id }, { team: team._id })

  // Create activities
  const activities = await Activity.create([
    { user: users[0]._id, type: 'run', durationMin: 35, distanceKm: 7.2, calories: 420, date: new Date() },
    { user: users[1]._id, type: 'cycle', durationMin: 60, distanceKm: 22.5, calories: 780, date: new Date() },
    { user: users[2]._id, type: 'swim', durationMin: 45, distanceKm: 1.2, calories: 500, date: new Date() }
  ])

  // Create workouts
  const workouts = await Workout.create([
    {
      user: users[0]._id,
      title: 'Full Body Strength',
      exercises: [
        { name: 'Squats', reps: 12, sets: 4 },
        { name: 'Push-ups', reps: 15, sets: 3 }
      ],
      durationMin: 50
    },
    {
      user: users[1]._id,
      title: 'Endurance Ride',
      exercises: [{ name: 'Cycling', durationMin: 60 }],
      durationMin: 60
    }
  ])

  // Create leaderboard entries
  await Leaderboard.create([
    { user: users[1]._id, score: 1500, rank: 1 },
    { user: users[0]._id, score: 1200, rank: 2 },
    { user: users[2]._id, score: 900, rank: 3 }
  ])

  console.log(`Seed complete: users=${users.length}, activities=${activities.length}, workouts=${workouts.length}`)
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('Seeding failed', err)
  process.exit(1)
})
