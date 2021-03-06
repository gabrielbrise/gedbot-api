const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  isPositive: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sentence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sentence"
  }
});

// Count votes and check if is approved or rejected

VoteSchema.statics.getScore = async function(sentenceId) {
  const obj = await this.aggregate([
    {
      $match: { sentence: sentenceId }
    },
    {
      $group: {
        _id: "$sentence",
        score: { $sum: { $cond: ["$isPositive", 1, -1] } }
      }
    }
  ]);
  if (obj[0].score >= process.env.SCORE_APPROVED) {
    try {
      return await this.model("Sentence").findByIdAndUpdate(sentenceId, {
        score: obj[0].score,
        isApproved: true
      });
    } catch (error) {
      return console.error(error);
    }
  }
  if (obj[0].score <= process.env.SCORE_REJECTED) {
    console.log("deletando sentenca rejeitada");
    await this.model("Sentence").findByIdAndDelete(sentenceId);
  }
  try {
    await this.model("Sentence").findByIdAndUpdate(sentenceId, {
      score: obj[0].score
    });
  } catch (error) {
    console.error(error);
  }
};

// Call getAverageCost after save
VoteSchema.post("save", function() {
  this.constructor.getScore(this.sentence);
});

module.exports = mongoose.model("Vote", VoteSchema);
