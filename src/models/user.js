const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: "true",
      lowercase: "true",
      trim: "true",
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid email address " +value)
        }
      }
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male" || "female" || "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.JDqZ9cbP_XvNSa258lK-wAHaHa?w=163&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
    },
    about: {
      type: String,
      default: "This is a default about of the user !",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
