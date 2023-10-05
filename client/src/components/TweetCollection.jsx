import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";

export default function TweetCollection() {
  const [savedTweets, setSavedTweets] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/saveTweet?username=${username}`)
      .then((response) => {
        setSavedTweets(response.data);
      });
  }, [username]);

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {savedTweets.map((savedTweet) => (
        <TweetCard key={savedTweet._id} savedTweet={savedTweet} />
      ))}
    </ul>
  );
}

function TweetCard({ savedTweet }) {
  const [expanded, setExpanded] = useState(false);

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState(null);

  function extractUser(tweetContent) {
    const twitterUrlRegex = /https:\/\/twitter.com\/([^/]+)\//;
    const match = tweetContent.match(twitterUrlRegex);
    return match ? match[1] : "Unknown";
  }
  const toggleExpanded = () => {
    setExpanded(!expanded);
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
              <strong></strong> {savedTweet.tweetContent}
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

            {/* Feedback pop-up */}
            {isFeedbackOpen && (
              <FeedbackForm
                setIsFeedbackOpen={setIsFeedbackOpen}
                tweetId={selectedTweetId}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
}
