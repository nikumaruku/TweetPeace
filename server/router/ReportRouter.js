import express from "express";
import { ReportModel } from "../models/ReportModel.js";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

router.post("/:username", async (req, res) => {
  try {
    const { tweetLink, incidentType, description, screenshot } = req.body;
    const username = req.params.username;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const report = new ReportModel({
      tweetLink,
      incidentType,
      description,
      screenshot,
      user: user._id,
    });

    await report.save();

    user.reports.push(report._id);

    await user.save();

    res.status(201).json({ message: "Report created successfully", report });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const reports = await ReportModel.find().sort({ createdAt: -1 }); // Fetch all reports and sort by createdAt in descending order
//     res.status(200).json(reports);
//   } catch (error) {
//     console.error("Error fetching reports:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const reports = await ReportModel.find({user}).sort({ createdAt: -1 }); // Fetch all reports and sort by createdAt in descending order
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/numReports/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const numReports = await ReportModel.countDocuments({
      user: user._id,
    });

    res.json({ numReports });
  } catch (error) {
    console.error("Error counting analyzed tweets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as ReportRouter };
