const ClothingForSale = require("../models/ClothingForSale");
const fileUpload = require("../services/multer"); // Service to handle file uploads
const upload = fileUpload();
const deleteFileFromS3 = require("../services/deleteFile"); // Service to delete files from AWS S3

const multiUpload = upload.array("files", 4); // Middleware to allow uploading up to 4 files

// Upload a new clothing item
const uploadClothingItem = async (req, res) => {
  try {
    multiUpload(req, res, async function (err) {
      if (err) {
        // Handle file upload errors
        if (err.message && err.message === "File too large") {
          err.errMessage = "File size cannot be larger than 5 MB";
        }
        return res.status(403).send(err);
      }

      if (req.files.length > 0) {
        // Destructure required fields from the request body
        const {
          title,
          description,
          brand,
          size,
          price,
          condition,
          category,
          gender,
        } = req.body;

        // Create a new clothing item document
        const clothingItem = new ClothingForSale({
          clothing: {
            title,
            description,
            brand,
            size,
            condition,
            category,
            gender,
          },
          seller: req.user._id, // Associate with the logged-in user
          price: parseFloat(price), // Ensure price is a number
        });

        // Add uploaded image URLs to the clothing item
        for (let i = 0; i < req.files.length; i++) {
          clothingItem.pictures.push(req.files[i].location);
        }

        await clothingItem.save(); // Save the item to the database
        res.status(201).send(clothingItem);
      } else {
        return res.status(404).send({
          errMessage: "No files found!",
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      errMessage: error.message,
    });
  }
};

// Update an existing clothing item
const updateClothingItem = async (req, res) => {
  try {
    multiUpload(req, res, async function (err) {
      if (err) {
        // Handle file upload errors
        if (err.message && err.message === "File too large") {
          err.errMessage = "File size cannot be larger than 2 MB";
        }
        return res.status(403).send(err);
      }

      if (req.files) {
        // Destructure required fields from the request body
        const {
          title,
          description,
          brand,
          size,
          price,
          condition,
          category,
          gender,
          pictures,
          deletedPictures,
        } = req.body;

        // Find the clothing item by ID and seller
        const clothingItem = await ClothingForSale.findOne({
          _id: req.params.id,
          seller: req.user,
        });

        if (!clothingItem) {
          return res.status(404).send({
            error: "Clothing item not found",
          });
        }

        // Update clothing details
        clothingItem.clothing = {
          title,
          description,
          brand,
          size,
          condition,
          category,
          gender,
        };
        clothingItem.price = parseFloat(price);

        // Update existing pictures
        clothingItem.pictures = JSON.parse(pictures);

        // Add new uploaded images
        for (let i = 0; i < req.files.length; i++) {
          clothingItem.pictures.push(req.files[i].location);
        }

        // Remove deleted images from S3
        let deletedImages = JSON.parse(deletedPictures);
        for (let i = 0; i < deletedImages.length; i++) {
          deleteFileFromS3(deletedImages[i]);
        }

        await clothingItem.save(); // Save updates to the database
        res.send(clothingItem);
      } else {
        return res.status(404).send({
          errMessage: "No files found!",
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      errMessage: error.message,
    });
  }
};

// Mark clothing item as sold
const markItemAsSold = async (req, res) => {
  try {
    const clothingItem = await ClothingForSale.findOne({
      _id: req.params.id,
      active: true,
      deleted: false,
      seller: req.user,
    });

    if (!clothingItem) {
      return res.status(404).send({
        error: "No such clothing item found",
      });
    }

    clothingItem.active = false; // Mark the item as sold
    await clothingItem.save();
    res.send({ message: "Item marked as sold successfully." });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Get all clothing items for sale (excluding items posted by the current user)
const getAllItemsForSale = async (req, res) => {
  try {
    const clothingItems = await ClothingForSale.find({
      active: true,
      deleted: false,
      seller: { $ne: req.user._id }, // Exclude items from the current user
    }).sort({ createdAt: -1 }); // Sort by most recent first

    res.send(clothingItems);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Get details of a single clothing item for sale
const getOneItemForSale = async (req, res) => {
  try {
    const clothingItem = await ClothingForSale.findOne({
      _id: req.params.id,
      active: true,
      deleted: false,
    }).populate({
      path: "seller",
      select: "name email phone isAdmin", // Include seller's basic details
    });

    if (!clothingItem) {
      return res.status(404).send({
        error: "No such clothing item found",
      });
    }
    res.send(clothingItem);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Delete a clothing item and its associated images
const deleteClothingItem = async (req, res) => {
  try {
    const clothingItem = await ClothingForSale.findOne({
      _id: req.params.id,
      seller: req.user,
      deleted: false,
    });

    if (!clothingItem) {
      return res.status(404).send({
        error: "No such clothing item found",
      });
    }

    // Delete all images from S3
    for (let i = 0; i < clothingItem.pictures.length; i++) {
      deleteFileFromS3(clothingItem.pictures[i]);
    }

    clothingItem.active = false; // Mark the item as inactive
    clothingItem.deleted = true; // Mark the item as deleted
    await clothingItem.save();
    res.send({ message: "Clothing item deleted successfully." });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Report a clothing item
const reportClothingItem = async (req, res) => {
  try {
    const reporter = req.user; // Current user reporting the item
    const reportedClothing = await ClothingForSale.findById(req.params.id);

    // Check if the user has already reported the item
    if (
      reportedClothing.reports.length > 0 &&
      reportedClothing.reports.filter(
        (report) => report.reporter.toString() === reporter._id.toString()
      )
    ) {
      return res.status(404).send({
        error: "You have already reported this listing",
      });
    }

    // Add the report to the item's reports array
    reportedClothing.reports.unshift({
      reporter,
    });
    await reportedClothing.save();
    res.send({ message: "Report submitted successfully." });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  uploadClothingItem,
  updateClothingItem,
  markItemAsSold,
  getAllItemsForSale,
  getOneItemForSale,
  deleteClothingItem,
  reportClothingItem,
};
