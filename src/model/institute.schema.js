const mongoose = require("mongoose");
const Teacher = require("./teacher.schema");
const User = require("./user.schema");
const Course = require("./course.schema");

const intituteSchema = new mongoose.Schema({
  intituteName: {
    require: true,
    type: String,
  },
  instituteBrochure: {
    data: Buffer,
    contentType: String,
  },
  instituteDescription: {
    type: String,
  },
  teachersCount: Number,
  studentCount: Number,
  teachersAssociated: [{
    type: mongoose.Schema.ObjectId,
    ref: "Teacher",
  }],
  studentsAssociated: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  coursesAssociated: [{
    type: mongoose.Schema.ObjectId,
    ref: "Course",
  }],
});

module.exports = mongoose.model("Institute", intituteSchema);
