import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import postRouter from "./routes/postRoute";
import cors from "cors"

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use("/user", userRouter);
app.use("/posts", postRouter);

mongoose
  .connect("mongodb://localhost:27017/media")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Something went wrong: ", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
