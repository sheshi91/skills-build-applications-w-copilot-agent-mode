import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId
  score: number
  rank: number
  date: Date
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  date: { type: Date, default: () => new Date() }
})

export default mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema)
