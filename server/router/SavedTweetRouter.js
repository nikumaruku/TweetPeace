import express from "express";
import { SavedTweetModel } from "../models/SavedTweetModel.js";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

router.post("/:username", async (req, res) => {
  try {
    const { tweetContent, analysisResult } = req.body;
    const username = req.params.username;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const tweet = new SavedTweetModel({
      tweetContent,
      analysisResult,
      user: user._id,
    });

    await tweet.save();

    user.savedTweets.push(tweet._id);

    await user.save();

    res
      .status(201)
      .json({ message: "Tweet analysis result saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.params.username,
    }).populate("savedTweets");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const savedTweets = user.savedTweets;

    res.status(200).json(savedTweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/total/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const numTweetsSaved = await SavedTweetModel.countDocuments({
      user: user._id,
    });

    res.json({ numTweetsSaved });
  } catch (error) {
    console.error("Error fetching number of tweets saved:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:username/:tweetId", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.savedTweets.pull({ _id: req.params.tweetId });

    await user.save();
    res.status(200).json({ message: "Saved tweet deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as SavedTweetRouter };
