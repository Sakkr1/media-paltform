import express from "express";
import { createPost, deletePost } from "../services/postServices";
import { postModel } from "../models/postModel";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await postModel.find();
    console.log(posts);
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

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, statusCode } = await deletePost({ id });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});
export default router;
