const express = require("express");
const verifyUser = require("../../middleware/verifyToken");
const isAdmin = require("../../middleware/isAdmin.middleware");
const {
  postInstitute,
  adminLogin,
  registerSubAdmin,
} = require("../../controllers/admin.controller");

const adminRoute = express.Router();

adminRoute.post("/login", adminLogin);
adminRoute.post("/registerSub", verifyUser, isAdmin, registerSubAdmin);

// adminRoute.post("/institute", postInstitute);
module.exports = adminRoute;
