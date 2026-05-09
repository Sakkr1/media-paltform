import express from "express";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getComments,
} from "../services/postServices";
import { postModel } from "../models/postModel";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/create", async (req, res) => {
  try {
    const { userId, content, likes, comments } = req.body;
    const { data, statusCode } = await createPost({
      userId,
      content,
      likes,
      comments,
    });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.delete("/delete/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { data, statusCode } = await deletePost({ postId });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.get("/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const { data, statusCode } = await getComments({ postId });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/:postId/comments/create", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;
    const { data, statusCode } = await createComment({
      userId,
      postId,
      content,
    });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.delete("/:postId/comments/delete/", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, commentId } = req.body;
    const { data, statusCode } = await deleteComment({
      userId,
      postId,
      commentId,
    });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
