const mongoose = require("mongoose");
const Teacher = require("./teacher.schema");
const User = require("./user.schema");
const Course = require("./course.schema");

const intituteSchema = new mongoose.Schema({
  subadminId : {
    require : true,
    type : String,
  },
  intituteName: {
    require: true,
    type: String,
  },
  location : {
    type : String,
  },
  coursesOffered :  [{
    type: mongoose.Schema.ObjectId,
    ref: "Course",
  }],
  instituteBrochure: {
    data: Buffer,
    contentType: String,
  },
  instituteDescription: {
    type: String,
  },
  teachersCount: Number,
  studentsAssociated: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],

},
{timestamps :true}
);

module.exports = mongoose.model("Institute", intituteSchema);
