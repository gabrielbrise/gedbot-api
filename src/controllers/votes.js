const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Vote = require("../models/Vote");
const Sentence = require("../models/Sentence");

// @desc      Set user vote
// @route     PUT /api/v1/sentences/:sentenceId/vote
// @access    Public
exports.setVote = asyncHandler(async (req, res, next) => {
  const { user_id } = req.headers;
  const { sentence_id } = req.params;
  const { is_positive } = req.query;

  let vote = await Vote.findOne({ user_id, sentence_id });

  if (!vote) {
    vote = await Vote.create({
      user: user_id,
      sentence: sentence_id,
      is_positive
    });

    await vote
      .populate("user")
      .populate("sentence")
      .execPopulate();
  }
});
