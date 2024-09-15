const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoUrl =
  "mongodb+srv://sharmanuja4:admin44@cluster0.fn5n1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const JWT_SECRET =
  "d15394f79d6910f3b96f14c08f58b797d45217614b588a0204e5c5459dabda20";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });
require("./UserDetails");

const User = mongoose.model("UserInfo");

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ data: "User already exists!" });
  }

  const encryptedPw = await bcrypt.hash(password, 10);
  try {
    await User.create({
      name: name,
      email,
      password: encryptedPw,
    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const oldUser = await User.findOne({ email: email, isAdmin });

  if (!oldUser) {
    if (!isAdmin) {
      return res.send({ data: "User does not exist!" });
    } else {
      return res.send({ data: "Admin does not exist!" });
    }
  }

  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.send({ status: "ok", data: token });
    } else {
      return res.send({ error: "error" });
    }
  }
});

app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user?.email;

    User.findOne({ email: userEmail }).then((data) => {
      return res.send({ status: "ok", data: data });
    });
  } catch (error) {
    return res.send({ error: "error" });
  }
});

app.listen(5001, () => {
  console.log("Node js server started");
});
