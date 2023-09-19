// Import necessary modules and setup Express
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import analyzeTweetContent from "../module/sentimentAnalysis.js";

const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// Define an API endpoint for tweet analysis
app.post("/api/analyze", async (req, res) => {
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

// Start the server on a specific port (e.g., 3001)
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});