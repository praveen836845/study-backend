const mongoose = require("mongoose");
const Job = require("./job.schema");

const jobPosterSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  email: String,
  mobile: Number,

  jobPosted: [{
    type: mongoose.Schema.ObjectId,
    ref: "Job",
  }],
});

module.exports = mongoose.model("JobPoster", jobPosterSchema);
