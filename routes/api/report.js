const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { HEADER } = require("../../common/constant/api-constants");
const { default: axios } = require("axios");

// @route GET api/report
// @desc get gold price
// @access Private
router.get("/gold", auth, async (req, res) => {
  try {
    const response = await axios.get(
      "https://zgoldapi.onrender.com/api/price/gold/kolkata",
      {
        headers: HEADER,
      }
    );
    return res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

module.exports = router;
