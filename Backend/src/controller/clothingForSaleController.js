const ClothingForSale = require("../models/clothingForSale");
const fileUpload = require("../services/multer");
const upload = fileUpload();
const deleteFileFromS3 = require("../services/deleteFile");

const multiUpload = upload.array("files", 4); // Allow up to 4 images

// Upload a new clothing item
const uploadClothingItem = async (req, res) => {
  try {
    multiUpload(req, res, async function (err) {
      if (err) {
        if (err.message && err.message === "File too large") {
          err.errMessage = "File size cannot be larger than 2 MB";
        }
        return res.status(403).send(err);
      }

      if (req.files.length !== 0) {
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
          seller: req.user._id,
          price: parseFloat(price),
        });

        // Store uploaded image URLs in the database
        for (let i = 0; i < req.files.length; i++) {
          clothingItem.pictures.push(req.files[i].location);
        }

        await clothingItem.save();
        res.status(201).send(clothingItem);
      } else {
        return res.status(404).send({
          errMessage: "No files found!",
        });
      }
    });
  } catch (error) {
    console.log(error);
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
        if (err.message && err.message === "File too large") {
          err.errMessage = "File size cannot be larger than 2 MB";
        }
        return res.status(403).send(err);
      }

      if (req.files) {
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

        const clothingItem = await ClothingForSale.findOne({
          _id: req.params.id,
          seller: req.user,
        });

        if (!clothingItem) {
          return res.status(404).send({
            error: "Clothing item not found",
          });
        }

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

        // Update pictures
        clothingItem.pictures = JSON.parse(pictures);

        // Add new uploaded images
        for (let i = 0; i < req.files.length; i++) {
          clothingItem.pictures.push(req.files[i].location);
        }

        // Handle deleted images
        let deletedImages = JSON.parse(deletedPictures);
        for (let i = 0; i < deletedImages.length; i++) {
          deleteFileFromS3(deletedImages[i]);
        }

        await clothingItem.save();
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

    clothingItem.active = false; // Mark as sold
    await clothingItem.save();
    res.send({ message: "Item marked as sold successfully." });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Get all clothing items for sale
const getAllItemsForSale = async (req, res) => {
  try {
    const clothingItems = await ClothingForSale.find({
      active: true,
      deleted: false,
      seller: { $ne: req.user._id }, // Exclude items sold by the current user
    }).sort({ createdAt: -1 }); // Sort by creation date

    res.send(clothingItems);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Get a single clothing item for sale
const getOneItemForSale = async (req, res) => {
  try {
    const clothingItem = await ClothingForSale.findOne({
      _id: req.params.id,
      active: true,
      deleted: false,
    }).populate({
      path: "seller",
      select: "name email contact_number isAdmin", // Modify according to your User model
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

// Delete a clothing item
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

    // Delete associated images from S3
    for (let i = 0; i < clothingItem.pictures.length; i++) {
      deleteFileFromS3(clothingItem.pictures[i]);
    }

    clothingItem.active = false; // Mark as inactive
    clothingItem.deleted = true; // Mark as deleted
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
    const reporter = req.user;
    const reportedItem = await ClothingForSale.findById(req.params.id);
    if (
      reportedItem.reports.length > 0 &&
      reportedItem.reports.filter(
        (report) => report.reportedBy.toString() === reporter._id.toString()
      )
    ) {
      return res.status(404).send({
        error: "You have already reported this item",
      });
    }
    reportedItem.reports.unshift({
      reason: req.body.reason,
      reportedBy: reporter._id,
    });
    await reportedItem.save();
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
