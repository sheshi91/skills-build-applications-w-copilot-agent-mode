import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ITeam extends Document {
  name: string
  members: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
)

// Index team name for fast lookup
TeamSchema.index({ name: 1 })

export default mongoose.model<ITeam>('Team', TeamSchema)
