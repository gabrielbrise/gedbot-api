const asyncHandler = require("../middleware/async");

// @desc      Get all sentences
// @route     GET /api/v1/sentences
// @access    Public
exports.getSentences = asyncHandler(async (req, res, next) => {
  res.status(200).json({ text: "Hello World" });
});
