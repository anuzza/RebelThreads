const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  requestClothing,
  getAllRequestedClothes,
  markRequestedClothingAsFound,
  deleteRequestedClothing,
  reportClothingRequest,
} = require("../controller/clothRequestedController");

// Route to get all clothing requests
router.get("/", auth, getAllRequestedClothes);

// Route to request a new clothing item or update an existing request
router.post("/", auth, requestClothing);

// Route to mark a clothing request as found
router.post("/markFound/:id", auth, markRequestedClothingAsFound);

// Route to report a clothing request
router.post("/report/:id", auth, reportClothingRequest);

// Route to delete a clothing request
router.delete("/:id", auth, deleteRequestedClothing);

module.exports = router;
