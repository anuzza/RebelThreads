const express = require("express");
const cors = require("cors");

const connectDB = require("./src/database/mongoose");
const userRouter = require("./src/routes/user");
require("dotenv").config({ path: "./config/dev.env" });

connectDB();

const app = express();

const port = process.env.PORT || 8080;
app.use(cors());

//routes
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
