const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  role: [{
    type: String,
    require: true,
  }],
  age: {
    type: String,
    require: true
  },
  kycData: {
    type: Object,
  },
  kyc: {
    type: Object,
  },
  bankDetails: {
    type: Object,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
