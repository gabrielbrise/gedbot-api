const express = require("express");
const { getSentences } = require("../controllers/sentences");

const router = express.Router();

router.route("/").get(getSentences);

module.exports = router;
