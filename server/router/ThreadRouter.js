import express from "express";
import fetchThreadContent from "../module/fetchTwitterThread.js";
import { TwitterThreadModel } from "../models/TwitterThreadModel.js";

const router = express.Router();

router.post("/obtainThread", async (req, res) => {
  try {
    const { username, threadUrls } = req.body;

    const threadIds = [];

    for (const url of threadUrls) {
      const parts = url.split("/");
      const threadId = parts[5];
      threadIds.push(threadId);
    }

    const tweetContents = await fetchThreadContent(threadUrls);

    const twitterThread = new TwitterThreadModel({
      username: username,
      threadId: threadIds,
      tweets: tweetContents,
    });

    await twitterThread.save();

    res.status(200).json({ twitterThread });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while obtaining thread content" });
  }
});

export { router as ThreadRouter };
