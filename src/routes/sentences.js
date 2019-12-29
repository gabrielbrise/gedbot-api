const express = require("express");
const { getSentences, addSentences } = require("../controllers/sentences");

const router = express.Router();

// Include other resource routers
const voteRouter = require("./votes");

// Re-route into other resource routers
router.use("/:sentenceId/vote", voteRouter);

router
  .route("/")
  .get(getSentences)
  .post(addSentences);

module.exports = router;
