import express from "express";
import { getProfile } from "../services/profileServices";
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, statusCode } = await getProfile({ userId });
    res.status(statusCode).send(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
