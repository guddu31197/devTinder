const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  // logic of DB call and get user data
  try {
    throw new Error("dvjhgsa");
    res.send("User Data Sent");
  } catch {
    res.status(500).send("some error contact support team");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error
    res.status(500).send("something went wrong");
  }
});

app.listen(7777, () => {
  console.log("server is succesfully liistening on port 7777...");
});
