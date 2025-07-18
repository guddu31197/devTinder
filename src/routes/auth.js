const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validations.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  try {
    // Validate for data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("EmailId is not present in DB");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;
