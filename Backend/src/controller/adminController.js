const ClothingForSale = require("../models/clothingForSale");
const ClothesRequested = require("../models/ClothesRequested");
const User = require("../models/user");

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
        path: "reports.reportedBy",
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
            reporter: report.reportedBy,
            date: report.createdAt,
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
        path: "reports.reportedBy",
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
            reporter: report.reportedBy,
            date: report.createdAt,
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
    const users = await User.find().populate({
      path: "reports.reportedBy",
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
            reporter: report.reportedBy,
            date: report.createdAt,
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
    const users = await User.find({ isAdmin: false });
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
    const clothing = await ClothesRequested.findById(req.params.id);
    clothing.reports = clothing.reports.filter(
      (report) => report._id.toString() !== req.params.reportId.toString()
    );
    await clothing.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const deleteClothesSaleReport = async (req, res) => {
  try {
    const clothing = await ClothingForSale.findById(req.params.id);
    clothing.reports = clothing.reports.filter(
      (report) => report._id.toString() !== req.params.reportId.toString()
    );
    await clothing.save();
    res.send();
  } catch (error) {
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
};
