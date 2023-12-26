import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ContactGuardian = ({ setIsContactOpen, savedTweet }) => {
  const [guardians, setGuardians] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useLocation().search;
  const user = new URLSearchParams(search).get("username");

  const fetchGuardianInfo = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `http://localhost:3001/guardians/obtain/${user}`
      );

      setGuardians(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching guardian info:", error);
      setIsLoading(false);
    }
  };

  const sendEmailToGuardian = async (guardianEmail, savedTweet) => {
    const subject = "Regarding Saved Tweet";
    const { tweetContent, analysisResult, savedAt } = savedTweet;

    const message = `
    Here is the saved tweet content:
    Tweet Link: ${tweetContent}
    Score: ${analysisResult.score}
    Overall Sentiment: ${analysisResult.overallSentiment}
    Tweet Category: ${analysisResult.tweetCategory}
    Negative Word Count: ${analysisResult.negativeWordCount}
    Saved At: ${new Date(savedAt).toLocaleDateString()}
  `;

    try {
      const response = await axios.post(
        "http://localhost:3001/email/send-email",
        {
          recipientEmail: guardianEmail,
          subject,
          message,
        }
      );

      alert(`Email sent successfully. Link: ${response.data.preview}!`);
      console.log(response.data.preview);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  useEffect(() => {
    fetchGuardianInfo();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading guardian information...</p>
      ) : (
        <>
          <ul>
            {guardians.map((guardian) => (
              <>
                <div className="flex justify-start items-center">
                  <li
                    key={guardian._id}
                    className="mt-3 mb-4 p-4 border rounded-lg shadow-md"
                  >
                    <p className="text-lg font-semibold">{guardian.name}</p>
                    <p className="text-gray-600">{guardian.email}</p>
                    <p className="text-gray-600">{guardian.phone}</p>
                    <button
                      onClick={() =>
                        sendEmailToGuardian(guardian.email, savedTweet)
                      }
                      className="mt-3 mr-5 rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    >
                      Email tweet
                    </button>
                    <button
                      onClick={() => setIsContactOpen(false)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      Minimise
                    </button>
                  </li>
                </div>
              </>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ContactGuardian;
