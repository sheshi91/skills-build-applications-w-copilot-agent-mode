import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IWorkout extends Document {
  user?: Types.ObjectId
  team?: Types.ObjectId
  title: string
  exercises: { name: string; reps?: number; sets?: number; durationMin?: number }[]
  durationMin?: number
  date: Date
}

const ExerciseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    reps: { type: Number, min: 1 },
    sets: { type: Number, min: 1 },
    durationMin: { type: Number, min: 1 }
  },
  { _id: true }
)

const WorkoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    title: { type: String, required: true, trim: true, minlength: 3 },
    exercises: { type: [ExerciseSchema], default: [] },
    durationMin: { type: Number, min: 1 },
    date: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
)

// Indexes for common queries
WorkoutSchema.index({ user: 1, date: -1 })
WorkoutSchema.index({ team: 1, date: -1 })

export default mongoose.model<IWorkout>('Workout', WorkoutSchema)
