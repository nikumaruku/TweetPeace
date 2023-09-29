import { useState } from "react";
import axios from "axios";

export default function AnalyseTweet() {
  const [tweetContent, setTweetContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:3001/tweet/analyse", {
        tweetUrl: tweetContent,
      });

      const { analysisResult } = response.data;
      setAnalysisResult(analysisResult);
      setAnalysisComplete(true);
    } catch (error) {
      setError("Error analyzing tweet. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTweet = async () => {
    try {
      setIsLoading(true);

      await axios.post("http://localhost:3001/saveTweet", {
        tweetContent: tweetContent,
        analysisResult: analysisResult,
      });

      alert("Tweet saved!");
    } catch (err) {
      console.log(err);
      setError("Error saving tweet. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <div className="bg-white px-6 py-9 sm:py-18 lg:px-8 ">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Tweet Analyser
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Try putting any valid Twitter link!
          </p>
        </div>
      </div>

      <div className="space-y-10">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="mt-2">
                <textarea
                  value={tweetContent}
                  onChange={(e) => setTweetContent(e.target.value)}
                  placeholder="Paste tweet link here"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        {/* <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button> */}
        <button
          onClick={handleAnalysis}
          disabled={isLoading}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Analyse Tweet
        </button>
        {isLoading && !analysisComplete && <p>Analyzing...</p>}
        {analysisComplete && (
          <div>
            <h2 className="text-3xl font-bold underline">Analysis Result:</h2>
            <p>Score: {analysisResult.score}</p>
            {/* <p>Comparative: {analysisResult.comparative}</p> */}
            <p>Overall Sentiment: {analysisResult.overallSentiment}</p>
            <p>Tweet Category: {analysisResult.tweetCategory}</p>
            <p>Negative Words Count: {analysisResult.negativeWordCount}</p>
            {analysisResult.badWords && (
              <div className="my-5">
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
            <button
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSaveTweet}
            >
              Save Result
            </button>{" "}
            {/* Add Save Result button */}
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </form>
  );
}
