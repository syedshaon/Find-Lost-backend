const Score = require("../models/scoreModel");

const scoreController = {
  async gameStart(req, res, next) {
    try {
      const { gameName } = req.body;

      if (!gameName) {
        // throw new Error("Missing required fields");
        res.status(500).json({ message: "Missing required fields" });
        return;
      }

      // Create a new score document
      const newScore = new Score({
        gameName,
        startTime: new Date().toLocaleString(),
      });

      // Save the score to the database
      const savedScore = await newScore.save();

      res.status(201).json(savedScore);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async updateScore(req, res, next) {
    try {
      const { playerName, gameId } = req.body;

      // Find the score based on gameName and playerName
      const score = await Score.findOne({ _id: gameId });

      // If the score doesn't exist, return an error
      if (!score) {
        return res.status(404).json({ error: "Score not found" });
      }

      // Update the fields if provided in the request body

      score.playerName = playerName;

      score.endTime = new Date().toLocaleString();

      // Save the updated score
      await score.save();

      // Return the updated score
      res.json({ message: "Score updated successfully", score });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // async insertScore(req, res, next) {
  //   try {
  //     const { playerName, gameName, time } = req.body;

  //     if (!playerName || !gameName || !time) {
  //       // throw new Error("Missing required fields");
  //       res.status(500).json({ message: "Missing required fields" });
  //       return;
  //     }

  //     // Create a new score document
  //     const newScore = new Score({
  //       playerName,
  //       gameName,
  //       time,
  //     });

  //     // Save the score to the database
  //     const savedScore = await newScore.save();

  //     res.status(201).json(savedScore);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // },

  async retrieveScores(req, res) {
    try {
      // Retrieve all scores from the database
      const scores = await Score.find({ endTime: { $ne: null } });

      res.status(200).json(scores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = scoreController;
