const express = require("express");
const { getSentences, addSentences } = require("../controllers/sentences");

const router = express.Router();

router
  .route("/")
  .get(getSentences)
  .post(addSentences);

module.exports = router;
