import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  role?: string
  team?: Types.ObjectId
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  createdAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<IUser>('User', UserSchema)
