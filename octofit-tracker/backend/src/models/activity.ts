import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IActivity extends Document {
  user: Types.ObjectId
  type: string
  durationMin: number
  distanceKm?: number
  calories?: number
  date: Date
}

const allowedTypes = ['run', 'cycle', 'swim', 'walk', 'hike', 'row']

const ActivitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: allowedTypes },
    durationMin: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    date: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
)

// Indexes for common queries
ActivitySchema.index({ user: 1, date: -1 })
ActivitySchema.index({ date: -1 })

export default mongoose.model<IActivity>('Activity', ActivitySchema)
