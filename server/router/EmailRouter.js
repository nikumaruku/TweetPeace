import express from "express";
import { sendEmail } from "../module/emailService.js";

const router = express.Router();

router.post("/send-email", async (req, res) => {
    try {
      const { recipientEmail, subject, message } = req.body;
  
      await sendEmail(recipientEmail, subject, message);
  
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Email sending failed" });
    }
  });
  
