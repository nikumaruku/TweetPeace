import axios from "axios";
import { useEffect, useState } from "react";
import ReportPopUp from "./ReportPopUp";

export default function ReviewReport() {
  const [savedReports, setSavedReports] = useState([]);
  const [reviewedReports, setReviewedReports] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/report`).then((response) => {
      setSavedReports(response.data);
    });
  }, []);

  return (
    <ul className="divide-y divide-gray-200">
      {savedReports.map((savedReport) => (
        <ReportCard
          key={savedReport._id}
          savedReport={savedReport}
          isReviewed={reviewedReports[savedReport._id]}
          setReviewedReports={setReviewedReports}
        />
      ))}
    </ul>
  );
}

function ReportCard({ savedReport, isReviewed, setReviewedReports }) {
  const [expanded, setExpanded] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/report/username/${savedReport.user}`)
      .then((response) => {
        setUsername(response.data.username);
      });
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <li className="py-4">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <h3 className="text-lg font-medium text-gray-900">
                <strong> Reported by</strong> {username ? username : "null"}
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
                <strong>Screenshot:</strong> No data yet
              </p>
              <p className="text-sm text-gray-700">
                <strong>Reported At:</strong>{" "}
                {new Date(savedReport.createdAt).toLocaleDateString()}
              </p>

              <div className="space-x-3">
                <button
                  onClick={() => {
                    if (!savedReport.reviewStatus[0]?.verdict) {
                      setIsReviewOpen(true);
                      setSelectedReportId(savedReport._id);
                    }
                  }}
                  className={`${
                    !savedReport.reviewStatus[0]?.verdict
                      ? "mt-3 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-indigo-100 bg-indigo-500 text-white"
                      : savedReport.reviewStatus[0]?.verdict === "Approved"
                      ? "mt-3 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm bg-green-500 text-white"
                      : "mt-3 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm bg-red-500 text-white"
                  }`}
                  disabled={isReviewed}
                >
                  {savedReport.reviewStatus[0]?.verdict || "Review report"}
                </button>
              </div>

              {isReviewOpen && (
                <ReportPopUp
                  setIsReviewOpen={setIsReviewOpen}
                  reportId={selectedReportId}
                  setReviewedReports={setReviewedReports}
                />
              )}
            </div>
          )}
        </div>
      </li>
    </>
  );
}
