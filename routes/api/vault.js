const express = require("express");
const router = express.Router();
const Vault = require("../../models/vault");
const auth = require("../../middleware/auth");
const { addBalance, debitBalance } = require("../../func/vault");

// @route GET api/vault
// @desc POST Task
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const vault = await Vault.findOne({ user: req.user.id });
    return res.json(vault);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/vault
// @desc POST Task
// @access Private
router.post("/credit", auth, async (req, res) => {
  try {
    const { val, remarks } = req.body;
    const vault = await addBalance(req.user.id, val, remarks)
    return res.json(vault);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/vault
// @desc POST Task
// @access Private
router.post("/debit", auth, async (req, res) => {
  try {
    const { val, remarks } = req.body;
    const vault = await debitBalance(req.user.id, val, remarks)
    return res.json(vault);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/vault
// @desc POST Task
// @access Private
router.post("/transfer", auth, async (req, res) => {
  try {
    const { to, val } = req.body;
    await addBalance(to, val, "Transfered")
    const vault = await debitBalance(req.user.id, val, "Transfered")
    return res.json(vault);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

module.exports = router;
