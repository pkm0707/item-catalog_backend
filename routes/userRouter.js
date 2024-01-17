const express = require("express");

const router = express.Router();
const User = require("../model/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const secretkey = "sdkjfkdsnksd>dsf<dsfds/fdsfsddffw";

//signup section ;

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, image } =
    req.body;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
        alert: false,
      });
    } else {
      const userdetails = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        image,
      });
      res.status(200).json({
        success: true,
        message: "User Signup Successfully....",
        alert: true,
        data: userdetails,
      });
      console.log(userdetails);
    }
  } catch (error) {
    res.status(400).json({
      message: "Bad Request",
      error: error,
    });
  }
});

//login section ;
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const customer = await User.findOne({ email });

  if (!customer) {
    return res.status(400).json({
      success: false,
      message: "User Not Found...",
    });
  }

  if (await bcrypt.compare(password, customer.password)) {
    const token = jwt.sign({ email: customer.email }, secretkey, {
      expiresIn: "60m",
    });
    console.log(token);
    if (res.status(201)) {
      return res.json({
        success: true,
        alert: true,
        message: "User Login Successfully..!!",
        customer,
        data: token,
      });
    } else {
      return res.json({
        success: false,
        message: "invalid Credantials",
      });
    }
  }
  res.status(400).json({
    success: false,
    message: " Invalid Password..",
  });
});

module.exports = router;
