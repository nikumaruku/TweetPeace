import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function UserStats() {
  const [numReports, setNumReports] = useState(0);
  const [numTweetAnalysed, setNumTweetAnalysed] = useState(0);
  const [numTweetSaved, setNumTweetsSaved] = useState(0);

  const search = useLocation().search;
  const username = new URLSearchParams(search).get("username");

  useEffect(() => {
    // Fetch number of reports
    axios.get(`http://localhost:3001/report/numReports/${username}`).then((response) => {
      setNumReports(response.data.numReports);
    });

    // Fetch number of tweets saved
    axios.get(`http://localhost:3001/saveTweet/total/${username}`).then((response) => {
      setNumTweetsSaved(response.data.numTweetsSaved);
    });

    // Fetch number of tweets analysed
    axios.get(`http://localhost:3001/tweet/analysedTweet/${username}`).then((response) => {
      setNumTweetAnalysed(response.data.numTweets);
    });
  }, [username]);

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
