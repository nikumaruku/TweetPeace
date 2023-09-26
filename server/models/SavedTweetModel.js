import mongoose from "mongoose";

const SavedTweetSchema = mongoose.Schema({
  tweetContent: {
    type: String,
    required: true,
  },
  analysisResult: {
    score: Number,
    overallSentiment: String,
    tweetCategory: String,
    negativeWordCount: Number,
    badWords: [
      {
        word: String,
        count: Number,
      },
    ],
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "users",
  //   // required: true,
  // },
});

export const SavedTweetModel = mongoose.model("savedTweet", SavedTweetSchema);