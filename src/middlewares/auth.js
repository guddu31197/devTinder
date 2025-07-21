const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config()

const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked!");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("please Ligin!");
    }
    console.log(process.env.JWT_SECRET, "process.env.JWT_SECRET", token)

  const decodeObj = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodeObj, "jkaefkj")


    const { _id } = decodeObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not find");
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err, "error mesggage")
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
