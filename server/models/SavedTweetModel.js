import mongoose from "mongoose";

const SavedTweetSchema = mongoose.Schema({
  tweetContent: {
    type: String,
    required: true,
  },
  isiTweet: {
    type: String,
  },
  analysisResult: {
    score: Number,
    overallSentiment: String,
    isiTweet: String,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the 'User' model
    required: true,
  },
});

export const SavedTweetModel = mongoose.model("savedTweet", SavedTweetSchema);
