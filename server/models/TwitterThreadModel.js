import mongoose from "mongoose";

const TwitterThreadSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  threadId: [String],
  tweets: [String],
});

export const TwitterThreadModel = mongoose.model(
  "TwitterThread",
  TwitterThreadSchema
);
