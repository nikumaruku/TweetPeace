import express from "express";
import { ReportModel } from "../models/ReportModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { tweetLink, incidentType, description, screenshot } = req.body;

    const report = new ReportModel({
      tweetLink,
      incidentType,
      description,
      screenshot,
    });

    await report.save();

    res.status(201).json({ message: "Report created successfully", report });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as ReportRouter };
