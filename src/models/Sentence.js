const mongoose = require("mongoose");

const SentenceSchema = new mongoose.Schema({
  position: {
    type: Number,
    min: [1, "Position must be 1, 2 or 3"],
    max: [3, "Position must be 1, 2 or 3"]
  },
  text: String,
  score: Number,
  isApproved: Boolean
});

module.exports = mongoose.model("Sentence", SentenceSchema);
