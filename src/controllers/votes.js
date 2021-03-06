const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Vote = require("../models/Vote");
const Sentence = require("../models/Sentence");
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Set user vote
// @route     POST /api/v1/sentences/:sentenceId/vote
// @access    Public
exports.addVote = asyncHandler(async (req, res, next) => {
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

  const ip = crypto
    .createHash("sha256")
    .update(req.ip)
    .digest("hex");

  const userAgent = crypto
    .createHash("sha256")
    .update(req.headers["user-agent"])
    .digest("hex");

  let user = await User.findOne({ ip, userAgent });

  if (!user) {
    user = await User.create({ ip, userAgent });
  }

  req.body.user = user._id;

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
