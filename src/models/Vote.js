const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  is_positive: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sentence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sentence"
  }
});

module.exports = mongoose.model("Vote", VoteSchema);
