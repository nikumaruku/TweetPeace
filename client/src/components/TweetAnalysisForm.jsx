import { useState } from "react";
import axios from "axios";

const TweetAnalysisForm = () => {
  const [tweetContent, setTweetContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:3001/api/analyze", {
        tweetUrl: tweetContent,
      });

      const { analysisResult } = response.data;
      setAnalysisResult(analysisResult);
    } catch (error) {
      setError("Error analyzing tweet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
        placeholder="Enter tweet content..."
      />
      <button onClick={handleAnalysis} disabled={isLoading}>
        Analyze
      </button>
      {isLoading && <p>Analyzing...</p>}
      {analysisResult && (
        <div>
          <h2>Analysis Result:</h2>
          <p>Score: {analysisResult.score}</p>
          <p>Comparative: {analysisResult.comparative}</p>
          {/* Include other properties you want to display */}
          <p>Overall Sentiment: {analysisResult.overallSentiment}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TweetAnalysisForm;