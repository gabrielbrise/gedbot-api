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

  const userAgent = crypto
    .createHash("sha256")
    .update(req.headers["user-agent"])
    .digest("hex");

  let user = await User.findOne({ ip, userAgent });

  if (!user) {
    user = await User.create({ ip, userAgent });
  }

  return res.status(200).json(user);
});
