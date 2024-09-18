const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  signupUser,
  loginUser,
  getLoggedInUserInfo,
  logoutUser,
} = require("../controller/userController");

router.post("/login", loginUser);
router.post("/", signupUser);
router.get("/me", auth, getLoggedInUserInfo);
router.post("/logout", auth, logoutUser);

module.exports = router;
