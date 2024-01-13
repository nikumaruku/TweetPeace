import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "fundality2109@gmail.com",
    pass: "xqkhxkacqesfnjcf",
  },
});

router.post("/send-email", async (req, res) => {
  const { recipientEmail, subject, message } = req.body;

  const mailOptions = {
    from: {
      name: "TweetPeace",
      address: "fundality2109@gmail.com",
    },
    to: recipientEmail,
    subject: subject,
    html: message,
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
