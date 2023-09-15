const mongoose = require("mongoose");
const Institute = require("./institute.schema");
const Course = require("./course.schema");
const Job = require("./course.schema");

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
  date: {
    type: Date,
    default: Date.now(),
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
});

module.exports = mongoose.model("User", userSchema);
