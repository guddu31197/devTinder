const express = require('express');

const app = express();

app.use("/",(req, res)=>{
  res.send("Hello from dashboard....");
});

app.use("/hello",(req, res)=>{
  res.send("Hello hello hello hello!");
});

app.use("/test",(req, res)=>{
  res.send("Hello from the server!");
});

app.listen(7777, ()=>{
  console.log("server is succesfully liistening on port 7777...")
})