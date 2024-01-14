import express from "express";
import Sentiment from "sentiment";
import analyzeThread from "../module/analyseThread.js";
import fetchThreadContent from "../module/fetchTwitterThread.js";
import { TwitterThreadModel } from "../models/TwitterThreadModel.js";

const router = express.Router();
const sentiment = new Sentiment();

router.post("/analyse", async (req, res) => {
  try {
    const { tweetContents } = req.body;

    if (!Array.isArray(tweetContents)) {
      return res.status(400).json({ message: "Invalid tweet contents" });
    }

    const tweetSentiments = tweetContents.map((tweet) => {
      const analysis = sentiment.analyze(tweet);
      return analysis;
    });

    res.status(200).json({ tweetSentiments });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while analyzing tweet contents" });
  }
});

router.post("/obtain", async (req, res) => {
  try {
    const { threadUrls } = req.body;

    const threadIds = [];
    let username = "";

    for (const url of threadUrls) {
      const parts = url.split("/");
      const threadId = parts[5];
      threadIds.push(threadId);
      username = parts[3];
    }

    const tweetContents = await fetchThreadContent(threadUrls);

    const twitterThread = new TwitterThreadModel({
      username,
      threadId: threadIds,
      tweets: tweetContents,
    });

    await twitterThread.save();

    res.status(200).json({ tweetContents, username });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while obtaining thread content" });
  }
});

export { router as ThreadRouter };
