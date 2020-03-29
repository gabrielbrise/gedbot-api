const asyncHandler = require("../middleware/async");
const Sentence = require("../models/Sentence");
const User = require("../models/User");
const Vote = require("../models/Vote");
const crypto = require("crypto");

// @desc      Get all sentences
// @route     GET /api/v1/sentences
// @access    Public
exports.getSentences = asyncHandler(async (req, res, next) => {
  let sentences = await Sentence.find();
  const ip = crypto
    .createHash("sha256")
    .update(req.ip)
    .digest("hex");

  let user = await User.findOne({ ip });

  if (!user) {
    user = await User.create({ ip });
  }

  const userVotes = await Vote.find({ user: user._id });
  const userVotesSentencesIds = userVotes.map(vote =>
    vote.sentence._id.toString()
  );

  const userVotesSentencesisPositive = userVotes.map(vote => vote.isPositive);

  if (userVotes) {
    sentences = sentences.map((sentence, index) => {
      if (userVotesSentencesIds.includes(sentence._id.toString())) {
        return {
          score: sentence.score,
          isApproved: sentence.isApproved,
          _id: sentence._id,
          position: sentence.position,
          text: sentence.text,
          __v: sentence.__v,
          isVoted: true,
          isPositive: userVotesSentencesisPositive[index]
        };
      }
      return sentence;
    });
  }

  return res.status(200).json({
    success: true,
    count: sentences.length,
    data: sentences
  });
});

// @desc      Create a sentence
// @route     POST /api/v1/sentences
// @access    Public
exports.addSentences = asyncHandler(async (req, res, next) => {
  const sentences = req.body.sentences;

  await sentences.map(sentence => Sentence.create(sentence));

  res.status(200).json({
    success: true,
    data: sentences
  });
});
