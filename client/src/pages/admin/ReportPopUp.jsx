import { useState } from "react";

export default function ReportPopUp({ setIsReviewOpen, reportId }) {
  const [verdict, setVerdict] = useState("");
  const [reasoning, setReasoning] = useState("");

  const handleReview = (verdict) => {
    // Implement your logic here based on the verdict (e.g., "Rejected" or "Approved")
    // You can use the 'verdict' parameter to determine the selected option.
    setIsReviewOpen(false);
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="flex justify-end">
            <button
              onClick={() => setIsReviewOpen(false)}
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
          <h2 className="text-lg font-semibold mb-4">Review Report</h2>
          <div className="mb-4">
            <div className="flex flex-col items-start mb-2">
              <label
                className="block mb-3 text-sm font-medium text-gray-700"
              >
                Verdict
              </label>
              <div className="flex ml-14 justify-center items-center space-x-2">
                <button
                  onClick={() => handleReview("Rejected")}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                >
                  Rejected
                </button>
                <button
                  onClick={() => handleReview("Approved")}
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                >
                  Approved
                </button>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="reasoning"
              className="block text-sm font-medium text-gray-700"
            >
              Reasoning
            </label>
            <textarea
              id="reasoning"
              name="reasoning"
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              rows={4}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-400"
            ></textarea>
          </div>
          <button
            onClick={() => handleReview(verdict)}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
