import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ReportHistory() {
  const [reports, setReports] = useState([]);
  const [selectedReasoning, setSelectedReasoning] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [viewScreenshot, setViewScreenshot] = useState(false);

  const search = useLocation().search;
  const user = new URLSearchParams(search).get("username");

  const [viewedScreenshots, setViewedScreenshots] = useState({});

  const handleViewScreenshot = (reportId) => {
    setViewedScreenshots((prevState) => ({
      ...prevState,
      [reportId]: !prevState[reportId],
    }));
  };

  const openModal = (reasoning) => {
    setSelectedReasoning(reasoning);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReasoning("");
    setIsModalOpen(false);
  };

  const calculateRemainingTime = (createdAt) => {
    const expirationTime = new Date(createdAt);
    expirationTime.setMinutes(expirationTime.getMinutes() + 5); // Add 5 minutes to createdAt for expiration
    const currentTime = new Date();
    const remainingTime = expirationTime.getTime() - currentTime.getTime();

    return Math.max(0, Math.floor(remainingTime / 1000)); // Return remaining time in seconds
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/report/${user}`).then((response) => {
      setReports(response.data);
    });
  }, [user]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-4 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Tweet Link
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Incident Type
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Screenshot
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Created At
              </th>
              {/* <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Countdown
              </th> */}
            </tr>
          </thead>

          {/* Render report item */}
          <tbody className="divide-y divide-gray-200 bg-white">
            {reports.map((report) => (
              <tr key={report._id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                  <a
                    href={report.tweetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {report.tweetLink}
                  </a>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {report.incidentType}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {report.description}
                </td>
                <td className="flex justify-center align-center px-3 py-4 text-sm text-gray-500">
                  {!viewedScreenshots[report._id] ? (
                    <button
                      onClick={() => handleViewScreenshot(report._id)}
                      className="text-indigo-600 hover:underline"
                    >
                      View
                    </button>
                  ) : (
                    <div>
                      <img
                        src={report.screenshot}
                        alt="Screenshot"
                        width="200"
                        height="auto"
                      />
                      <button
                        onClick={() => handleViewScreenshot(report._id)}
                        className="text-indigo-600 hover:underline"
                      >
                        Minimize
                      </button>
                    </div>
                  )}
                </td>
                <td
                  className="px-3 py-4 text-sm text-gray-500 verdict-cell"
                  onClick={() => openModal(report.reviewStatus[0].reasoning)}
                >
                  {report.reviewStatus[0]?.verdict || "In review"}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleString()}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Reasoning pop up */}
        {isModalOpen && (
          <div className="mb-10  fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white border-2 border-black shadow-xl rounded-lg p-6 w-96">
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
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
              <h2 className="text-lg font-semibold mb-4">Verdict Status</h2>

              <div className="mb-4">
                <label
                  htmlFor="reasoning"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reasoning
                </label>
                <p>{selectedReasoning}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
