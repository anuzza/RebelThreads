const ClothesRequested = require("../models/ClothesRequested");

// Request a clothing item
const requestClothing = async (req, res) => {
  try {
    const { title, brand, size, gender, description } = req.body;
    let clothesRequested;

    if (req.body.id) {
      // Update existing clothing request
      clothesRequested = await ClothesRequested.findOne({
        _id: req.body.id,
        user: req.user,
      });

      if (!clothesRequested) {
        return res.status(404).send({
          error: "Clothing request not found",
        });
      }

      clothesRequested.clothing = {
        title,
        brand,
        size,
        gender,
        description,
      };
    } else {
      // Check if the request already exists
      clothesRequested = await ClothesRequested.findOne({
        "clothing.title": title,
        active: true,
        user: req.user,
      });

      if (clothesRequested) {
        return res.status(403).send({
          errMessage: "You have already requested this clothing item!",
        });
      }

      // Create a new clothing request
      clothesRequested = new ClothesRequested({
        clothing: {
          title,
          brand,
          size,
          gender,
          description,
        },
        user: req.user,
      });
    }

    await clothesRequested.save();
    res.send(clothesRequested);
  } catch (error) {
    res.status(500).send({
      errMessage: error.message,
    });
  }
};

// Get all clothing requests
const getAllRequestedClothes = async (req, res) => {
  try {
    const clothesRequested = await ClothesRequested.find({
      active: true,
      deleted: false,
      user: { $ne: req.user._id }, // Exclude requests made by the current user
    })
      .populate({
        path: "user",
        select: "name avatar email phone", // Modify according to your User model
      })
      .sort({ createdAt: -1 });

    res.send(clothesRequested);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Mark clothing request as found
const markRequestedClothingAsFound = async (req, res) => {
  try {
    const clothesRequested = await ClothesRequested.findOne({
      _id: req.params.id,
      active: true,
      deleted: false,
      user: req.user,
    });

    if (!clothesRequested) {
      return res.status(404).send({
        error: "No such clothing request found",
      });
    }

    clothesRequested.active = false; // Mark as found
    await clothesRequested.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Delete a clothing request
const deleteRequestedClothing = async (req, res) => {
  try {
    const clothesRequested = await ClothesRequested.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!clothesRequested) {
      return res.status(404).send({
        error: "No such clothing request found",
      });
    }

    clothesRequested.active = false; // Mark as inactive
    clothesRequested.deleted = true; // Mark as deleted
    await clothesRequested.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Report a clothing request
const reportClothingRequest = async (req, res) => {
  try {
    const reporter = req.user;
    const reportedClothing = await ClothesRequested.findById(req.params.id);

    if (
      reportedClothing.reports.length > 0 &&
      reportedClothing.reports.filter(
        (report) => report.reporter.toString() === reporter._id.toString()
      )
    ) {
      return res.status(404).send({
        error: "You have already reported this clothing request",
      });
    }

    reportedClothing.reports.unshift({
      reporter,
    });
    await reportedClothing.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  requestClothing,
  getAllRequestedClothes,
  markRequestedClothingAsFound,
  deleteRequestedClothing,
  reportClothingRequest,
};
