import express from "express";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getComments,
} from "../services/postServices";
import { postModel } from "../models/postModel";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/create", validateJWT, async (req, res) => {
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

router.delete("/delete/:postId", validateJWT, async (req, res) => {
  try {
    const { postId } = req.params as { postId: string };
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

router.post("/:postId/comments/create", validateJWT, async (req, res) => {
  try {
    const { postId } = req.params as { postId: string };
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

router.delete("/:postId/comments/delete/", validateJWT, async (req, res) => {
  try {
    const { postId } = req.params as { postId: string };
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
