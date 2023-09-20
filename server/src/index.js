// Import necessary modules and setup Express
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import { SentimentRouter } from "../router/SentimentRouter.js";
import { UserRouter } from "../router/UserRouter.js";
// import { UserRouter } from "../router/UserRouter";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

//Endpoints
app.use("/auth", UserRouter);
app.use("/tweet", SentimentRouter);

//Establish connection to MongoDB later
// mongoose.connect()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
