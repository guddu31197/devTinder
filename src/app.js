const express = require("express");

const app = express();

// Handle Auth Middleware for all GET POST, ... requests
const { adminAuth, userAuth } = require("./middlewares/auth");
app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("User loggedin succefully");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(7777, () => {
  console.log("server is succesfully liistening on port 7777...");
});
