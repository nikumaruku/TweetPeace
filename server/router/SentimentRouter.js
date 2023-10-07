import express from "express";
import analyzeTweetContent from "../module/sentimentAnalysis.js";
import { AnalysedTweetModel } from "../models/AnalysedTweetModel.js";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

// router.post("/analyse", async (req, res) => {
//   const tweetUrl = req.body.tweetUrl;

//   try {
//     const existingTweet = await AnalysedTweetModel.findOne({ tweetLink: tweetUrl });
//     if (existingTweet) {
//       return res
//         .status(400)
//         .json({ error: "Tweet has already been analysed! Try another tweet" });
//     }

//     const analysisResult = await analyzeTweetContent(tweetUrl);
//     if (analysisResult !== null) {
//       const newAnalysedTweet = new AnalysedTweetModel({
//         tweetLink: tweetUrl,
//       });

//       await newAnalysedTweet.save();
//       res.json({ analysisResult });
//     } else {
//       res.status(400).json({ error: "Analysis failed" });
//     }
//   } catch (error) {
//     console.error("Error analyzing tweet:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.post("/analyse/:username", async (req, res) => {
  const tweetUrl = req.body.tweetUrl;
  const username = req.params.username;

  try {
    const existingTweet = await AnalysedTweetModel.findOne({
      tweetLink: tweetUrl,
    });
    if (existingTweet) {
      return res
        .status(400)
        .json({ error: "Tweet has already been analysed! Try another tweet" });
    }

    const analysisResult = await analyzeTweetContent(tweetUrl);
    if (analysisResult !== null) {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create and save the new analysedTweet
      const newAnalysedTweet = new AnalysedTweetModel({
        tweetLink: tweetUrl,
        user: user._id,
      });

      await newAnalysedTweet.save();

      user.analysedTweets.push(newAnalysedTweet._id);

      await user.save();

      res.json({ analysisResult });
    } else {
      res.status(400).json({ error: "Analysis failed" });
    }
  } catch (error) {
    console.error("Error analyzing tweet:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.get("/analysedTweet", async (req, res) => {
//   try {
//     const numTweets = await AnalysedTweetModel.countDocuments();

//     res.status(200).json({ numTweets });
//   } catch (error) {
//     console.error("Error fetching tweet URLs:", error);

//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/analysedTweet/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const numTweets = await AnalysedTweetModel.countDocuments({
      user: user._id,
    });

    res.json({ numTweets });
  } catch (error) {
    console.error("Error counting analyzed tweets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as SentimentRouter };
