const router = require("express").Router();
const auth = require("../middleware/auth");
const {
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
} = require("../controller/userController");

router.get("/me/bookmarks", auth, getUserBookmarks);
router.get("/me/sale", auth, getUserClothSold);
router.get("/me/requests", auth, getUserRequestedClothes);
router.get("/me", auth, getLoggedInUserInfo);
router.get("/:id", auth, getUserInfo);
router.post("/bookmark/:id", auth, bookmarkACloth);
router.post("/report/:id", auth, reportAUser);
router.post("/login", loginUser);
router.post("/", signupUser);
router.post("/me/avatar", auth, changeAvatar);
router.post("/logout", auth, logoutUser);
router.patch("/me", auth, updateUser);
router.delete("/me/avatar", auth, deleteAvatar);
router.delete("/bookmark/:id", auth, deleteBookmark);

module.exports = router;
