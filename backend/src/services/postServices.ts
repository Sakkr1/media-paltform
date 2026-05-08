import { ObjectId } from "mongoose";
import { Comment, postModel } from "../models/postModel";

type post = {
  userId: string | ObjectId;
  content: string;
  comments?: Comment[];
  likes?: number;
};

export const createPost = async ({
  userId,
  content,
  likes = 0,
  comments = [],
}: post) => {
  try {
    const newPost = await postModel.create({
      userId,
      content,
      likes,
      comments,
    });
    await newPost.save();
    return { data: newPost, statusCode: 201 };
  } catch {
    return { data: "Something went wrong!", statusCode: 500 };
  }
};

export const deletePost = async ({ id }: { id: string }) => {
  try {
    const post = await postModel.findById(id);
    if (!post) {
      return { data: "Post not found!", statusCode: 404 };
    }
    await postModel.findByIdAndDelete(id);

    return { data: "Post Deleted!", statusCode: 201 };
  } catch {
    return { data: "Something went wrong!", statusCode: 500 };
  }
};
