const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  playerName: {
    type: String,
    required: false,
  },
  gameName: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: false,
  },
});

// Compile the schema into a model
// Export the model
module.exports = mongoose.model("Score", scoreSchema);
