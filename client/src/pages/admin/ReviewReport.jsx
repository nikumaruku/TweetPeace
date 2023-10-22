import axios from "axios";
import { useEffect, useState } from "react";
import ReportPopUp from "./ReportPopUp";

export default function ReviewReport() {
  const [savedReports, setSavedReports] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/report`).then((response) => {
      setSavedReports(response.data);
    });
  }, []);

  return (
    <ul className="divide-y divide-gray-200">
      {savedReports.map((savedReport) => (
        <ReportCard key={savedReport._id} savedReport={savedReport} />
      ))}
    </ul>
  );
}

function ReportCard({ savedReport }) {
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
                    setIsReviewOpen(true);
                    setSelectedReportId(savedReport._id);
                  }}
                  className="mt-3 rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  Review report
                </button>
              </div>

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

