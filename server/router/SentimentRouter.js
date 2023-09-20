import express from "express";
import analyzeTweetContent from "../module/sentimentAnalysis.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  const tweetUrl = req.body.tweetUrl;

  try {
    // Call the analyzeTweetContent function to perform sentiment analysis
    const analysisResult = await analyzeTweetContent(tweetUrl);
    if (analysisResult !== null) {
      // Return the analysis result as JSON
      res.json({ analysisResult });
    } else {
      // Handle the case when analysis fails
      res.status(400).json({ error: "Analysis failed" });
    }
  } catch (error) {
    console.error("Error analyzing tweet:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as SentimentRouter };
