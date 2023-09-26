const Institute = require("../model/institute.schema");
const { loginValidation } = require("../utils/validation");
const Admin = require("../model/admin.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Subadmin = require("../model/subAdmin.schema");
const { getRolesFormId } = require("../utils/commonFunctions");

const adminLogin = async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return res.status(400).send("email doesn't exists");
  }

  const validPass = bcrypt.compare(req.body.password, admin.password);
  if (!validPass) {
    return res.status(400).send("email or password is wrong");
  }

  const token = jwt.sign(
    { _id: admin._id, role: admin.roles[0] },
    process.env.TOKEN_SECRET
  );
  res.setHeader("content-Type", "application/json");
  res.end(
    JSON.stringify({
      token: token,
    })
  );
};

const registerSubAdmin = async (req, res) => {
  // const { error } = subAdminValidation(req.body);

  // if (error) {
  //   console.log("validation error");
  //   return res.status(400).send(error.details[0].message);
  // }
  const mobileExists = await Subadmin.findOne({ mobile: req.body.mobile });
  if (mobileExists) {
    return res.status(400).send("mobile already exists");
  }
  const emailExists = await Subadmin.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("email already exists");
  }

  const getRole = getRolesFormId(req.body.role);
  if (getRole === null) {
    console.log(getRole);
    return res.status(400).send("role doesn't exists");
  }
  console.log(getRole);

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const subAdmin = new Subadmin({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    mobile: req.body.mobile,
    roles: getRole,
  });

  console.log(subAdmin);

  try {
    const savedUser = await subAdmin.save();
    const userRole = new Role({
      id: subAdmin._id,
      role: getRole,
    });
    await userRole.save();
    return res.status(200).send(user._id);
  } catch (err) {
    res.status(400).send(err);
  }
};

const postInstitute = async (req, res) => {
  var institute = new Institute({
    intituteName: req.body.intituteName,
    instituteDescription: req.body.instituteDescription,
    teachersCount: req.body.teachersCount,
    studentCount: req.body.studentCount,
  });

  try {
    const instituteSaved = await institute.save();
    return res.status(201).send(instituteSaved);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = {
  postInstitute,
  adminLogin,
  registerSubAdmin,
};
