const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");

requestRouter.post("/sendConnectionRequests", userAuth, async (req, res) => {
  const user = req.user;
  // sending a connection request
  console.log("Sending a connection request");

  res.send(user.firstName + "send the connection request!");
});

module.exports = requestRouter;
