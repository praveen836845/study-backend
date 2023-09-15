const {
    getInstitute
} = require("../../controllers/common.controller");

const commonRouter = require("express").Router();


commonRouter.get("/institutes", getInstitute);




module.exports = commonRouter;