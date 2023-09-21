const subAdminRouter = require("express").Router();
const verifyToken = require("../../middleware/verifyToken");
const isHeadState = require("../../middleware/isHeadState.middleware");

const {
    addJobPoster
} = require("../../controllers/subAdmin.controller");


subAdminRouter.post("/jobPoster", verifyToken, isHeadState, addJobPoster);




module.exports = subAdminRouter;