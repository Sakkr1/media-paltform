import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use("/user", userRouter);

mongoose
  .connect("mongodb://localhost:27017/media")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Something went wrong: ", err));
