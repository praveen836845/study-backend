const mongoose = require("mongoose");
const Course = require("./course.schema");
const Institute = require("./institute.schema");
const User = require("./user.schema");

const teacherSchema = new mongoose.Schema({
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
  isTeacher: {
    type: Boolean,
    default: true,
  },
  courseCreated: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  ],
  instituteAssociated: {
    type: mongoose.Schema.ObjectId,
    ref: "Institute",
  },

  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  //    TODO : add doc here too
});

module.exports = mongoose.model("Teacher", teacherSchema);
