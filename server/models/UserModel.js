import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  savedTweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "savedTweet",
    },
  ],
  analysedTweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "analysedTweet",
    },
  ],
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "report",
    },
  ],
  guardian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "report",
  },
  feedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feedback",
    },
  ],
});

export const UserModel = mongoose.model("users", UserSchema);
