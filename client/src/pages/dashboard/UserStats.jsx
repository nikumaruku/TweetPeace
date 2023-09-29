import { useState, useEffect } from "react";
import axios from "axios";

export default function UserStats() {
  const [numReports, setNumReports] = useState(0);
  const [numTweetAnalysed, setNumTweetAnalysed] = useState(0);
  const [numTweetSaved, setNumTweetsSaved] = useState(0);

  useEffect(() => {
    // Fetch number of reports
    axios.get("http://localhost:3001/report/numReports").then((response) => {
      setNumReports(response.data.numReports);
    });

    // Fetch number of tweets saved
    axios.get("http://localhost:3001/saveTweet/total").then((response) => {
      setNumTweetsSaved(response.data.numTweetSaved);
    });

    // Fetch number of tweets analysed
    axios.get("http://localhost:3001/tweet/analysedTweet").then((response) => {
      setNumTweetAnalysed(response.data.numTweets);
    });
  }, []);

  const stats = [
    { name: "Reported Incidents", value: numReports },
    { name: "Number of Tweet Analysed", value: numTweetAnalysed },
    { name: "Tweets Saved", value: numTweetSaved },
  ];

  return (
    <div className="mb-10">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {stat.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
