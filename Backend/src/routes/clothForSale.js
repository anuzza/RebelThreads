const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  markItemAsSold,
  deleteClothingItem,
  getOneItemForSale,
  getAllItemsForSale,
  updateClothingItem,
  uploadClothingItem,
  reportClothingItem,
} = require("../controller/clothingForSaleController"); // Adjust the controller file name accordingly

// Route to get a single clothing item by ID
router.get("/:id", auth, getOneItemForSale);

// Route to get all clothing items for sale
router.get("/", auth, getAllItemsForSale);

// Route to upload a new clothing item
router.post("/", auth, uploadClothingItem);

// Route to mark a clothing item as sold
router.post("/markSold/:id", auth, markItemAsSold);

// Route to report a clothing item
router.post("/report/:id", auth, reportClothingItem);

// Route to update an existing clothing item
router.patch("/:id", auth, updateClothingItem);

// Route to delete a clothing item
router.delete("/:id", auth, deleteClothingItem);

module.exports = router;
