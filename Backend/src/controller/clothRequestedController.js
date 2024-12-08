const ClothesRequested = require("../models/ClothesRequested");

// Handle clothing requests (create or update a request)
const requestClothing = async (req, res) => {
  try {
    const { title, brand, size, gender, description } = req.body;
    let clothesRequested;

    if (req.body.id) {
      // Update an existing clothing request
      clothesRequested = await ClothesRequested.findOne({
        _id: req.body.id,
        user: req.user, // Ensure the request belongs to the current user
      });

      if (!clothesRequested) {
        return res.status(404).send({
          error: "Clothing request not found",
        });
      }

      // Update the request's details
      clothesRequested.clothing = {
        title,
        brand,
        size,
        gender,
        description,
      };
    } else {
      // Check for duplicate active requests by the user
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

      // Create a new request if no duplicate is found
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

    await clothesRequested.save(); // Save the request to the database
    res.send(clothesRequested);
  } catch (error) {
    res.status(500).send({
      errMessage: error.message,
    });
  }
};

// Retrieve all active clothing requests excluding the current user's
const getAllRequestedClothes = async (req, res) => {
  try {
    const clothesRequested = await ClothesRequested.find({
      active: true,
      deleted: false,
      user: { $ne: req.user._id }, // Exclude requests made by the logged-in user
    })
      .populate({
        path: "user",
        select: "name avatar email phone", // Fetch limited user details for each request
      })
      .sort({ createdAt: -1 }); // Sort by most recent requests

    res.send(clothesRequested);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Mark a clothing request as found (set active to false)
const markRequestedClothingAsFound = async (req, res) => {
  try {
    const clothesRequested = await ClothesRequested.findOne({
      _id: req.params.id,
      active: true,
      deleted: false,
      user: req.user, // Ensure the request belongs to the current user
    });

    if (!clothesRequested) {
      return res.status(404).send({
        error: "No such clothing request found",
      });
    }

    clothesRequested.active = false; // Mark the request as found
    await clothesRequested.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// Soft delete a clothing request by marking it inactive and deleted
const deleteRequestedClothing = async (req, res) => {
  try {
    const clothesRequested = await ClothesRequested.findOne({
      _id: req.params.id,
      user: req.user, // Ensure the request belongs to the current user
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

// Report a clothing request (adds a report by the current user)
const reportClothingRequest = async (req, res) => {
  try {
    const reporter = req.user; // Current user reporting the request
    const reportedClothing = await ClothesRequested.findById(req.params.id);

    // Check if the user has already reported this request
    if (
      reportedClothing.reports.length > 0 &&
      reportedClothing.reports.filter(
        (report) => report.reporter.toString() === reporter._id.toString()
      ).length > 0
    ) {
      return res.status(404).send({
        error: "You have already reported this clothing request",
      });
    }

    // Add a new report to the request
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
