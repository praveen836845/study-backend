const mongoose = require("mongoose");


const workerSchema = new mongoose.Schema({
    
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
  roles: {
    type: String,
    enum: [
      "user",
      "worker",
      "teacher",
      "institute",
      "headstate",
      "jobposter",
      "admin",
    ],
    default: "worker",
  },
  totalJobApplied : Number,

  headStateAssociated: {
    type: String,
    required : true
  },

}, 
{timestamps : true}
);

module.exports = mongoose.model("Worker", workerSchema);
