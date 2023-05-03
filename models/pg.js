const mongoose = require("mongoose");

const PGSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  amnt: {
    type: String,
    require: true,
  },
  wg: {
    type: String,
    require: true,
  },
});

module.exports = PG = mongoose.model(
  "pg",
  PGSchema
);
