const mongoose = require("mongoose");
const JobPoster = require("./jobPoster.schema");

const jobSchema = new mongoose.Schema({
  jobId: String, // a unique id and created becuz evryone is gonna use it to identify the job
  jobPost: {
    type: String,
    require: true,
  },

  requirementFromCandidate: String,

  totalVacancy: Number,

  // TODO : Docs required
  postApplied: Number,

  jobDecription: String,

  jobPostedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "JobPoster",
    // TODO : require : true
  },
});

module.exports = mongoose.model("Job", jobSchema);
