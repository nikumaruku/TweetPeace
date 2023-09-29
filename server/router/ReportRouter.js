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

router.get("/", async (req, res) => {
  try {
    const reports = await ReportModel.find().sort({ createdAt: -1 }); // Fetch all reports and sort by createdAt in descending order
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/numReports", async (req, res) => {
  try {
    const numReports = await ReportModel.countDocuments();
    res.json({ numReports });
  } catch (error) {
    console.error("Error fetching number of reports:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as ReportRouter };
