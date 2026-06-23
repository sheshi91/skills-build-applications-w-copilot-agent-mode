import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IActivity extends Document {
  user: Types.ObjectId
  type: string
  durationMin: number
  distanceKm?: number
  calories?: number
  date: Date
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMin: { type: Number, required: true },
  distanceKm: { type: Number },
  calories: { type: Number },
  date: { type: Date, default: () => new Date() }
})

export default mongoose.model<IActivity>('Activity', ActivitySchema)
