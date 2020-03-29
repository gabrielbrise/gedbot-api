const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const crypto = require("crypto");

// @desc      Get user
// @route     GET /api/v1/users/:id
// @access    Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const ip = req.ip;

  const IpToken = crypto
    .createHash("sha256")
    .update(ip)
    .digest("hex");

  let user = await User.findOne({ ip: ipToken });

  if (!user) {
    user = await User.create({
      ip: ipToken
    });
  }

  return res.status(200).json(user);
});
