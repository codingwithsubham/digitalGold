const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const PG = require("../../models/pg");
const {
  SERVER_ERROR,
  STATUS_CODE_500,
  STATUS_CODE_200,
  STATUS_CODE_400,
  BAD_REQUEST,
} = require("../../common/constant/constants");
const { default: axios } = require("axios");
const Vault = require("../../models/vault");
const { addBalance } = require("../../func/vault");

// @route POST api/pg/create-order`
// @desc init payment gateway
// @access Private
router.post("/create-order", auth, async (req, res) => {
  try {
    const user = req.user.userData;
    const { amnt, wg } = req.body;
    const pg = new PG({
      user: req.user.id,
      amnt: amnt,
      wg: wg,
    });
    await pg.save();
    //payload
    const postData = {
      key: "957a9bca-d128-42e2-9918-1c00107c078a",
      client_txn_id: pg._id,
      amount: `${amnt}`,
      p_info: "purchase",
      customer_name: user.name,
      customer_email: `${user.name.split(" ")[0]}@digitalgold.com`,
      customer_mobile: user.mobile,
      redirect_url: "https://digitalgold.onrender.com/vault",
      udf1: "GOLD_WALLET"

    };
    const response = await axios.post(
      "https://merchant.upigateway.com/api/create_order",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODE_500).json({ errors: [{ msg: SERVER_ERROR }] });
  }
});

// @route POST api/pg/order-success
// @desc Callback payment gateway
// @access Private
router.post("/order-success", async (req, res) => {
  try {
    const { client_txn_id, status } = req.body;
    if (status !== "failure") {
      const pg = await PG.findById(client_txn_id);
      if (pg) {
        await addBalance(pg.user, pg.wg, "Self Purchased.");
        return res.status(STATUS_CODE_200).json({ success: true });
      } else {
        return res
          .status(STATUS_CODE_400)
          .json({ errors: [{ msg: BAD_REQUEST }] });
      }
    } else {
      return res
        .status(STATUS_CODE_400)
        .json({ errors: [{ msg: BAD_REQUEST }] });
    }
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODE_500).json({ errors: [{ msg: SERVER_ERROR }] });
  }
});

module.exports = router;
