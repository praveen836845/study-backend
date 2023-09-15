const router = require("express").Router();
const verify = require("../../utils/verifyToken");

router.get("/", verify, (req, res) => {
  res.send({
    posts: {
      title: "this is first post",
      description: "random data you should access",
    },
  });
});

module.exports = router;
