const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: String,
  },
});

module.exports = sale = mongoose.model("sale", SaleSchema);
