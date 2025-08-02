const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

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
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).send("Please login!");
    }

    const decodeObj = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodeObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err, "Auth Middleware Error");
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
