import { useState, useEffect } from "react";
import axios from "axios";

const ContactGuardian = ({ setIsContactOpen, savedTweet }) => {
  const [guardians, setGuardians] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGuardianInfo = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        "http://localhost:3001/guardians/obtain"
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

      alert(`Email sent successfully. You can view your email at ${response.data.preview}!`);
      // console.log(response.data.preview);
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
                      className="mt-3 rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    >
                      Email tweet
                    </button>
                  </li>
                  <button
                    onClick={() => setIsContactOpen(false)}
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
                  <div></div>
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
