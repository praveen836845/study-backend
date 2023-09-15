const express = require ("express");

const { postInstitute } = require("../../controllers/admin.controller");

const adminRoute = express.Router();



adminRoute.post("/institute", postInstitute);


module.exports =  adminRoute;
