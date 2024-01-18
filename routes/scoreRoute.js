require("dotenv").config();

const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreCtrl");

const OriginCheck = (req, res, next) => {
  const allowedOrigin = process.env.FRONT1;

  if (req.headers.origin !== allowedOrigin) {
    res.status(403).send("Forbidden");
    return;
  } else {
    return next();
  }
};

// Insert a new score
router.post("/scores", OriginCheck, scoreController.insertScore);

// Retrieve all scores
router.get("/scores", OriginCheck, scoreController.retrieveScores);

module.exports = router;
