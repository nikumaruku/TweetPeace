import mongoose from "mongoose";

const ReportSchema = mongoose.Schema({
  tweetLink: {
    type: String,
    required: true,
  },
  incidentType: {
    type: String,
    required: true,
    enum: ["Doxx", "Threathen", "Mencarut"],
  },
  description: {
    type: String,
    required: true,
  },
  screenshot: {
    type: String, // You can store the file path or URL here
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ReportModel = mongoose.model("report", ReportSchema);
