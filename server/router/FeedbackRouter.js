import express from "express";
import { FeedbackModel } from "../models/FeedbackModel.js";
import { SavedTweetModel } from "../models/SavedTweetModel.js";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

router.post("/create/:username", async (req, res) => {
  try {
    const { tweetId, feedbackText, rating } = req.body;
    const username = req.params.username;

    const user = await UserModel.findOne({ username });

    const feedbackItem = new FeedbackModel({
      tweetId,
      feedbackText,
      rating,
      user
    });

    await feedbackItem.save();

    user.feedbacks.push(feedbackItem._id);

    await user.save();

    res.status(201).json({ message: "Feedback report created successfully" });
  } catch (error) {
    console.error("Error creating feedback report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.post("/create", async (req, res) => {
//   try {
//     const { tweetId, feedbackText, rating } = req.body;

//     const feedbackReport = new FeedbackModel({
//       tweetId,
//       feedbackText,
//       rating,
//     });

//     await feedbackReport.save();

//     res.status(201).json({ message: "Feedback report created successfully" });
//   } catch (error) {
//     console.error("Error creating feedback report:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/check/:tweetId", async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    // const username = req.params.username;

    const existingFeedback = await FeedbackModel.find({ tweetId });
    // const existingFeedback = await FeedbackModel.find({ username, tweetId });

    res.status(200).json(existingFeedback);

  } catch (error) {
    console.error("Error checking for existing feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as FeedbackRouter };
