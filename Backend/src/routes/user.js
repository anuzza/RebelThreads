const router = require("express").Router();
const auth = require("../middleware/auth");
const { login, signup, getUserInfo } = require("../controller/userController");

router.post("login", login);
router.post("signup", signup);
router.get("userData", auth, getUserInfo);

module.exports = router;
