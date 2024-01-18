const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  playerName: {
    type: String,
    required: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

// Compile the schema into a model
// Export the model
module.exports = mongoose.model("Score", scoreSchema);
