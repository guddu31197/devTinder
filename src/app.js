const express = require("express");

const app = express();

app.use("/user", [
  (req, res, next) => {
    console.log("Handling the route user!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2!!");
    // res.send("2nd Response!!");
    next();
  },
  ],
  (req, res, next) => {
    console.log("Handling the route user 2!!");
    // res.send("3rd Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2!!");
    // res.send("4th Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2!!");
    res.send("5th Response!!");
  },
);

app.listen(7777, () => {
  console.log("server is succesfully liistening on port 7777...");
});
