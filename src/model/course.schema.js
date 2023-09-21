const mongoose = require("mongoose");
const Teacher = require("./teacher.schema");
const User = require("./user.schema");

const courseSchema = new mongoose.Schema({
  // _id: Schema.Types.ObjectId,
  courseName: String,

  studentsEnrolled: Number,

  rating: Number,

  price: Number,

  totalHours: Number,

  courseType: String, // Easy meadium Hard or advance

  totalLectures: Number,

  aboutCourse: String,

  course_thumbnail: {
    data: Buffer,
    contentType: String,
  },

  authors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Teacher",
    },
  ],

  institute: String,

  studentsEnrolled: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
},
{timestamps :true}
);

module.exports = mongoose.model("Course", courseSchema);
