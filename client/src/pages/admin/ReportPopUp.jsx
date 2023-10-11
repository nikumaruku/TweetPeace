import { useState } from "react";

export default function ReportPopUp() {
  const [verdict, setVerdict] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleReview = () => {
    // Implement the logic to send the verdict and reasoning to your server
    // axios.post(`http://localhost:3001/review/report`, { reportId: report._id, verdict, reasoning })
    // Then, you can update the report status in the state

    // Close the modal
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Review</button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
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
              <label
                htmlFor="verdict"
                className="block text-sm font-medium text-gray-700"
              >
                Verdict:
              </label>
              <input
                type="text"
                id="verdict"
                name="verdict"
                value={verdict}
                onChange={(e) => setVerdict(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="reasoning"
                className="block text-sm font-medium text-gray-700"
              >
                Reasoning:
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
              onClick={handleReview}
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
