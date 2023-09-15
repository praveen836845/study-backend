const JobPoster = require("../model/jobPoster.schema");

const addJobPoster = async (req, res) =>{
    const jobPoster = new JobPoster({
        name : req.body.name,
        password : req.body.password,
        email : req.body.email,
        mobile : req.body.mobile,

    });

    try{
        const postersaved = await jobPoster.save();
        return res.status(200).send(postersaved);
    }catch(err){
        return res.status(400).send(err);
    }
}

module.exports = {
    addJobPoster,
}