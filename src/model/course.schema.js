const mongoose = require("mongoose");
const Teacher = require("./teacher.schema");
const User = require("./user.schema");
const CourseContent = require("./courseContent.schema");

const courseSchema = new mongoose.Schema({
  // _id: Schema.Types.ObjectId,
  courseName: String,

  subtitle : String,

  studentsEnrolled: Number,

  rating: Number,

  totalReviews : Number,

  price: Number,

  totalHours: Number,

  courseType: String, // Easy meadium Hard or advance

  totalLectures: Number,

  aboutCourse: String,

  courseIntroLink : String,

  courseThumbnail: String,

  language : String,

  authors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Teacher",
    },
  ],

  instituteId: String,

  // studentsEnrolled: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "User",
  //   },
  // ],

  courseContent : {
    type : mongoose.Schema.ObjectId,
    ref : "CourseContent"
  }
},
{timestamps :true}
);

module.exports = mongoose.model("Course", courseSchema);
