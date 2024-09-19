const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  code: { type: Number, required: true},
  expires: {
    type: Date,
    required: true,
    index: { expires: "10m" }, // specify the TTL value (e.g., 10 minutes)
  },
});

mongoose.pluralize(null);
const Otp = mongoose.model("Otp", otpSchema);
module.exports = { Otp };
