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

      const response = await axios.post("http://localhost:3001/tweet/analyze", {
        tweetUrl: tweetContent,
      });

      const { analysisResult } = response.data;
      setAnalysisResult(analysisResult);
    } catch (error) {
      setError("Error analyzing tweet. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-[#E4E4D0] space-y-5 p-10 rounded-lg">
        <h1 className="text-[#94A684] font-semibold hover:font-bold">
          Tweet Sentiment Analyzer
        </h1>
        <textarea
          value={tweetContent}
          onChange={(e) => setTweetContent(e.target.value)}
          placeholder="Paste tweet link here"
          className="bg-white text-black"
        />
        <button onClick={handleAnalysis} disabled={isLoading} >
          Analyze
        </button>
        {isLoading && <p>Analyzing...</p>}
        {analysisResult && (
          <div>
            <h2 className="text-3xl font-bold underline">Analysis Result:</h2>
            <p>Score: {analysisResult.score}</p>
            {/* <p>Comparative: {analysisResult.comparative}</p> */}
            <p>Overall Sentiment: {analysisResult.overallSentiment}</p>
            <p>Tweet Category: {analysisResult.tweetCategory}</p>
            <p>
              Negative Words Count:{" "}
              {analysisResult.negativeWordCount}
            </p>
            {analysisResult.badWords &&  (
              <div>
                <h3 className="text-xl font-semibold mt-4">
                  List of Bad Words Detected:
                </h3>
                <ul>
                  {analysisResult.badWords.map((word) => (
                    <li key={word.word}>
                      {word.word} - {word.count} occurrence(s)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default TweetAnalysisForm;
