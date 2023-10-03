import express from "express";
import Sentiment from "sentiment";
import fetchThreadContent from "../module/fetchTwitterThread.js";
import { TwitterThreadModel } from "../models/TwitterThreadModel.js";

const router = express.Router();
const sentiment = new Sentiment();

router.post("/analyse", async (req, res) => {
  try {
    const { username, threadUrls } = req.body;

    const threadIds = [];

    for (const url of threadUrls) {
      const parts = url.split("/");
      const threadId = parts[5];
      threadIds.push(threadId);
    }

    const tweetContents = await fetchThreadContent(threadUrls);

    const tweetSentiments = tweetContents.map((tweet) => {
      const analysis = sentiment.analyze(tweet);
      return analysis;
    });

    const twitterThread = new TwitterThreadModel({
      username: username,
      threadId: threadIds,
      tweets: tweetContents,
    });

    await twitterThread.save();

    res.status(200).json({ tweetSentiments });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while obtaining thread content" });
  }
});

export { router as ThreadRouter };
