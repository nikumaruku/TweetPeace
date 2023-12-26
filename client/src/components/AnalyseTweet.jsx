import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ErrorTweet from "./modals/ErrorTweet";
import ErrorThread from "./modals/ErrorThread";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function AnalyseTweet() {
  const [tweetContent, setTweetContent] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [username, setUsername] = useState("");
  const [tweetUrls, setTweetUrls] = useState(["", ""]);
  const [tweetResult, setTweetResult] = useState(false);
  const [threadResult, setThreadResult] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // const [resultSaved, setResultSaved] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [tweetError, setTweetError] = useState(null);
  const [threadError, setThreadError] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [chooseTweet, setChooseTweet] = useState(false);
  const [chooseThread, setChooseThread] = useState(false);
  const [hasConfirmedData, setHasConfirmedData] = useState(false);

  const search = useLocation().search;
  const user = new URLSearchParams(search).get("username");

  useEffect(() => {
    if (analysisResult && analysisResult.tweetCategory === "Red") {
      handleSaveTweet();
    }
  }, [analysisResult]);

  const isValidTwitterUrl = (url) => {
    const twitterUrlPattern =
      /^(https?:\/\/)?twitter\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+\/?$/;
    return twitterUrlPattern.test(url);
  };

  const handleTweetAnalysis = async () => {
    try {
      setIsLoading(true);

      if (!tweetContent.trim()) {
        setTweetError("Please provide a tweet link before analyzing.");
        return;
      }

      if (!isValidTwitterUrl(tweetContent)) {
        setTweetError("Please provide a valid Twitter tweet link.");
        return;
      }

      setTweetError(null);

      const response = await axios.post(
        `http://localhost:3001/tweet/analyse/${user}`,
        {
          tweetUrl: tweetContent,
          user,
        }
      );
      const { analysisResult } = response.data;

      setAnalysisResult(analysisResult);
      setTweetResult(true);
      setAnalysisComplete(true);
    } catch (error) {
      setTweetError("Error analyzing tweet. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetThread = async () => {
    try {
      setIsLoading(true);

      if (!username.trim()) {
        setThreadError("Please provide a Twitter username.");
        return;
      }

      // if (
      //   !tweetUrls.length < 2 ||
      //   tweetUrls.some((url) => !isValidTwitterUrl(url))
      // ) {
      //   setThreadError("Please provide at least two valid Twitter tweet link.");
      //   return;
      // }

      setThreadError(null);

      const response = await axios.post("http://localhost:3001/thread/obtain", {
        username,
        threadUrls: tweetUrls,
      });

      const threadContent = response.data;
      setThreadContent(threadContent);
      // console.log(threadContent);
      setIsPopupOpen(true);
      setAnalysisComplete(true);
    } catch (error) {
      setThreadError("Error obtaining threads. Please try again");
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
        }
      );

      const analysisResult = response.data;
      console.log(response.data);
      setAnalysisResult(analysisResult);
      setAnalysisComplete(true);
      setThreadResult(true);
      setHasConfirmedData(false);
    } catch (error) {
      setError("Error analyzing tweets. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTweet = async () => {
    try {
      setIsLoading(true);

      await axios.post(`http://localhost:3001/saveTweet/${user}`, {
        tweetContent: tweetContent,
        analysisResult: analysisResult,
        user,
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

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmData = () => {
    setHasConfirmedData(true);
    setIsPopupOpen(false);
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
                    className="w-[65%] block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {tweetError && <ErrorTweet tweetError={tweetError} />}
                  <button
                    onClick={handleTweetAnalysis}
                    disabled={isLoading}
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Analyse
                  </button>
                </div>
              </div>
            </div>
            {tweetResult && (
              <div className="flex justify-center items-center">
                <div className="mt-6 flex flex-col items-center justify-center gap-x-6 border w-[50%] rounded-lg p-6 ">
                  {isLoading && !analysisComplete && (
                    <p className="text-sm font-medium text-gray-500">
                      Analyzing...
                    </p>
                  )}
                  {analysisComplete && (
                    <div className=" flex flex-col justify-center items-center">
                      <h2 className="text-xl font-bold underline">
                        Analysis Result
                      </h2>
                      <p className="text-base font-medium text-gray-700">
                        Score: {analysisResult.score}
                      </p>
                      <p className="text-base font-medium text-gray-700">
                        Overall Sentiment: {analysisResult.overallSentiment}
                      </p>
                      <p className="text-base font-medium text-gray-700">
                        Tweet Category: {analysisResult.tweetCategory}
                      </p>
                      <p className="text-base font-medium text-gray-700">
                        Negative Words Count: {analysisResult.negativeWordCount}
                      </p>
                      {analysisResult.badWords && (
                        <div className="my-5">
                          <h3 className="text-md font-semibold mt-4">
                            List of Bad Words Detected:
                          </h3>
                          <ul className="list-disc ml-4">
                            {analysisResult.badWords.map((word) => (
                              <li
                                key={word.word}
                                className="text-base font-medium text-gray-700"
                              >
                                {word.word} - {word.count} occurrence(s)
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {analysisResult.tweetCategory === "Yellow" && (
                        <button
                          type="button"
                          onClick={handleSaveTweet}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save Result
                        </button>
                      )}
                    </div>
                  )}
                  {error && <p>{error}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* -------------------------------------*/}

      {/* Analyse Thread */}
      {chooseThread && (
        <div className="border-b border-gray-300  flex flex-col justify-center items-center">
          <label htmlFor="name" className="text-sm font-medium text-gray-900">
            Twitter username
          </label>
          <div className="mt-2 w-[35%]">
            <input
              type="text"
              id="name"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
              required
            />
          </div>

          {tweetUrls.map((url, index) => (
            <div
              key={index}
              className="mt-5 flex flex-col items-center space-x-2"
            >
              <label
                htmlFor={`tweetUrl-${index}`}
                className="text-sm font-medium text-gray-900"
              >
                Tweet URL {index + 1}
              </label>
              <input
                type="text"
                id={`tweetUrl-${index}`}
                name={`tweetUrl-${index}`}
                className="block  rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                value={url}
                onChange={(e) => handleInputChange(index, e.target.value)}
                required
              />
              {index >= 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveInput(index)}
                  className="rounded-md mt-5 bg-red-100 px-2 py-1 text-sm text-red-600 font-semibold hover:bg-red-200"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddInput}
            className="mt-5 mb-5 rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >
            <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {threadError && <ErrorThread threadError={threadError} />}
          <button
            type="button"
            onClick={handleGetThread}
            className="mt-5 mb-10 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
          >
            Request Thread
          </button>

          {hasConfirmedData && (
            <button
              onClick={handleThreadAnalysis}
              disabled={isLoading}
              type="submit"
              className="mt-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Analyse
            </button>
          )}

          {threadResult && (
            <>
              {isLoading && !analysisComplete && <p>Analyzing...</p>}
              {analysisComplete && (
                <div className="w-[50%] my-5 flex flex-col items-center justify-center mx-auto p-4 bg-white rounded shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Analysis Result</h2>
                  <div className="flex flex-wrap mx-5 mb-6 ">
                    {analysisResult && analysisResult.tweetSentiments ? (
                      analysisResult.tweetSentiments.map(
                        (tweetSentiment, index) => (
                          <div key={index} className="w-1/2 px-10 mb-4">
                            <h3 className="text-lg font-semibold mb-2">
                              Tweet {index + 1}
                            </h3>
                            <div className="mb-2">
                              <label className="text-gray-700">Score:</label>
                              <span className="text-gray-800 ml-2">
                                {tweetSentiment.score}
                              </span>
                            </div>
                            <div className="mb-2 flex flex-col">
                              <label className="text-gray-700">
                                Comparative:
                              </label>
                              <span className="text-gray-800">
                                {tweetSentiment.comparative}
                              </span>
                            </div>
                            <div className="mb-2">
                              <label className="text-gray-700">Words:</label>
                              <ul className="list-disc list-inside ml-4">
                                {tweetSentiment.words.map((word, wordIndex) => (
                                  <li key={wordIndex} className="text-gray-800">
                                    {word}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mb-2">
                              <label className="text-gray-700">
                                Positive Words:
                              </label>
                              <ul className="list-disc list-inside ml-4">
                                {tweetSentiment.positive.map(
                                  (word, wordIndex) => (
                                    <li
                                      key={wordIndex}
                                      className="text-gray-800"
                                    >
                                      {word}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-700">
                                Negative Words:
                              </label>
                              <ul className="list-disc list-inside ml-4">
                                {tweetSentiment.negative.map(
                                  (word, wordIndex) => (
                                    <li
                                      key={wordIndex}
                                      className="text-gray-800"
                                    >
                                      {word}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <p>No sentiment analysis results available.</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Popup */}
          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <div className="bg-white p-4 rounded shadow-lg space-y-4">
                {threadContent && (
                  <>
                    <p>Is this the correct thread?</p>
                    {/* Display each tweet in the threadContent */}
                    {threadContent.tweetContents.map((tweet, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-gray-900 text-sm">{tweet}</p>
                      </div>
                    ))}
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleConfirmData}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 mr-3  rounded"
                      >
                        Yes
                      </button>
                      <button
                        onClick={handleClosePopup}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        No
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {/* ------------------------------------- */}
    </form>
  );
}
