const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Enter a strong password: " + value)
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender type`,
      },
      // validate(value) {
      //   if (!["male" || "female" || "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
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

userSchema.index({firstName: 1})
userSchema.index({gender: 1})

userSchema.methods.getJWT = async function(){
  const user = this;

  const tokekn = await JsonWebTokenError.sign({_id:user._id}, "DEV@Tinder$790", {
    expiresIn: "7d",
  })
  return tokekn
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  )
  return isPasswordValid
}
module.exports = mongoose.model("User", userSchema);
