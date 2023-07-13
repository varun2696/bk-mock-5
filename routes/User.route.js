const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SignupModel } = require("../models/User.model");

const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  const { email, password } = req.body;

  try {
    bcrypt.hash(password, 2, async (err, hash) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        const newUser = new SignupModel({ email, password: hash });
        await newUser.save();
        res.status(200).send({ message: "success" });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await SignupModel.findOne({ email });

  if (user) {
    try {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userEmail: user.email, userId: user._id },
            "pass123"
          );
          res.status(200).send({ msg: "Login Successful", token });
        } else {
          res.status(400).send({ msg: "Invalid Credentials" });
        }
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(400).send({ msg: "Invalid Credentials" });
  }
});

module.exports = userRouter;
