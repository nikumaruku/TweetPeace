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

router.get("/", async (req, res) => {
  try {
    const savedTweets = await SavedTweetModel.find();

    res.status(200).json(savedTweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/total", async (req, res) => {
  try {
    const numTweetSaved = await SavedTweetModel.countDocuments();
    res.json({ numTweetSaved });
  } catch (error) {
    console.error("Error fetching number of tweet analysed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as SavedTweetRouter };
