const mongoose = require("mongoose");

const clothesRequestedSchema = new mongoose.Schema(
  {
    clothing: {
      title: {
        type: String,
        trim: true,
        required: true,
      },
      brand: {
        type: String,
        trim: true,
      },
      size: {
        type: String,
        trim: true,
        required: true,
      },
      category: {
        type: String,
        trim: true,
        required: true,
      },
      gender: {
        type: String,
        enum: ["male", "female", "unisex"],
        required: true,
      },
      description: {
        type: String,
        trim: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "fulfilled", "closed"],
      default: "open",
    },
    active: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
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
    timestamps: true,
  }
);

const ClothesRequested = mongoose.model(
  "ClothesRequested",
  clothesRequestedSchema
);

module.exports = ClothesRequested;
