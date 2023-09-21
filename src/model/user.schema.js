const mongoose = require("mongoose");
const Institute = require("./institute.schema");
const Course = require("./course.schema");
const Job = require("./course.schema");
const role = require("./role.model");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  role: {
    type: String,
    default: role.user,
  },
  courseTaken: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  ],
  jobApplied: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Job",
    },
  ],
  instituteAssociated: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Institute",
    },
  ],
},
{timestamps :true},
);

module.exports = mongoose.model("User", userSchema);
