const router = require("express").Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const {
  getAllClothesOnSale,
  getAllUsers,
  getAllClothesRequested,
  deleteClothesOnSale,
  deleteClothesRequested,
  getAllReportedClothesOnSale,
  getAllReportedClothesRequested,
  getAllReportedUsers,
  deleteClothesRequestReport,
  deleteClothesSaleReport,
  deleteUserReport,
  deleteUser,
  addAdmin,
} = require("../controller/adminController");

router.post("/add", auth, admin, addAdmin);
router.get("/users/reports", auth, admin, getAllReportedUsers);
router.get("/users", auth, admin, getAllUsers);
router.get("/sales/reports", auth, admin, getAllReportedClothesOnSale);
router.get("/sales", auth, admin, getAllClothesOnSale);
router.get("/requests/reports", auth, admin, getAllReportedClothesRequested);
router.get("/requests", auth, admin, getAllClothesRequested);

router.delete("/users/reports/:id/:reportId", auth, admin, deleteUserReport);
router.delete(
  "/sales/reports/:id/:reportId",
  auth,
  admin,
  deleteClothesSaleReport
);
router.delete("/sales/:id", auth, admin, deleteClothesOnSale);
router.delete(
  "/requests/reports/:id/:reportId",
  auth,
  admin,
  deleteClothesRequestReport
);
router.delete("/requests/:id", auth, admin, deleteClothesRequested);
router.delete("/users/:id", auth, admin, deleteUser);

module.exports = router;
