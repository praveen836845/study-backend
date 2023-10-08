const videoRoute = require("express").Router();
const {uploadVideo } = require("../../middleware/video.middleware");
const {videoDetail} = require("../../controllers/video.Controller");
const isInstitute = require("../../middleware/isIntitute.middleware");
const verifyUser = require("../../middleware/verifyToken");

videoRoute.post("/upload",verifyUser, isInstitute,  uploadVideo, videoDetail);

// videoRoute.get("/get", getVideo);




module.exports = videoRoute;

