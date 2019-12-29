const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Vote = require("../models/Vote");
const Sentence = require("../models/Sentence");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Set user vote
// @route     POST /api/v1/sentences/:sentenceId/vote
// @access    Public
exports.addVote = asyncHandler(async (req, res, next) => {
  // const { user_id } = req.headers;
  // const { sentence_id } = req.params;
  // const { is_positive } = req.query;

  // let vote = await Vote.findOne({ user_id, sentence_id });

  // if (!vote) {
  //   vote = await Vote.create({
  //     user: user_id,
  //     sentence: sentence_id,
  //     is_positive
  //   });

  //   await vote
  //     .populate("user")
  //     .populate("sentence")
  //     .execPopulate();
  // }

  // const sentences = req.body.sentences;

  // await sentences.map(sentence => Sentence.create(sentence));
  req.body.sentence = req.params.sentenceId;

  const sentence = await Sentence.findById(req.params.sentenceId);

  if (!sentence) {
    return next(
      new ErrorResponse(
        `No sentence with the id of ${req.params.sentenceId}`,
        404
      )
    );
  }

  const user = await User.findOne({ ip: req.ip });

  req.body.user = user;

  const vote = await Vote.create(req.body);

  res.status(201).json({
    success: true,
    data: vote
  });
});

// @desc      Get all votes
// @route     GET /api/v1/votes
// @access    Public
exports.getVotes = asyncHandler(async (req, res, next) => {
  const votes = await Vote.find();
  return res.status(200).json({
    success: true,
    count: votes.length,
    data: votes
  });
});
