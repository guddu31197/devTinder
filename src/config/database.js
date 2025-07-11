const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamsteDev:L33DnOaAspIFM9F4@namstedev.i0tlkbs.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
