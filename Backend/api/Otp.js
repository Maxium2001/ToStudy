const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: Number },
});

const Otp = mongoose.model("Otp", OtpSchema);

module.exports = Otp;
