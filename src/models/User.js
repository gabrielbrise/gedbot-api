const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  ip: String
});

module.exports = mongoose.model("User", UserSchema);
