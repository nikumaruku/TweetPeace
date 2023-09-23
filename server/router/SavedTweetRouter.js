import express from "express";
import { SavedTweetModel } from "../models/SavedTweetModel.js"; // Import the Tweet model

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { tweetContent, analysisResult } = req.body;

    const tweet = new SavedTweetModel({
      tweetContent,
      analysisResult,
    });

    await tweet.save();
    res
      .status(201)
      .json({ message: "Tweet analysis result saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as SavedTweetRouter };
