const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  ip: String,
  userAgent: String
});

module.exports = mongoose.model("User", UserSchema);
