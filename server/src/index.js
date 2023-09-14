import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "../routes/UserRouter.js";

const app = express();
const port = 3001;

//Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", UserRouter);

//MongoDB connection
mongoose
  .connect(
    "mongodb+srv://niksyahmiirfan:5ETk0SS0zcf4ZaKL@cyberbullying.qsrkdye.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

//Route
app.get;

//Listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
