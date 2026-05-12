import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IProfile extends Document {
  userId: string | ObjectId;
  followers: number;
  email: string;
  posts: number;
}

const profileSchema = new Schema<IProfile>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    followers: { type: Number, default: 0 },
    email: { type: String, requird: true },
    posts: { type: Number, default: 0 }
})

export const profileModel = mongoose.model<IProfile>("Profile", profileSchema);
