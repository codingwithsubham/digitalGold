const express = require("express");
const router = express.Router();
const Returns = require("../../models/returns");
const Sale = require("../../models/sale");
const auth = require("../../middleware/auth");
const { addReturns } = require("../../func/sale");
const { debitBalance } = require("../../func/vault");

// @route GET api/sale
// @desc GET API
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const sale = await Sale.find({}).sort({ date: -1 }).populate("user");
    return res.json(sale);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/sale
// @desc GET API
// @access Private
router.get("/returns", auth, async (req, res) => {
  try {
    const sale = await Returns.find({}).sort({ date: -1 }).populate("user");
    return res.json(sale);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/sale
// @desc GET returns by user
// @access Private
router.get("/returns/user", auth, async (req, res) => {
  try {
    const sale = await Returns.find({ user: req.user.id })
      .sort({ date: -1 })
      .populate("user");
    return res.json(sale);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/sale
// @desc POST Task
// @access Private
router.post("/return", auth, async (req, res) => {
  try {
    const { val, price } = req.body;
    const vault = await debitBalance(req.user.id, val, "Sold Back");
    if (vault) {
      await addReturns(req.user.id, val, price);
      return res.json(vault);
    }
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

module.exports = router;
