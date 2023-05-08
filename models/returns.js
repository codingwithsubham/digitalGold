const mongoose = require("mongoose");

const ReturnsSchema = new mongoose.Schema({
  value: {
    type: Number,
    require: true,
    default: 0,
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },
  status:{
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
});

module.exports = returns = mongoose.model("returns", ReturnsSchema);
