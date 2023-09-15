const router = require("express").Router();
const {
    getInstitute
} = require("../../controllers/base.controller")


router.get("/institutes", getInstitute);


module.exports = router;