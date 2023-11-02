import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

let testAccount = await nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

// let transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "fundality2109@gmail.com",
//     pass: "XXXXX",
//   },
// });

router.post("/send-email", async (req, res) => {
  const { recipientEmail, subject, message } = req.body;

  const mailOptions = {
    from: "alert@tweetpeace.com",
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return res.status(201).json({
      msg: "Email sent successfully",
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error("Error sending email: ", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

export { router as EmailRouter };
