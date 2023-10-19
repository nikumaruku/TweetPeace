import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
//   verdicts: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "report",
//     },
//   ],
});

export const AdminModel = mongoose.model("admin", adminSchema);
