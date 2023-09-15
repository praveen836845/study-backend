const jobPosterRoute = require("express").Router();
const {
    postJob
} = require("../../controllers/jobPoster.controller");

jobPosterRoute.post("/job", postJob);




module.exports = jobPosterRoute;