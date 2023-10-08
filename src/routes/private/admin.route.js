const express = require("express");
const verifyUser = require("../../middleware/verifyToken");
const isAdmin = require("../../middleware/isAdmin.middleware");
const {
  postInstitute,
  adminLogin,
  registerSubAdmin,
  deleteSubAdmin,
  getSubadmins,
} = require("../../controllers/admin.controller");

const adminRoute = express.Router();

adminRoute.post("/login", adminLogin);
adminRoute.post("/registerSub", verifyUser, isAdmin, registerSubAdmin);

adminRoute.delete("/subadmin/:id", verifyUser, isAdmin, deleteSubAdmin )

adminRoute.get("/subadmin", verifyUser, isAdmin, getSubadmins )


// adminRoute.post("/institute", postInstitute);
module.exports = adminRoute;
