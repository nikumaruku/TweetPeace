import { useState } from "react";
import axios from "axios";

export default function AnalyseTweet() {
  const [tweetContent, setTweetContent] = useState("");
  const [username, setUsername] = useState("");
  const [tweetUrls, setTweetUrls] = useState(["", ""]);
  const [tweetResult, setTweetResult] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [chooseTweet, setChooseTweet] = useState(false);
  const [chooseThread, setChooseThread] = useState(false);

  const handleTweetAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:3001/tweet/analyse", {
        tweetUrl: tweetContent,
      });

      const { analysisResult } = response.data;
      setAnalysisResult(analysisResult);
      setTweetResult(true);
      setAnalysisComplete(true);
    } catch (error) {
      setError("Error analyzing tweet. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleThreadAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:3001/thread/analyse",
        {
          username,
          threadUrls: tweetUrls,
        }
      );

      const analysisResult = response.data;
      console.log(response.data);
      setAnalysisResult(analysisResult);
      setAnalysisComplete(true);
    } catch (error) {
      setError("Error analyzing tweets. Please try again");
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

  const handleTweetButton = () => {
    setChooseTweet(true);
    setChooseThread(false);
  };

  const handleThreadButton = () => {
    setChooseTweet(false);
    setChooseThread(true);
  };

  const handleAddInput = () => {
    setTweetUrls([...tweetUrls, ""]); // Add a new empty input
  };

  const handleRemoveInput = (index) => {
    if (index < 2) {
      // Prevent removing the first two inputs
      return;
    }
    const updatedUrls = [...tweetUrls];
    updatedUrls.splice(index, 1); // Remove the input at the specified index
    setTweetUrls(updatedUrls);
  };

  const handleInputChange = (index, value) => {
    const updatedUrls = [...tweetUrls];
    updatedUrls[index] = value;
    setTweetUrls(updatedUrls);
  };

  return (
    <form>
      <div className="bg-white px-6 py-9 sm:py-18 lg:px-8 ">
        <div className="mx-auto max-w-lg text-center">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            What type of Twitter content would you like to analyse?
          </h3>

          <div className="mt-6 space-x-5">
            <button
              type="button"
              onClick={handleTweetButton}
              className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            >
              Tweet
            </button>

            <button
              type="button"
              onClick={handleThreadButton}
              className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            >
              Thread
            </button>
          </div>
        </div>
      </div>

      {/* Analyse Tweet */}
      {chooseTweet && (
        <div className="space-y-5">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="space-y-5 flex flex-col justify-center items-center">
                  <textarea
                    value={tweetContent}
                    onChange={(e) => setTweetContent(e.target.value)}
                    placeholder="Paste tweet link here"
                    rows={3}
                    className="w-[65%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />

                  <button
                    onClick={handleTweetAnalysis}
                    disabled={isLoading}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Analyse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* -------------------------------------*/}

      {/* Analyse Thread */}
      {chooseThread && (
        <div className="border-b border-gray-900/10 pb-12 flex flex-col justify-center items-center ">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2 w-[35%]">
            <input
              type="text"
              id="name"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>

          {tweetUrls.map((url, index) => (
            <div key={index} className="mt-5 flex items-center space-x-2">
              <label
                htmlFor={`tweetUrl-${index}`}
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Tweet URL {index + 1}
              </label>
              <input
                type="text"
                id={`tweetUrl-${index}`}
                name={`tweetUrl-${index}`}
                className="block w-[35%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={url}
                onChange={(e) => handleInputChange(index, e.target.value)}
                required
              />
              {index >= 2 && ( // Allow removing input fields starting from index 2
                <button
                  type="button"
                  onClick={() => handleRemoveInput(index)}
                  className="rounded-md bg-red-100 px-2 py-1 text-sm text-red-600 font-semibold hover:bg-red-200"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddInput}
            className="mt-5 rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >
            Add URL
          </button>

          <button
            onClick={handleThreadAnalysis}
            disabled={isLoading}
            type="submit"
            className="mt-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Analyse
          </button>
        </div>
      )}
      {/* ------------------------------------- */}

      {/* Display result */}
      {tweetResult ? (
        <div className="mt-6 flex items-center justify-center gap-x-6">
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
              </button>
              {/* Add Save Result button */}
            </div>
          )}
          {error && <p>{error}</p>}
        </div>
      ) : (
        <div>
          {isLoading && !analysisComplete && <p>Analyzing...</p>}
          {analysisComplete && (
            <div className="max-w-xl mx-auto p-4 bg-white rounded shadow-lg">
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Sentiment Analysis Results
                </h2>
                {analysisResult && analysisResult.tweetSentiments ? (
                  analysisResult.tweetSentiments.map(
                    (tweetSentiment, index) => (
                      <div key={index} className="mb-6">
                        <h3 className="text-md font-medium mb-2">
                          Tweet {index + 1}
                        </h3>
                        <div className="mb-2">
                          <label className="text-gray-600">Score:</label>
                          <span className="text-gray-800 ml-2">
                            {tweetSentiment.score}
                          </span>
                        </div>
                        <div className="mb-2">
                          <label className="text-gray-600">Comparative:</label>
                          <span className="text-black-800 ml-2">
                            {tweetSentiment.comparative}
                          </span>
                        </div>
                        <div className="mb-2">
                          <label className="text-gray-600">Words:</label>
                          <ul className="list-disc list-inside ml-4">
                            {tweetSentiment.words.map((word, wordIndex) => (
                              <li key={wordIndex}>{word}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mb-2">
                          <label className="text-gray-600">
                            Positive Words:
                          </label>
                          <ul className="list-disc list-inside ml-4">
                            {tweetSentiment.positive.map((word, wordIndex) => (
                              <li key={wordIndex}>{word}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mb-4">
                          <label className="text-gray-600">
                            Negative Words:
                          </label>
                          <ul className="list-disc list-inside ml-4">
                            {tweetSentiment.negative.map((word, wordIndex) => (
                              <li key={wordIndex}>{word}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p>No sentiment analysis results available.</p>
                )}
              </>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------- */}
    </form>
  );
}
