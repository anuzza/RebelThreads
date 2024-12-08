const User = require("../models/user");
const fileUpload = require("../services/multer");
const upload = fileUpload();
const deleteFileFromS3 = require("../services/deleteFile");

// Sign up a new user and handle validation or duplicate account scenarios
const signupUser = async (req, res) => {
  try {
    // Check if the email belongs to a deleted account
    const existingDeletedUser = await User.findOne({
      email: req.body.email,
      deleted: true,
    });
    if (existingDeletedUser) {
      return res.status(400).send({
        error:
          "This email belongs to a deleted account. Please contact administrator if you need assistance.",
      });
    }

    // Create a new user and generate an authentication token
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    // Handle validation or duplicate email errors
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

// Log in an existing user and generate an authentication token
const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    // Prevent login for deleted accounts
    if (user.deleted) {
      return res
        .status(403)
        .send({ error: "This account has been deleted by administrator" });
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    if (error.message?.includes("timed out")) {
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

// Log out the current user by removing the current token
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

// Fetch logged-in user's information
const getLoggedInUserInfo = async (req, res) => {
  try {
    const user = req.user; // The user is attached to the request by middleware
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Fetch a specific user's information along with their active posts
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "clothesRequested",
        match: { deleted: false },
        select: "-reports",
      })
      .populate({
        path: "clothForSale",
        match: { deleted: false },
        select: "-reports",
      });

    // Separate selling and sold items for profile display
    const sellingClothes = user.clothForSale.filter(
      ({ active }) => active === true
    );
    const profile = {
      id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      selling: sellingClothes.length,
      sold: user.clothForSale.length - sellingClothes.length,
      requested: user.clothesRequested.length,
      clothForSale: sellingClothes.slice(0, 3),
    };
    res.send(profile);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update user information with validation for allowed fields
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  let validationErrors = {};
  const allowedUpdates = ["name", "email", "phone"];
  const isValidOperators = updates.every((item) => {
    return allowedUpdates.includes(item);
  });
  if (!isValidOperators) {
    validationErrors.error = "Invalid operations!";
    return res.status(400).send(validationErrors);
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    // Handle validation errors for specific fields
    if (error.errors || error.code === 11000) {
      if (error.errors) {
        if (error.errors.name) {
          validationErrors.nameError = "Name is required";
        }
        if (error.errors.email) {
          validationErrors.emailError = "Email is required";
        }
        if (error.errors.phone) {
          validationErrors.phoneError = "Phone is required";
        }
      } else {
        validationErrors.error = "User already exists";
      }
      return res.status(400).send(validationErrors);
    }
    return res.status(500).send({ error: error.message });
  }
};

// Add a new bookmark for a clothing item
const bookmarkACloth = async (req, res) => {
  try {
    req.user.bookmarks.unshift(req.params.id); // Add the item ID to the bookmarks list
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Remove a bookmark
const deleteBookmark = async (req, res) => {
  try {
    req.user.bookmarks = req.user.bookmarks.filter(
      (bookmark) => bookmark.toString() !== req.params.id.toString()
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Fetch all bookmarked items for the user
const getUserBookmarks = async (req, res) => {
  try {
    const { bookmarks } = await User.findById(req.user._id).populate({
      path: "bookmarks",
      match: { deleted: false },
    });
    res.send(bookmarks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Fetch all requested clothes for the user
const getUserRequestedClothes = async (req, res) => {
  try {
    const { clothesRequested } = await User.findById(req.user._id).populate({
      path: "clothesRequested",
      match: { deleted: false },
      select: "-reports",
    });
    res.send(clothesRequested);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Fetch all clothing items for sale by the user
const getUserClothSold = async (req, res) => {
  try {
    const { clothForSale } = await User.findById(req.user._id).populate({
      path: "clothForSale",
      match: { deleted: false },
      select: "-reports",
    });
    res.send(clothForSale);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Change user's avatar image
const singleUpload = upload.single("avatar");
const changeAvatar = async (req, res) => {
  try {
    singleUpload(req, res, async function (err) {
      if (err) {
        if (err.message && err.message === "File too large") {
          err.errMessage = "File size cannot be larger than 3 MB";
        }
        return res.status(403).send(err);
      }
      if (req.file) {
        let update = { avatar: req.file.location };
        let prevAvatar = req.user.avatar;

        // Update avatar and delete previous one from S3 if it exists
        await User.findByIdAndUpdate(req.user._id, update);
        if (prevAvatar && prevAvatar !== "") {
          deleteFileFromS3(prevAvatar);
        }
        res.sendStatus(200);
      } else {
        return res.status(404).send({
          errMessage: "No file found!",
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      errMessage: error.message,
    });
  }
};

// Delete user's avatar
const deleteAvatar = async (req, res) => {
  try {
    const prevAvatar = req.user.avatar;
    if (prevAvatar && prevAvatar !== "") {
      deleteFileFromS3(prevAvatar); // Delete avatar from S3
    }

    req.user.avatar = ""; // Reset avatar field
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(400).send(err);
  }
};

// Report another user
const reportAUser = async (req, res) => {
  try {
    const reporter = req.user;
    const reportedUser = await User.findById(req.params.id);

    // Prevent duplicate reporting of the same user
    if (
      reportedUser.reports.length > 0 &&
      reportedUser.reports.filter(
        (report) => report.reporter.toString() === reporter._id.toString()
      )
    ) {
      return res.status(404).send({
        error: "You have already reported this user",
      });
    }
    reportedUser.reports.unshift({
      reporter,
    });
    await reportedUser.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getLoggedInUserInfo,
  logoutUser,
  getUserInfo,
  updateUser,
  bookmarkACloth,
  deleteBookmark,
  getUserBookmarks,
  getUserRequestedClothes,
  getUserClothSold,
  changeAvatar,
  deleteAvatar,
  reportAUser,
};
