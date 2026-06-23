import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  role?: string
  team?: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: emailRegex },
    role: { type: String, enum: ['member', 'captain', 'admin'], default: 'member' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
)

// Ensure a unique index on email for production
UserSchema.index({ email: 1 }, { unique: true })

export default mongoose.model<IUser>('User', UserSchema)
