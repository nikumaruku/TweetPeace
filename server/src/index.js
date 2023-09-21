// Import necessary modules and setup Express
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import { SentimentRouter } from "../router/SentimentRouter.js";
import { UserRouter } from "../router/UserRouter.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

//Endpoints
app.use("/", UserRouter);
app.use("/tweet", SentimentRouter);

//Establish MongoDB connection
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
