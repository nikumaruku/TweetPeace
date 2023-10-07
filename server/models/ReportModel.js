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
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", 
    required: true,
  },
});

export const ReportModel = mongoose.model("report", ReportSchema);
