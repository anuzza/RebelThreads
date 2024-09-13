const mongoose = require("mongoose");
const validator = require("validator");

const userDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", userDetailSchema);
