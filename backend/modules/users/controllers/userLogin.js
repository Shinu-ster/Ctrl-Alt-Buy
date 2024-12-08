const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const userLogin = async (req, res) => {
  const User = mongoose.model("users");
  const { email, password } = req.body;
  let getUser;

  try {
    if (!email) throw "Email is required";
    if (!password) throw "Password is required";

    getUser = await User.findOne({ email });
    if (!getUser) throw "Email doesn't exists";
    const matched = await bcrypt.compare(password, getUser.password);
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error,
    });
    return;
  }
  const accessToken = jwt.sign(
    {
      _id: getUser._id,
      email: getUser.email,
      username: getUser.username,
    },
    process.env.jwt_secret_key,
    { expiresIn: "30 days" }
  );
  console.log("Login data", req.body);
  res.status(200).json({
    status: "Login Succesfully",
    accessToken,
  });
};

module.exports = userLogin;
