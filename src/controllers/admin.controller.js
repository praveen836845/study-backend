const Institute = require("../model/institute.schema");


const postInstitute = async (req, res) => {
    var institute = new Institute({
        intituteName : req.body.intituteName,
        instituteDescription : req.body.instituteDescription,
        teachersCount : req.body.teachersCount,
        studentCount : req.body.studentCount
    });

    try{
        const instituteSaved = await institute.save();
        return res.status(201).send(instituteSaved);
    }catch(err){
        return res.status(400).send(err);
    }

}


 module.exports = {
    postInstitute,
 }