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

// Count votes and check if is approved or rejected

// SentenceSchema.statics.getScore = async function() {
//   try {
//     await this.model("Votes").findById(sentenceId)
//   } catch (err) {

//   }
// }

// Static method to get avg rating and save
// SentenceSchema.statics.getRating = async function(sentenceId) {
//   const obj = await this.aggregate([
//     {
//       $match: { bootcamp: bootcampId }
//     },
//     {
//       $group: {
//         _id: "$sentence",
//         averageRating: { $avg: "$rating" }
//       }
//     }
//   ]);
//   try {
//     await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
//       averageRating: obj[0].averageRating
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// Call getAverageCost after save
// ReviewSchema.post("save", function() {
//   this.constructor.getAverageRating(this.bootcamp);
// });

module.exports = mongoose.model("Sentence", SentenceSchema);
