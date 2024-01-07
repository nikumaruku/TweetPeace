import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import _orderBy from "lodash/orderBy";

import FeedbackForm from "./FeedbackForm";
import ContactGuardian from "./ContactGuardian";

export default function TweetCollection() {
  const [savedTweets, setSavedTweets] = useState([]);
  const [sortOption, setSortOption] = useState("date");
  const [displayedTweets, setDisplayedTweets] = useState([]); // Separate state for displayed tweets

  const search = useLocation().search;
  const username = new URLSearchParams(search).get("username");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/saveTweet/${username}`)
      .then((response) => {
        setSavedTweets(response.data);
      });
  }, [username]);

  const onDelete = (deletedTweetId) => {
    setSavedTweets((tweets) =>
      tweets.filter((tweet) => tweet._id !== deletedTweetId)
    );
  };

  // const compareFunction = (a, b) => {
  //   const dateA = new Date(a.createdAt);
  //   const dateB = new Date(b.createdAt);
  //   if (sortOption === "date") {
  //     return dateA - dateB; // Sort by date
  //   } else {
  //     // Sort alphabetically by a field (e.g., savedTweet)
  //     return a.savedTweet.localeCompare(b.savedTweet);
  //   }
  // };

  // const handleSort = () => {
  //   const sortedTweets = [...savedTweets].sort(compareFunction);
  //   setSavedTweets(sortedTweets);
  //   setSortOption(sortOption === "date" ? "alphabet" : "date");
  // };

  const handleSort = () => {
    if (sortOption === "date") {
      const sortedTweets = [...displayedTweets].sort((a, b) => {
        const dateA = new Date(a.savedAt.$date);
        const dateB = new Date(b.savedAt.$date);
        return dateA > dateB ? -1 : 1; // Sort in descending order
      });
      setDisplayedTweets(sortedTweets);
      setSortOption("alphabet");
    } else {
      const filterDate = new Date(Math.max(...savedTweets.map((tweet) => new Date(tweet.savedAt.$date))));
      const filteredTweets = savedTweets.filter((tweet) => {
        const tweetCreatedAt = new Date(tweet.savedAt.$date);
        return tweetCreatedAt.getTime() === filterDate.getTime();
      });
      setDisplayedTweets(filteredTweets);
      setSortOption("date");
    }
  };

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        <div className="flex">
          <button
            className="mb-3 rounded-md bg-gray-50 px-3.5 py-1.5 text-sm font-semibold text-black-600 shadow-sm hover:bg-indigo-100"
            onClick={() => handleSort()}
          >
            {sortOption === "date" ? "Sort by Latest Creation Date" : "Sort by Alphabet"}
          </button>
        </div>
        {savedTweets.map((savedTweet) => (
          <TweetCard
            key={savedTweet._id}
            savedTweet={savedTweet}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function TweetCard({ savedTweet, onDelete }) {
  const search = useLocation().search;
  const username = new URLSearchParams(search).get("username");

  const [expanded, setExpanded] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState(null);

  function extractUser(tweetContent) {
    const twitterUrlRegex = /https:\/\/twitter.com\/([^/]+)\//;
    const match = tweetContent.match(twitterUrlRegex);
    return match ? match[1] : "Unknown";
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  //Check back delete function
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/saveTweet/${username}/${savedTweet._id}`
      );
      console.log(`${username}`);
      onDelete(savedTweet._id);
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };

  return (
    <li key={savedTweet._id} className="py-4">
      <div className="bg-white p-4 shadow-md rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Tweet by {extractUser(savedTweet.tweetContent)}
            </h3>
            <p className="mt-2 text-sm text-gray-700">
              <div>
                {savedTweet.tweetContent}
                <div className="flex border-2 my-2 bg-gray-50 text-gray-600 p-5 rounded-lg">
                  "{savedTweet.analysisResult.isiTweet}"
                </div>
              </div>
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-end">
            <button
              className="text-indigo-600 hover:underline"
              onClick={toggleExpanded}
            >
              {expanded ? "Less" : "Details"}
            </button>
          </div>
        </div>
        {expanded && (
          <div className="mt-4">
            <p className="text-sm text-gray-700">
              <strong>Score:</strong> {savedTweet.analysisResult.score}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Overall Sentiment:</strong>{" "}
              {savedTweet.analysisResult.overallSentiment}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Tweet Category:</strong>{" "}
              {savedTweet.analysisResult.tweetCategory}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Negative Word Count:</strong>{" "}
              {savedTweet.analysisResult.negativeWordCount}
            </p>
            {savedTweet.analysisResult.badWords && (
              <div className="mt-2">
                <h4 className="text-md font-semibold">Bad Words Detected:</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {savedTweet.analysisResult.badWords.map((badWord) => (
                    <li key={badWord.word}>
                      {badWord.word} - {badWord.count} occurrence(s)
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-2 text-sm text-gray-700">
              <strong>Saved At:</strong>{" "}
              {new Date(savedTweet.savedAt).toLocaleDateString()}
            </p>

            <div className="space-x-3">
              <button
                onClick={() => {
                  setIsFeedbackOpen(true);
                  setSelectedTweetId(savedTweet._id);
                }}
                disabled={savedTweet.reviewed}
                className="mt-3 rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              >
                Rate this analysis
              </button>
              <button
                onClick={() => setIsContactOpen(true)}
                className="mt-3 rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              >
                Inform guardian
              </button>
              <button
                onClick={() => handleDelete()}
                className="mt-3 rounded-md bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-indigo-100"
              >
                Delete
              </button>
            </div>

            {/* Feedback pop-up */}
            {isFeedbackOpen && (
              <FeedbackForm
                setIsFeedbackOpen={setIsFeedbackOpen}
                tweetId={selectedTweetId}
              />
            )}

            {/* Contact pop-up */}
            {isContactOpen && (
              <ContactGuardian
                setIsContactOpen={setIsContactOpen}
                savedTweet={savedTweet}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
}
