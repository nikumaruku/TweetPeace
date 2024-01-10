import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ContactGuardian = ({ setIsContactOpen, savedTweet }) => {
  const [guardians, setGuardians] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useLocation().search;
  const user = new URLSearchParams(search).get("username");

  function extractUser(tweetContent) {
    const twitterUrlRegex = /https:\/\/twitter.com\/([^/]+)\//;
    const match = tweetContent.match(twitterUrlRegex);
    return match ? match[1] : "Unknown";
  }

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
    const subject = `Tweet Alert by ${user}!`;
    const { tweetContent, analysisResult, savedAt } = savedTweet;

    const message = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
    <h2 style="color: #333;">Dear Guardian,</h2>
    
    <p>We wish to bring to your attention a tweet that pertains to ${user}. Below are the details:</p>
    
    <ul style="list-style-type: none; padding-left: 20px;">
    <li style="margin-bottom: 10px;">
        <strong>Tweet Link:</strong> ${tweetContent}
    </li>
    <li style="margin-bottom: 10px;">
        <div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px; background-color: #f5f8fa;">
            <div style="display: flex; align-items: flex-start;">
                <img src="https://picsum.photos/50/50" alt="Profile Pic" style="border-radius: 50%; margin-right: 10px;">
                <div>
                    <h4 style="margin: 0;">${extractUser(tweetContent)}</h4>
                    <p style="margin: 0; color: #657786;">@${extractUser(
                      tweetContent
                    )} • ${new Date(savedAt).toLocaleDateString()}</p>
                </div>
            </div>
            <p style="margin-top: 10px;">${analysisResult.isiTweet}</p>
        </div>
    </li>
    <li style="margin-bottom: 10px;">
        <strong>Score:</strong> ${analysisResult.score}
    </li>
    <li style="margin-bottom: 10px;">
        <strong>Overall Sentiment:</strong> ${analysisResult.overallSentiment}
    </li>
    <li style="margin-bottom: 10px;">
        <strong>Tweet Category:</strong> ${analysisResult.tweetCategory}
    </li>
    <li style="margin-bottom: 10px;">
        <strong>Negative Word Count:</strong> ${
          analysisResult.negativeWordCount
        }
    </li>
    <li style="margin-bottom: 10px;">
        <strong>Saved At:</strong> ${new Date(savedAt).toLocaleDateString()}
    </li>
</ul>

    
    <p>If further information or discussion is needed, please don't hesitate to reach out to us.</p>
    
    <p style="color: #666;">Best Regards,<br/>TweetPeace Corp</p>
</div>



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

      alert(`Email sent successfully!`);
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
