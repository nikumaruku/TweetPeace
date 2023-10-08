import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const FeedbackForm = ({ setIsFeedbackOpen, tweetId }) => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const search = useLocation().search;
  const user = new URLSearchParams(search).get("username");

  const handleFeedbackSubmit = async () => {
    try {
      setIsLoading(true);

      const existingFeedback = await axios.get(
        `http://localhost:3001/feedback/check/${tweetId}`
      );

      const Feedback = existingFeedback.data;

      if (Feedback.length > 0) {
        alert("You have already provide feedback for this tweet!");
        setIsFeedbackOpen(false);
      } else {
        const response = await axios.post(
          `http://localhost:3001/feedback/create/${user}`,
          {
            tweetId,
            rating,
            feedbackText,
            user
          }
        );

        if (response.status === 200) setIsFeedbackOpen(false);
      }
    } catch (error) {
      console.error("Error saving feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-end">
          <button
            onClick={() => setIsFeedbackOpen(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-4">Feedback</h2>
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating (1-5):
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= 5) {
                setRating(value);
              }
            }}
            min="1"
            max="5"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700"
          >
            Feedback:
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows={4}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-400"
          ></textarea>
        </div>
        <button
          onClick={handleFeedbackSubmit}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
