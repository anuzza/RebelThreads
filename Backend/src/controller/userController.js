const User = require("../models/user");

const signupUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    let validationErrors = {};
    if (error.errors || error.code === 11000) {
      if (error.errors) {
        if (error.errors.name) {
          validationErrors.error = "Name is required";
        }
        if (error.errors.email) {
          switch (error.errors.email.kind) {
            case "user defined":
              validationErrors.error = error.errors.email.properties.message;
              break;
            default:
              validationErrors.error = "Email is required";
          }
        }
        if (error.errors.password) {
          switch (error.errors.password.kind) {
            case "minlength":
              validationErrors.error = "Password must be 6 characters long";
              break;
            case "required":
              validationErrors.error = "Password is required";
              break;
            default:
              validationErrors.error = "Cannot contain the word password";
          }
        }
      } else {
        validationErrors.error = "User already exists";
      }
      return res.status(400).send(validationErrors);
    }
    return res.status(500).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    if (error.message?.includes("timed out")) {
      console.log("hello");
      return res.status(400).send({ error: "Network error" });
    }
    if (error.toString().includes("Error: ")) {
      return res.status(400).send({
        error: error.toString().split("Error: ")[1],
      });
    }

    return res.status(500).send({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      { tokens: req.user.tokens.filter((token) => token.token !== req.token) }
    );
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getLoggedInUserInfo = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getLoggedInUserInfo,
  logoutUser,
};
