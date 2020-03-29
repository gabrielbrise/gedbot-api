const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const crypto = require("crypto");

// @desc      Get user
// @route     GET /api/v1/users/:id
// @access    Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const ip = crypto
    .createHash("sha256")
    .update(req.ip)
    .digest("hex");

  let user = await User.findOne({ ip });

  if (!user) {
    user = await User.create({ ip: ip });
  }

  return res.status(200).json(user);
});
