const router = require("express").Router();
const {
  userRegistration,
  loginUser,
  registerUser,
} = require("../../controllers/auth.controller");
const upload = require("../../middleware/files.middleware");
const {
  saveProfile,
  getProfile,
  saveDocs,
  getDocs,
  getJobs,
} = require("../../controllers/file.controller");

const uploadImage = require("../../middleware/files.middleware");
const uploadDocuments = require("../../middleware/files.middleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/profile", uploadImage, saveProfile);

router.post("/documents", uploadDocuments, saveDocs);

router.get("/profile", getProfile);

router.get("/documents", getDocs);

// router.get("/institutes", getInstitute);

router.get("/jobs" , getJobs)

module.exports = router;
