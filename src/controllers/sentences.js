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
  const votes = await Vote.find();
  const ip = crypto
    .createHash("sha256")
    .update(req.ip)
    .digest("hex");

  let user = await User.findOne({ ip });

  if (!user) {
    user = await User.create({ ip });
  }

  const userVotes = votes.filter(vote => vote.user === user._id);
  const userVotesSentencesIds = userVotes.map(vote => vote.sentence);
  const userVotesSentencesisPositive = userVotes.map(vote => vote.isPositive);

  if (userVotes) {
    sentences = sentences.map((sentence, index) => {
      if (userVotesSentencesIds.includes(sentence._id)) {
        return {
          ...sentences,
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
