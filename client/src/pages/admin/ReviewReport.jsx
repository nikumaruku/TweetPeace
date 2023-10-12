import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReportPopUp from "./ReportPopUp";

export default function ReviewReport() {
  const [savedReports, setSavedReports] = useState([]);
  // const { username } = useParams();
  // const search = useLocation().search;
  // const username = new URLSearchParams(search).get("username");

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/saveTweet?username=${username}`)
  //     .then((response) => {
  //       setSavedTweets(response.data);
  //     });
  // }, [username]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/saveTweet/${username}`)
  //     .then((response) => {
  //       setSavedTweets(response.data);
  //     });
  // }, [username]);

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {savedReports.map((savedReport) => (
        <ReportCard key={savedReport._id} savedTweet={savedReport} />
      ))}
    </ul>
  );
}

function ReportCard({ savedReport }) {
  const [expanded, setExpanded] = useState(false);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);

  function extractUser(tweetContent) {
    const twitterUrlRegex = /https:\/\/twitter.com\/([^/]+)\//;
    const match = tweetContent.match(twitterUrlRegex);
    return match ? match[1] : "Unknown";
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {/* Report dropdown */}
      <li key={savedReport._id} className="py-4">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Report by {extractUser(savedReport.user)}
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                <strong></strong> {savedReport.tweetLink}
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
                <strong>Incident Type:</strong> {savedReport.incidentType}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Description:</strong> {savedReport.description}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Screenshot:</strong> {savedReport.screenshot}
              </p>
              <p className="mt-2 text-sm text-gray-700">
                <strong>Reported At:</strong>{" "}
                {new Date(savedReport.savedAt).toLocaleDateString()}
              </p>

              <div className="space-x-3">
                <button
                  onClick={() => {
                    setIsReviewOpen(true);
                    setSelectedReportId(savedReport._id);
                  }}
                  // disabled={savedTweet.reviewed}
                  className="mt-3 rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  Review report
                </button>
              </div>

              {/* Report pop-up */}
              {isReviewOpen && (
                <ReportPopUp
                  setIsReviewOpen={setIsReviewOpen}
                  reportId={selectedReportId}
                />
              )}
            </div>
          )}
        </div>
      </li>
    </>
  );
}
