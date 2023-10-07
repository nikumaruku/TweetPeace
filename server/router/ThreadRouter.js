import express from "express";
import Sentiment from "sentiment";
import fetchThreadContent from "../module/fetchTwitterThread.js";
import { TwitterThreadModel } from "../models/TwitterThreadModel.js";

const router = express.Router();
const sentiment = new Sentiment();

router.post("/analyse", async (req, res) => {
  try {
    const { tweetUser } = req.body;

    const threadData = await TwitterThreadModel.findOne({ tweetUser });

    if (!threadData) {
      return res.status(404).json({ message: "Thread data not found for the user." });
    }

    const tweetContents = threadData.tweets;

    const tweetSentiments = tweetContents.map((tweet) => {
      const analysis = sentiment.analyze(tweet);
      return analysis;
    });

    res.status(200).json({ tweetSentiments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while obtaining thread content" });
  }
});

router.post("/obtain", async (req, res) => {
  try {
    const { tweetUser, threadUrls } = req.body;

    const threadIds = [];

    for (const url of threadUrls) {
      const parts = url.split("/");
      const threadId = parts[5];
      threadIds.push(threadId);
    }

    const tweetContents = await fetchThreadContent(threadUrls);

    const twitterThread = new TwitterThreadModel({
      username: tweetUser,
      threadId: threadIds,
      tweets: tweetContents,
    });

    await twitterThread.save();

    res.status(200).json({ tweetContents });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while obtaining thread content" });
  }
});

export { router as ThreadRouter };
