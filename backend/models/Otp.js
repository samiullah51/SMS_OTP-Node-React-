const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    otpCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", OtpSchema);
