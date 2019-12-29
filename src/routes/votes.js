const express = require("express");
const { addVote, getVotes } = require("../controllers/votes");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(addVote)
  .get(getVotes);

module.exports = router;
