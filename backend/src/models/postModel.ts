import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface Comment {
  userId: string | ObjectId;
  postId: string | ObjectId;
  content: string;
}

const commentSchema = new Schema<Comment>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  postId: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
  content: { type: String, required: true },
});

export interface IPost extends Document {
  userId: string | ObjectId;
  content: string;
  comments?: Comment[];
  likes?: number;
}

const postSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  content: { type: String, required: true },
  comments: [commentSchema],
  likes: { type: Number, default: 0 },
});

export const postModel = mongoose.model<IPost>("Post", postSchema);
