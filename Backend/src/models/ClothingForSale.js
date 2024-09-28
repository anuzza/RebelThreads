const mongoose = require("mongoose");

const clothingForSaleSchema = new mongoose.Schema(
  {
    clothing: {
      title: {
        type: String,
        trim: true,
        required: true,
      },
      description: {
        type: String,
        trim: true,
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
      condition: {
        type: String,
        enum: ["New", "Like New", "Good", "Fair", "Worn"],
        required: true,
        trim: true,
      },
      category: {
        type: String,
        trim: true,
        required: true,
      },
      gender: {
        type: String,
        enum: ["Men", "Women", "Unisex"],
        required: true,
      },
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    pictures: [
      {
        type: String,
        trim: true,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    reports: [
      {
        reason: String,
        reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["pending", "reviewed", "resolved"],
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ClothingForSale = mongoose.model(
  "ClothingForSale",
  clothingForSaleSchema
);

module.exports = ClothingForSale;
