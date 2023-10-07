import mongoose from "mongoose";

const GuardianSchema = mongoose.Schema({
  name: {
    type: String,
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
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Use a regular expression to validate phone number format (e.g., 123-456-7890)
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: "Phone number must be in the format XXX-XXX-XXXX",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the 'User' model
    required: true,
  },
});

export const GuardianModel = mongoose.model("guardian", GuardianSchema);
