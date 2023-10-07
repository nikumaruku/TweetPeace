import mongoose from "mongoose";

const AnalysedTweetSchema = mongoose.Schema({
  tweetLink: {
    type: String,
    required: true,
    unique: true,
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

export const AnalysedTweetModel = mongoose.model(
  "analysedTweet",
  AnalysedTweetSchema
);
