const Job = require("../model/job.schema");

const postJob = async (req, res) => {
  const jobCreated = new Job({
    jobId: req.body.jobId,
    jobPost: req.body.jobPost,
    jobDecription: req.body.jobDecription,
    eligibilityCriteria: req.body.requirementFromCandidate,
    totalVacancy: req.body.totalVacancy,
    maleVacancy: req.body.maleVacancy,
    femaleVacancy: req.body.femaleVacancy,
    requiredDocuments: req.body.jobPostedBy,
    examOrganization : req.body.examOrganization,
    applicationDate : req.body.applicationDate,
    expectedExamDate : req.body.expectedExamDate,
    salary : req.body.salary,
    selectionProcess : req.body.selectionProcess, 
    examFee : req.body.examFee,
    jobPostedBy: req.body.id,
    // postApplied : req.body.postApplied,
  });

  try {
    const savedJob = await jobCreated.save();
    return res.status(201)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify({
      "jobId" : savedJob._id,
      "mssg" : "Job Posted successfully"
    }));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = {
  postJob,
};
