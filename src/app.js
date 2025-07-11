const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // creating a new instance of the User model
  const user = new User({
    firstName: "Sachin",
    lastName: "Tendulkar",
    emailId: "sachin@gmail.com",
    password: "@Sachin123",
  });

  try {
    await user.save();
    res.send("user added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("server is succesfully liistening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });
