const Score = require("../models/scoreModel");

const scoreController = {
  async insertScore(req, res, next) {
    try {
      const { playerName, gameName, time } = req.body;

      if (!playerName || !gameName || !time) {
        // throw new Error("Missing required fields");
        res.status(500).json({ message: "Missing required fields" });
        return;
      }

      // Create a new score document
      const newScore = new Score({
        playerName,
        gameName,
        time,
      });

      // Save the score to the database
      const savedScore = await newScore.save();

      res.status(201).json(savedScore);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async retrieveScores(req, res) {
    try {
      // Retrieve all scores from the database
      const scores = await Score.find();

      res.status(200).json(scores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = scoreController;
