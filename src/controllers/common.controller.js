const Institute = require("../model/institute.schema");

const getInstitute = async (req, res) => {
    try{
        const institutes = await Institute.find({});
        res.status(200).send(institutes);
    }catch(err){
        res.status(400).send(err);
    }
}




module.exports = {
    getInstitute,
    
}