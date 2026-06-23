import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId
  score: number
  rank: number
  date: Date
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    date: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
)

// Indexes for leaderboard queries
LeaderboardSchema.index({ rank: 1 })
LeaderboardSchema.index({ score: -1 })
LeaderboardSchema.index({ user: 1, date: -1 })

export default mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema)
