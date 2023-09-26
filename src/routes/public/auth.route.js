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
} = require("../../controllers/file.controller");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/profile", upload, saveProfile);

router.post("/document", upload, saveDocs);

router.get("/profile", getProfile);

router.get("/document", getDocs);

module.exports = router;
