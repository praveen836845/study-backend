const subAdminRouter = require("express").Router();
const {
    addJobPoster
} = require("../../controllers/subAdmin.controller");


subAdminRouter.post("/jobPoster", addJobPoster);




module.exports = subAdminRouter;