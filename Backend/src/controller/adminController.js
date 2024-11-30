const mongoose = require("mongoose");
const ClothingForSale = require("../models/ClothingForSale");
const ClothesRequested = require("../models/ClothesRequested");
const User = require("../models/user");

const addAdmin = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).send({ error: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ error: "Email is already registered" });
  }

  const emailRegex = /^[\w.%+-]+@(go\.)?olemiss\.edu$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({
      error: "Email must be an @olemiss.edu or @go.olemiss.edu address",
    });
  }

  const admin = new User({
    name,
    email,
    password,
    phone,
    isAdmin: true,
  });

  try {
    await admin.save();
    res.status(201).send({ error: "Admin added successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to add admin" });
  }
};

const getAllClothesOnSale = async (req, res) => {
  try {
    const clothes = await ClothingForSale.find({
      active: true,
      deleted: false,
    })
      .sort({ createdAt: -1 })
      .select("-reports");
    res.send(clothes);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getAllReportedClothesOnSale = async (req, res) => {
  try {
    const clothes = await ClothingForSale.find({
      active: true,
      deleted: false,
    })
      .populate({
        path: "seller",
        select: "name avatar ",
      })
      .populate({
        path: "reports.reporter",
        select: "name avatar ",
      });
    const reportedClothes = [];
    clothes.forEach((item) => {
      if (item.reports.length > 0) {
        item.reports.forEach((report) => {
          reportedClothes.push({
            reportId: report._id,
            clothing: item.clothing,
            _id: item._id,
            seller: item.seller,
            reporter: report.reporter,
            date: report.date,
          });
        });
      }
    });
    res.send(reportedClothes.sort((a, b) => b.date - a.date));
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getAllReportedClothesRequested = async (req, res) => {
  try {
    const clothes = await ClothesRequested.find({
      active: true,
      deleted: false,
    })
      .populate({
        path: "user",
        select: "name avatar ",
      })
      .populate({
        path: "reports.reporter",
        select: "name avatar ",
      });
    const reportedClothes = [];
    clothes.forEach((item) => {
      if (item.reports.length > 0) {
        item.reports.forEach((report) => {
          reportedClothes.push({
            reportId: report._id,
            clothing: item.clothing,
            user: item.user,
            _id: item._id,
            reporter: report.reporter,
            date: report.date,
          });
        });
      }
    });
    res.send(reportedClothes.sort((a, b) => b.date - a.date));
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getAllReportedUsers = async (req, res) => {
  try {
    const users = await User.find({
      deleted: false,
    }).populate({
      path: "reports.reporter",
      select: "name avatar ",
    });

    const reportedUsers = [];
    users.forEach((user) => {
      if (user.reports.length > 0) {
        user.reports.forEach((report) => {
          reportedUsers.push({
            reportId: report._id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
            reporter: report.reporter,
            date: report.date,
          });
        });
      }
    });
    res.send(reportedUsers.sort((a, b) => b.date - a.date));
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getAllClothesRequested = async (req, res) => {
  try {
    const clothes = await ClothesRequested.find({
      active: true,
      deleted: false,
    })
      .populate({
        path: "user",
        select: "name avatar email phone",
      })
      .sort({ createdAt: -1 })
      .select("-reports");
    res.send(clothes);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      isAdmin: false,
      deleted: false,
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const deleteClothesRequested = async (req, res) => {
  try {
    const clothing = await ClothesRequested.findById(req.params.id);
    clothing.deleted = true;
    clothing.active = false;
    await clothing.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const deleteClothesOnSale = async (req, res) => {
  try {
    const clothing = await ClothingForSale.findById(req.params.id);
    clothing.deleted = true;
    clothing.active = false;
    await clothing.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const deleteUserReport = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.reports = user.reports.filter(
      (report) => report._id.toString() !== req.params.reportId.toString()
    );
    await user.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const deleteClothesRequestReport = async (req, res) => {
  try {
    const cloth = await ClothesRequested.findById(req.params.id);

    cloth.reports = cloth.reports.filter(
      (report) => report._id.toString() !== req.params.reportId.toString()
    );
    await cloth.save();

    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const deleteClothesSaleReport = async (req, res) => {
  try {
    const cloth = await ClothingForSale.findById(req.params.id);
    cloth.reports = cloth.reports.filter(
      (report) => report._id.toString() !== req.params.reportId.toString()
    );
    await cloth.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findById(req.params.id).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "User not found" });
    }

    // Mark listings as deleted
    await ClothingForSale.updateMany(
      { seller: user._id },
      { $set: { deleted: true, active: false } },
      { session }
    );

    // Mark request as deleted
    await ClothesRequested.updateMany(
      { user: user._id },
      { $set: { deleted: true, active: false } },
      { session }
    );

    // Soft delete the user by setting isDeleted to true
    await User.findByIdAndUpdate(
      req.params.id,
      { $set: { deleted: true } },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.send({ message: "User and all associated posts deleted successfully" });
  } catch (error) {
    // If there is an error, abort the transaction
    await session.abortTransaction();
    session.endSession();

    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  getAllClothesOnSale,
  getAllClothesRequested,
  deleteClothesRequested,
  deleteClothesOnSale,
  getAllReportedClothesOnSale,
  getAllReportedClothesRequested,
  getAllReportedUsers,
  getAllUsers,
  deleteClothesSaleReport,
  deleteClothesRequestReport,
  deleteUserReport,
  deleteUser,
  addAdmin,
};
