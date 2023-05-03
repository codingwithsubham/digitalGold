const mongoose = require("mongoose");

const VaultSchema = new mongoose.Schema({
  vaultBalance: {
    type: Number,
    require: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  passbook: [
    {
      value: {
        type: Number,
      },
      type: {
        type: String,
      },
      date: {
        type: String,
      },
      remarks: {
        type: String,
      },
    },
  ],
});

module.exports = Vault = mongoose.model("vault", VaultSchema);
