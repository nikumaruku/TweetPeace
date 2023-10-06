import { useState, useEffect } from "react";
// import { transporter } from "../../../server/module/emailService.js";
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

  // const sendEmailToGuardian = async (guardianEmail, tweetContent) => {
  //   const subject = "Regarding Saved Tweet";
  //   const text = `Here is the saved tweet content:\n\n${tweetContent}`;

  //   const mailOptions = {
  //     from: "yourapp@example.com", // Replace with your app's email
  //     to: guardianEmail,
  //     subject: subject,
  //     text: text,
  //   };

  //   try {
  //     // Send email
  //     await transporter.sendMail(mailOptions);
  //     console.log("Email sent successfully");
  //     // Handle success or provide feedback to the user
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     // Handle errors and provide appropriate error messages
  //   }
  // };

  // // Handle "Email tweet" button click
  // const handleEmailTweet = (guardianEmail, tweetContent) => {
  //   sendEmailToGuardian(guardianEmail, tweetContent);
  // };

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
                      // onClick={() =>
                      //   handleEmailTweet(
                      //     guardian.email,
                      //     savedTweet.tweetContent
                      //   )
                      // }
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
