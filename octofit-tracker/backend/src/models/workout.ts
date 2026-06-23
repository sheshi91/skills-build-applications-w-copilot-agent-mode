import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IWorkout extends Document {
  user?: Types.ObjectId
  team?: Types.ObjectId
  title: string
  exercises: { name: string; reps?: number; sets?: number; durationMin?: number }[]
  durationMin?: number
  date: Date
}

const WorkoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  title: { type: String, required: true },
  exercises: [
    {
      name: String,
      reps: Number,
      sets: Number,
      durationMin: Number
    }
  ],
  durationMin: Number,
  date: { type: Date, default: () => new Date() }
})

export default mongoose.model<IWorkout>('Workout', WorkoutSchema)
