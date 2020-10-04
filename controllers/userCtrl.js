const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userCtrl = {
  getIndex: (req, res) => {
    console.log(req.header("auth-token"));
    res.json({ msg: "index" });
  },

  register: async (req, res) => {
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      res.json({ msg: "Email already exists" });
      return;
    }

    const name = await User.findOne({ name: req.body.name });
    if (name) {
      res.json({ msg: "username already exists" });
      return;
    }

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    await newUser.save();
    res.json({ msg: "register success!" });
  },

  login: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.json({ msg: "Email is not found" });
      return;
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      res.json({ msg: "Invalid password" });
      return;
    }

    if (user && validPass) {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).send(token);
      res.locals.user = user;
      res.json({ msg: token });
      // res.send(token);
      // next();
    }
  },

  getLogin: (req, res) => {
    res.json({ msg: "Loggin" });
  },

  getRegister: (req, res) => {
    res.json({ msg: "Register" });
  },
};

module.exports = userCtrl;
