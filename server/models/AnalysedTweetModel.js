import mongoose from "mongoose";

const AnalysedTweetSchema = mongoose.Schema({
  tweetLink: {
    type: String,
    required: true,
    unique: true, // Ensures that each tweet link is unique
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AnalysedTweetModel = mongoose.model(
  "analysedTweet",
  AnalysedTweetSchema
);
