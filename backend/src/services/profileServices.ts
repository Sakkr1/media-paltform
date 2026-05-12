import { Types } from "mongoose";
import { postModel } from "../models/postModel";
import { userModel } from "../models/userModel";

export const getProfile = async ({ userId }: { userId: string }) => {
  try {
    const findUser = await userModel.findById(userId);
    if (!findUser) {
      return { data: "User does not exists!", statusCode: 400 };
    }

    const userPosts = await postModel.find({ userId: new Types.ObjectId(userId) });
    if (!userPosts) {
      return { data: "Posts does not exists!", statusCode: 400 };
    }

    const profile = {
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      followers: findUser.followers,
      email: findUser.email,
      posts: userPosts,
    };

    return { data: profile, statusCode: 200 };
  } catch (err){
    console.log(err);
    return { data: "Something went wrong!", statusCode: 500 };
  }
};
