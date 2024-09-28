const express = require("express");
const cors = require("cors");

const connectDB = require("./src/database/mongoose");
const userRouter = require("./src/routes/user");
const clothForSaleRouter = require("./src/routes/clothForSale");
const clothRequestedRouter = require("./src/routes/clothRequested");
require("dotenv").config({ path: "./config/dev.env" });

connectDB();

const app = express();

const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/users", userRouter);
app.use("/sales", clothForSaleRouter);
app.use("/requests", clothRequestedRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
