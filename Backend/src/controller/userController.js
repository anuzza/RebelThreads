const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
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
};

const login = async (req, res) => {
  const { email, password, isAdmin } = req.body;

  // Check if the user exists
  const oldUser = await User.findOne({ email: email, isAdmin });

  if (!oldUser) {
    if (!isAdmin) {
      return res.send({ error: "User does not exist!" });
    } else {
      return res.send({ error: "Admin does not exist!" });
    }
  }

  // Check if the password is correct
  const isPasswordMatch = await bcrypt.compare(password, oldUser.password);
  if (!isPasswordMatch) {
    return res.send({ error: "Invalid credentials!" }); // Send invalid credentials message
  }

  // Generate JWT token if password is correct
  const token = jwt.sign({ email: oldUser.email }, process.env.JWT_SECRET);

  if (res.status(201)) {
    return res.send({ status: "ok", data: token });
  } else {
    return res.send({ error: "error" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
  getUserInfo,
};
