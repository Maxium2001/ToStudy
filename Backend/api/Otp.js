const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 600 },
});

const Otp = mongoose.model("Otp", OtpSchema);

module.exports = Otp;
