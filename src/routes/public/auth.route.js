const router = require("express").Router();
const {
  userRegistration,
  loginUser,
  registerUser,
} = require("../../controllers/auth.controller");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
