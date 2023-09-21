const express = require("express");

const {
  postInstitute,
  adminLogin,
  registerSubAdmin,
} = require("../../controllers/admin.controller");

const adminRoute = express.Router();

adminRoute.post("/login", adminLogin);
adminRoute.post("/registerSub", registerSubAdmin);

// adminRoute.post("/institute", postInstitute);
module.exports = adminRoute;
