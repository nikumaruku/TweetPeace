import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { SimpleGauge } from "react-gauges";

import ErrorTweet from "./modals/ErrorTweet";
import ErrorThread from "./modals/ErrorThread";

export default function AnalyseTweet() {
  const [tweetContent, setTweetContent] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [threadUser, setThreadUser] = useState("");
  const [tweetUrls, setTweetUrls] = useState(["", ""]);
  const [tweetResult, setTweetResult] = useState(false);
  const [threadResult, setThreadResult] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [tweetError, setTweetError] = useState(null);
  const [threadError, setThreadError] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [chooseTweet, setChooseTweet] = useState(false);
  const [chooseThread, setChooseThread] = useState(false);
  const [threadButton, setThreadButton] = useState(true);
  const [threadDetails, setThreadDetails] = useState(false);

  const search = useLocation().search;
  const user = new URLSearchParams(search).get("username");

  const colorMapTweet = {
    Red: "#ff0000",
    Yellow: "#fcba03",
    Green: "#00ff00",
  };

  const colorMapThread = {
    Negative: "#ff0000",
    Positive: "#00ff00",
  };

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
      setThreadError(null);

      const response = await axios.post("http://localhost:3001/thread/obtain", {
        threadUrls: tweetUrls,
      });

      const threadContent = response.data;
      const threadUser = response.data.username;
      setThreadContent(threadContent);
      setThreadUser(threadUser);
      console.log(threadContent);
      setIsPopupOpen(true);
      setAnalysisComplete(true);
    } catch (error) {
      setThreadError("Error obtaining threads. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleThreadAnalysis = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:3001/thread/analyse",
        {
          tweetContents: threadContent.tweetContents,
          username: threadContent.username,
        }
      );

      const analysisResult = response.data;
      console.log(response.data);
      setAnalysisResult(analysisResult);
      setAnalysisComplete(true);
      setThreadResult(true);
      setIsPopupOpen(false);
      setThreadButton(false);
      // setHasConfirmedData(false);
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
    setTweetUrls([...tweetUrls, ""]);
  };

  const handleRemoveInput = (index) => {
    if (index < 2) {
      return;
    }
    const updatedUrls = [...tweetUrls];
    updatedUrls.splice(index, 1);
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

  const handleThreadDetails = async (e) => {
    e.preventDefault();
    setThreadDetails((prevThreadDetails) => !prevThreadDetails);
  };

  const getOverallThreadSentiment = () => {
    const totalScore = (analysisResult?.tweetSentiments || []).reduce(
      (total, tweetSentiment) => total + tweetSentiment.comparative,
      0
    );

    return totalScore >= 0 ? "Positive" : "Negative";
    
  };

  const getOverallThreadScore = () => {
    const totalScore = (analysisResult?.tweetSentiments || []).reduce(
      (total, tweetSentiment) => total + tweetSentiment.comparative,
      0
    );

    return totalScore;
  };

  return (
    <form>
      <div className="bg-white px-6 py-6 sm:py-18 lg:px-8 ">
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
          <div className="border-b border-gray-900/10 pb-8">
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
                <div className="mt-6 flex flex-col items-center justify-center gap-x-6 border-2 shadow-lg w-[50%] rounded-xl p-6 ">
                  {isLoading && !analysisComplete && (
                    <p className="text-sm font-medium text-gray-500">
                      Analyzing...
                    </p>
                  )}
                  {analysisComplete && (
                    <div className=" flex flex-col justify-center items-center">
                      <h2 className="text-xl font-bold mb-5">
                        Analysis Result
                      </h2>
                      <div className="">
                        <SimpleGauge
                          barColor={
                            colorMapTweet[analysisResult.tweetCategory] ||
                            "#0f0f0e"
                          }
                          value={analysisResult.comparative.toFixed(2)}
                          labelTemplate="{value}"
                          minLimit={0}
                          maxLimit={0.1}
                          barWidth={15}
                          indicatorVisible={false}
                        />
                      </div>
                      <p className="text-base font-medium text-gray-700 mt-2">
                        Overall Tweet Sentiment
                      </p>
                      <h2 className="mb-2">
                        {analysisResult.overallSentiment}
                      </h2>
                      <p className="text-base font-medium text-gray-700">
                        Tweet Category
                      </p>
                      <h2>{analysisResult.tweetCategory}</h2>
                      {analysisResult.badWords && (
                        <div>
                          {/* <h3 className="text-md font-semibold mt-4">
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
                          </ul> */}
                        </div>
                      )}
                      {analysisResult.tweetCategory === "Yellow" && (
                        <button
                          type="button"
                          onClick={handleSaveTweet}
                          className="rounded-md bg-indigo-600 px-3 py-2 mt-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
        <div className="border-b border-gray-300 flex flex-col justify-center items-center">
          {tweetUrls.map((url, index) => (
            <div
              key={index}
              className="mt-2 flex flex-col items-center space-x-2"
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
                className="block mb-4 rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
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

          {threadError && <ErrorThread threadError={threadError} />}

          {threadButton && (
            <>
              <button
                type="button"
                onClick={handleAddInput}
                className="mt-2 mb-10 rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              >
                <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleGetThread}
                className="rounded-md bg-indigo-600 px-3 py-2 mb-10 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Request Thread
              </button>
            </>
          )}

          {threadResult && (
            <>
              {isLoading && !analysisComplete && <p>Analyzing...</p>}
              {analysisComplete && (
                <div className="w-[50%] my-6 border-2 rounded-xl flex flex-col items-center justify-center mx-auto p-4 bg-white rounded-xl shadow-lg">
                  <h2 className="text-xl font-bold mb-4 mt-5">
                    Analysis Result
                  </h2>
                  <div className="flex items-center justify-center">
                    <SimpleGauge
                      value={getOverallThreadScore().toFixed(2)}
                      labelTemplate="{value}"
                      barColor={
                        colorMapThread[getOverallThreadSentiment()] ||
                        "##0f0f0e"
                      }
                      minLimit={-5}
                      maxLimit={5}
                      barWidth={15}
                      indicatorVisible={false}
                    />
                  </div>
                  <div className="flex flex-col mx-5 mb-2 mt-5 items-center justify-center m-5">
                    {analysisResult && analysisResult.tweetSentiments ? (
                      <div className="flex flex-col items-center justify-center mb-5">
                        <p className="text-base font-bold text-gray-700">
                          Thread Sentiment
                        </p>
                        <h3>{getOverallThreadSentiment()}</h3>
                      </div>
                    ) : (
                      <p>No sentiment analysis results available.</p>
                    )}
                    {threadDetails && (
                      <div className="flex flex-wrap justify-center ">
                        {analysisResult.tweetSentiments.map(
                          (tweetSentiment, index) => (
                            <div
                              key={index}
                              className="items-center justify-center px-4 mb-4"
                            >
                              <div className="w-48 flex flex-col items-center justify-center border-2 p-4 rounded-md bg-white">
                                <h3 className="text-base font-bold text-gray-700">
                                  Tweet {index + 1}
                                </h3>

                                <div className="flex flex-col items-center justify-center mt-2">
                                  <label className="text-base font-light text-gray-700">
                                    Score
                                  </label>
                                  <p>{tweetSentiment.comparative.toFixed(2)}</p>
                                </div>

                                <div className="flex flex-col items-center justify-center mt-5">
                                  <label className="text-base font-light text-gray-700">
                                    Bad Words
                                  </label>
                                  {tweetSentiment.negative &&
                                  tweetSentiment.negative.length > 0 ? (
                                    tweetSentiment.negative.map(
                                      (word, wordIndex) => (
                                        <p
                                          key={wordIndex}
                                          className="text-gray-800"
                                        >
                                          {word}
                                        </p>
                                      )
                                    )
                                  ) : (
                                    <p>Non detected!</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    <button
                      onClick={handleThreadDetails}
                      type="submit"
                      className="mt-3 rounded-md bg-indigo-600 px-3 py-2 mb-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {threadDetails ? "Minimize" : "View Details"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Popup */}
          {isPopupOpen && (
            <div className="fixed ml-[25%] rounded-lg w-[50%] inset-0 flex items-center justify-center z-10">
              <div className="bg-white border-2 p-4 rounded shadow-lg space-y-4">
                {threadContent && (
                  <>
                    <p>
                      <b>Thread Confirmation</b>
                    </p>
                    <p>Thread by {threadUser}</p>
                    {threadContent.tweetContents.map((tweet, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-gray-900 text-sm">{tweet}</p>
                      </div>
                    ))}
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleThreadAnalysis}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 mr-3 rounded"
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
