const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { default: axios } = require("axios");

const {
  SERVER_ERROR,
  JWT_SECRET,
  EXPIRES_IN,
  STATUS_CODE_500,
  EMAIL_REQUIRED_INVALID,
  EMAIL,
  PASSWORD,
  PASSWORD_INVALID,
  INVALID_CREDENTIALS,
  STATUS_CODE_400,
  MOBILE,
  MOBILE_REQUIRED,
} = require("../../common/constant/constants");
const { HEADER } = require("../../common/constant/api-constants");

// @route POST api/auth
// @desc Register A User
// @access Public
router.post("/register", async (req, res) => {
  //pulling the data
  const { name, mobile, age, password, role } = req.body;
  try {
    //creating a user
    const newUser = {
      mobile: mobile,
      password: password,
      name: name,
      age: age,
      role: role,
    };
    //creating a new user Data Object
    let user = new User(newUser);
    //preparing The Salt
    const salt = await bcrypt.genSalt(10);
    //hashing the Password
    user.password = await bcrypt.hash(newUser.password, salt);
    //save the Data to db
    await user.save();
    const payload = {
      user: {
        id: user.id,
        userData: user,
      },
    };
    //Signing the Token
    jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  [
    check(MOBILE, MOBILE_REQUIRED).exists(),
    check(PASSWORD, PASSWORD_INVALID).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(STATUS_CODE_400).json({ errors: errors.array() });
    }

    //retriving Data
    const { mobile, password } = req.body;

    try {
      //Email Check In DB
      let user = await User.findOne({
        $or: [
          {
            mobile: { $regex: new RegExp("^" + mobile.toLowerCase(), "i") },
          },
        ],
      });

      if (!user) {
        return res.status(STATUS_CODE_400).json({
          errors: [{ msg: INVALID_CREDENTIALS }],
        });
      }

      //Match The Passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(STATUS_CODE_400)
          .json({ errors: [{ msg: INVALID_CREDENTIALS }] });
      }

      //Create Payload
      const payload = {
        user: {
          id: user._id,
          userData: user,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN }, (err, token) => {
        if (err) {
          throw err;
        }

        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @route GET api/auth
// @desc Get User By Id
// @access Private
router.get("/load-user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route PUT api/auth
// @desc Update User
// @access Private
router.post("/update-user/:type", auth, async (req, res) => {
  try {
    const { user } = req.body;
    const userData = await User.findById(req.user.id).select("-password");

    if (!userData) {
      res.status(STATUS_CODE_400).json({ errors: [{ msg: BAD_REQUEST }] });
    }

    if (req.params.type === "bank") {
      userData.bankDetails = user.bankDetails;
    } else if (req.params.type === "profile") {
      userData.name = user.name;
      userData.age = user.age;
      userData.username = user.username;
    }

    await userData.save();
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});


// @route POST api/auth/kyc/init
// @desc init Kyc Verification
// @access Private
router.post("/kyc/init", auth, async (req, res) => {
  try {
    const { aadhaar, pan } = req.body;
    let user = await User.findById(req.user.id).select("-password");
    const postData = {
      aadhaarNumber: aadhaar
    };
    const response = await axios.post(
      "https://api.emptra.com/aadhaarVerification/requestOtp",
      postData,
      {
        headers: HEADER
      }
    );
    if(response?.data?.result?.success){
      user.kyc = {
        aadhaar,
        pan,
        status: "pending",
        client_id: response?.data?.result?.data?.client_id
      }
      await user.save();
      return res.json(user);
    } else {
      console.log(response.data);
      res.status(STATUS_CODE_400).send("Something went wrong at Aadhar Server !!");
    }
  } catch (err) {
    console.log(err);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route POST api/auth/kyc/verify
// @desc init Kyc Verification
// @access Private
router.post("/kyc/verify", auth, async (req, res) => {
  try {
    const { otp, client_id } = req.body;
    let user = await User.findById(req.user.id).select("-password");
    const postData = { client_id, otp };
    const response = await axios.post(
      "https://api.emptra.com/aadhaarVerification/submitOtp",
      postData,
      {
        headers: HEADER
      }
    );
    if(response?.data?.result?.success){
      user.kyc ={
        ...user.kyc,
        status: "verified",
        client_id: ""
      }
      user.kycData = response?.data?.result?.data;
      await user.save();
      return res.json(user);
    } else {
      console.log(response.data);
      res.status(STATUS_CODE_400).send("Something went wrong at Aadhar Server !!");
    }
  } catch (err) {
    console.log(err);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route PUT api/auth
// @desc Forgot Password
// @access Private
router.post("/forgot-password", async (req, res) => {
  try {
    const { mobile } = req.body;
    //finding User
    let user = await User.findOne({mobile});

    if(!user){
      return res.status(STATUS_CODE_400).json({ errors: [{ msg: "User Not Exists!! Plz Register !!" }] });
    }
    const password = "123456";
    //changing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return res.status(STATUS_CODE_200).send("Password Set To Default!! Please login and Change The Password !!");
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route PUT api/auth
// @desc Forgot Password
// @access Private
router.post("/reset-password", auth, async (req, res) => {
  try {
    const { password } = req.body;
    //finding User
    let user = await User.findOne({_id: req.user.id});

    if(!user){
      return res.status(STATUS_CODE_400).json({ errors: [{ msg: "User Not Exists!! Plz Register !!" }] });
    }
    //changing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return res.status(STATUS_CODE_200).send("Password Reset Successfull");
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

module.exports = router;
