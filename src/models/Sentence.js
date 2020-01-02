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

// Cascade delete courses when a bootcamp is deleted
SentenceSchema.pre("remove", async function(next) {
  console.log(`Votes being removed from sentence ${this._id}`);
  await this.model("Vote").deleteMany({ sentence: this._id });
  next();
});

module.exports = mongoose.model("Sentence", SentenceSchema);
