const mongoose = require("mongoose");
const JobPoster = require("./jobPoster.schema");

const jobSchema = new mongoose.Schema({
  jobId: String, // a unique id and created becuz evryone is gonna use it to identify the job
  // _id: {
  //   type: Number,
  //   // require: true,
  // },
  jobPost: {
    type: String,
    require: true,
  },

  eligibilityCriteria: String,
  totalVacancy: Number,
  maleVacancy : Number,
  femaleVacancy : Number,
  // TODO : Docs required
  postApplied: Number,
  jobDecription: String,
  examOrganization : String,
  applicationDate : String,
  expectedExamDate : String,
  salary : String,
  selectionProcess : String,
  examFee : String,

  jobPostedBy: {
    type: String,
    require: true,
  },

  requiredDocuments: {
    type: String,
  },
},
{timestamps :true});

module.exports = mongoose.model("Job", jobSchema);
