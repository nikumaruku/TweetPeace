import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ErrorReport from "./modals/ErrorReport";
// import SuccessReport from "./modals/SuccessReport";

export default function ReportTweet() {
  const [tweetLink, setTweetLink] = useState("");
  const [incidentType, setIncidentType] = useState("Doxx");
  const [description, setDescription] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [reportError, setReportError] = useState(null);
  const [reportResult, setReportResult] = useState(null);
  const [reportDatas, setReportDatas] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [hasCreateReport, setHasCreateReport] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const search = useLocation().search;
  const user = new URLSearchParams(search).get("username");

  const isValidTwitterUrl = (url) => {
    // Regular expression to validate Twitter URL
    const twitterUrlPattern =
      /^(https?:\/\/)?twitter\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+\/?$/;
    return twitterUrlPattern.test(url);
  };

  const handleReportCreation = async (e) => {
    e.preventDefault();

    if (!tweetLink.trim() || !isValidTwitterUrl(tweetLink)) {
      setReportError("Please provide a valid Twitter tweet link.");
      return;
    }

    if (!incidentType.trim() || !description.trim() || !screenshot.trim()) {
      setReportError("Please fill out all required fields.");
      return;
    }

    const reportData = {
      tweetLink,
      incidentType,
      description,
      screenshot,
    };

    console.log({ reportData });
    try {
      await axios.post(
        `http://localhost:3001/report/${user}`,
        reportData,
        user
      );

      setReportError(null);
      setTweetLink(tweetLink);
      setIncidentType(incidentType);
      setDescription(description);
      setScreenshot(screenshot);
      setShowConfirmation(true);
      setReportDatas(reportData);

      setIsPopupOpen(true);
      alert("Report created!");
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  const analyseReport = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/report/analysess`,
        { tweetLink }
      );

      setReportResult(response.data);
      console.log(response.data);
      setDisplayDetails(true);
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  const handleDetails = async () => {
    displayDetails(false);
  };

  const handleReject = () => {
    setIsPopupOpen(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Create a FileReader to read the file as a data URL
      const reader = new FileReader();

      reader.onload = (event) => {
        // The result property contains the data URL as a string
        const dataUrl = event.target.result;
        setScreenshot(dataUrl);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setScreenshot(null);
  };

  return (
    <form className="space-y-6 flex flex-col items-center justify-center">
      <div className="border w-[70%] rounded-lg p-6 shadow-xl">
        <label className="block text-gray-900 text-sm font-medium">
          Tweet Link
        </label>
        <input
          type="text"
          onChange={(e) => setTweetLink(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <div className="mt-4">
          <label className="block text-gray-900 text-sm font-medium">
            Incident Type
          </label>
          <select
            id="incidentType"
            name="incidentType"
            autoComplete="country-name"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
          >
            <option value="Doxx">Harassment</option>
            <option value="Threathen">Troll</option>
            <option value="Mencarut">Flaming</option>
            <option value="Mencarut">Masquerading</option>
            <option value="Mencarut">Doxing</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-gray-900 text-sm font-medium">
            Provide description of incident
          </label>
          <textarea
            id="about"
            name="about"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder=""
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-900 text-sm font-medium">
            Screenshot (Evidence)
          </label>
          <div className="mt-1 flex items-center justify-center px-6 py-4 border border-gray-300 border-dashed rounded-md">
            {screenshot ? (
              <div className="mt-4 flex flex-col items-center justify-center space-x-2">
                <img src={screenshot} alt="Uploaded Image" width="200" />
                <button
                  type="button"
                  className="text-red-600 hover:text-red-700 text-sm font-medium focus:outline-none"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-1 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  Upload your proof here
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".png, .jpg, .jpeg, .gif"
                    onChange={handleFileInputChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center">
        {reportError && <ErrorReport reportError={reportError} />}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleReportCreation}
          type="button"
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Report
        </button>
      </div>

      {/* Suggestion Popup */}
      {isPopupOpen && (
        <div className="fixed ml-[25%] rounded-lg w-[50%] inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded shadow-lg space-y-4">
            <>
              <p>
                <b>Like to know more about your report? We can help!</b>
              </p>
              <div className="flex items-center justify-center">
                <button
                  onClick={analyseReport}
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 mr-3 rounded"
                >
                  Sure!
                </button>
                <button
                  onClick={() => handleReject()}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Never mind
                </button>
              </div>
            </>
          </div>
        </div>
      )}

      {/* Details Popup */}
      {displayDetails && reportResult && (
        <div className="fixed ml-[25%] rounded-lg w-[50%] inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded shadow-lg space-y-4">
            <>
              <p>
                <b>
                  Your report seems a bit concerning! We would suggest you to
                  also report to Twitter directly through this link
                  ((https://help.twitter.com/en/forms/safety-and-sensitive-content/abuse)
                  /) for more appropriate and direct response!
                </b>
              </p>
              <h2 className="text-xl font-bold underline">Analysis Result</h2>
              <p className="text-base font-medium text-gray-700">
                Overall Sentiment: {reportResult.reportAnalysis.overallSentiment}
              </p>
              <p className="text-base font-medium text-gray-700">
                Tweet Category: {reportResult.reportAnalysis.tweetCategory}
              </p>

              <div className="flex items-center justify-center">
                <button
                  onClick={handleDetails}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 mr-3 rounded"
                >
                  Understood
                </button>
              </div>
            </>
          </div>
        </div>
      )}
    </form>
  );
}
