import axios from "axios";
import { useState } from "react";
// import { PhotoIcon } from "@heroicons/react/solid";

export default function ReportTweet() {
  const [tweetLink, setTweetLink] = useState("");
  const [incidentType, setIncidentType] = useState("Doxx");
  const [description, setDescription] = useState("");
  const [screenshot, setScreenshot] = useState("");

  const handleReportCreation = async (e) => {
    e.preventDefault();

    const reportData = {
      tweetLink,
      incidentType,
      description,
      screenshot,
    };

    console.log({ reportData });
    try {
      const response = await axios.post(
        "http://localhost:3001/report",
        reportData
      );

      console.log("Report created:", response.data);

      setTweetLink(tweetLink);
      setIncidentType(incidentType);
      setDescription(description);
      setScreenshot(screenshot);
    } catch (error) {
      console.error("Error creating report:", error);
    }
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
    <form onSubmit={handleReportCreation}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          {/* <h1 className=" leading-7 text-gray-900 text-4xl font-bold font-mono">
            Report Tweet
          </h1> */}

          <label
            htmlFor="tweet-link"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tweet Link
          </label>
          <div className="mt-2">
            <input
              type="text"
              onChange={(e) => setTweetLink(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-full mt-10">
            <label
              htmlFor="incident-type"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Incident Type
            </label>
            <div className="mt-2">
              <select
                id="incidentType"
                name="incidentType"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                value={incidentType} // Set the selected value to the state
                onChange={(e) => setIncidentType(e.target.value)} // Update the state when the user selects an option
              >
                <option value="Doxx">Doxx</option>
                <option value="Threathen">Threathen</option>
                <option value="Mencarut">Mencarut</option>
              </select>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Provide description of incident
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={description} // Set the value to the state
                  onChange={(e) => setDescription(e.target.value)} // Update the state when the user types
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="screenshot"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Screenshot (Evidence)
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".png, .jpg, .jpeg, .gif"
                        onChange={handleFileInputChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>

                  {screenshot && (
                    <div>
                      <img src={screenshot} alt="Uploaded Image" width="200" />
                      <button
                        type="button"
                        className="mt-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
