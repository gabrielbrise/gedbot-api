const asyncHandler = require("../middleware/async");
const Sentence = require("../models/Sentence");

// @desc      Get all sentences
// @route     GET /api/v1/sentences
// @access    Public
exports.getSentences = asyncHandler(async (req, res, next) => {
  const sentences = await Sentence.find();
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
