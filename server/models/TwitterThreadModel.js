import mongoose from "mongoose";

const TwitterThreadSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  threadId: [String],
  tweets: [String],
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "users", // Reference to the 'User' model
  //   required: true,
  // },
});

export const TwitterThreadModel = mongoose.model(
  "TwitterThread",
  TwitterThreadSchema
);
