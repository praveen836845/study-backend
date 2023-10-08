const Subadmin = require("../model/subAdmin.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const subadminLogin = async (req, res) => {
  const subadmin = await Subadmin.findOne({ email: req.body.email });
  if (!subadmin) {
    return res.status(400).send("email doesn't exists");
  }

  const validPass = bcrypt.compare(req.body.password, subadmin.password);
  if (!validPass) {
    return res.status(400).send("email or password is wrong");
  }

  const token = jwt.sign(
    { _id: subadmin._id, role: subadmin.role },
    process.env.TOKEN_SECRET
  );

  res.setHeader("content-Type", "application/json");
  res.end(
    JSON.stringify({
      token: token,
      userId: subadmin._id,
      role: subadmin.role
    })
  );

}



module.exports = {
    subadminLogin
}