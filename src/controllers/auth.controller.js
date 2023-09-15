const {
  registrationValidation,
  loginValidation,
} = require("../utils/validation");
const User = require("../model/user.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { error } = registrationValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const mobileExists = await User.findOne({ mobile: req.body.mobile });
  if (mobileExists) {
    return res.status(400).send("mobile already exists");
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    mobile: req.body.mobile,
  });

  try {
    const savedUser = await user.save();
    return res.status(200).send(user._id);
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("email doesn't exists");
  }

  const validPass = bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("email or password is wrong");
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

module.exports = {
  loginUser,
  registerUser,
};
