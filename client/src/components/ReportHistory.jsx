
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ReportHistory() {
  const [reports, setReports] = useState([]);

  const search = useLocation().search;
  const user = new URLSearchParams(search).get("username");

  useEffect(() => {
    axios.get(`http://localhost:3001/report/${user}`).then((response) => {
      setReports(response.data);
    });
  }, [user]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Report History
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the reports including their details.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add report
          </button>
        </div>
      </div> */}
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
                Created At
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
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
                <td className="px-3 py-4 text-sm text-gray-500">
                  <a
                    href={report.screenshot}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Screenshot
                  </a>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                {/* <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                    <span className="sr-only">, {report.tweetLink}</span>
                  </a>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
