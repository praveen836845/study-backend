const Job = require("../model/job.schema");


const postJob = async (req, res) =>{

    const jobCreated = new Job({
        jobId : req.body.jobId,
        jobPost : req.body.jobPost,
        jobDecription : req.body.jobDecription,
        requirementFromCandidate : req.body.requirementFromCandidate,
        totalVacancy : req.body.totalVacancy,
        postApplied : req.body.postApplied,
    });

    try{
        const savedJob = await jobCreated.save();
        res.status(201).send(savedJob);
    }catch(err){
        res.send(400).send(err);
    }

    

}



module.exports = {
    postJob,
}