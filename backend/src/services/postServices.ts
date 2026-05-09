import { ObjectId } from "mongoose";
import { Comment, postModel } from "../models/postModel";
import { userModel } from "../models/userModel";

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

export const deletePost = async ({ postId }: { postId: string }) => {
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return { data: "Post not found!", statusCode: 404 };
    }
    await postModel.findByIdAndDelete(postId);

    return { data: "Post Deleted!", statusCode: 201 };
  } catch {
    return { data: "Something went wrong!", statusCode: 500 };
  }
};

export const getComments = async ({ postId }: { postId: string | ObjectId }) => {
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return { data: "Post not found!", statusCode: 404 };
    }

    return { data: post.comments, statusCode: 200 };
  } catch {
    return { data: "Something went wrong!", statusCode: 500 };
  }
};



export const createComment = async ({ userId, postId, content}: { userId: string | ObjectId, postId: string | ObjectId, content: string }) => {
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return { data: "Post not found!", statusCode: 404 };
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return { data: "user not found!", statusCode: 404 };
    }

    post.comments?.push({ userId, postId, content });
    await post.save();

    return { data: post.comments, statusCode: 200 };
  } catch {
    return { data: "Something went wrong!", statusCode: 500 };
  }
};

export const deleteComment = async ({ userId, postId, commentId }: { userId: string | ObjectId, postId: string | ObjectId, commentId: string | ObjectId }) => {
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return { data: "Post not found!", statusCode: 404 };
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return { data: "user not found!", statusCode: 404 };
    }

    if(!post.comments?.some(comment => comment._id?.toString() === commentId)) {
      return { data: "Comment not found!", statusCode: 404 };
    }
    post.comments = post.comments.filter(comment => comment._id?.toString() !== commentId);
    await post.save();

    return { data: post.comments, statusCode: 200 };
  } catch {
    return { data: "Something went wrong!", statusCode: 500 };
  }
};


