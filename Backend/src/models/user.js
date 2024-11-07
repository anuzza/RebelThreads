const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClothingForSale",
      },
    ],
    reports: [
      {
        reporter: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    toJSON: true,
    timestamps: true,
  }
);

// To use virtual fields(Clothes Sold by this user)
userSchema.virtual("clothForSale", {
  ref: "ClothingForSale",
  localField: "_id",
  foreignField: "seller",
  options: { sort: { createdAt: -1 } },
});

// To use virtual fields(Clothes Requested by this user)
userSchema.virtual("clothesRequested", {
  ref: "ClothesRequested",
  localField: "_id",
  foreignField: "user",
  options: { sort: { active: 1, createdAt: -1 } },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  await User.updateOne(
    { email: user.email },
    { tokens: user.tokens.concat({ token }) }
  );
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email or password is invalid");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email or password is invalid");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
