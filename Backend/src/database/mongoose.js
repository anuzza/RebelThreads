const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
    console.log("Connection Failed");
    process.exit(1);
  }
};

module.exports = connectDB;
