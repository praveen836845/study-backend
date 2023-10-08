const Worker = require("../model/worker.schema");
const {
  subAdminValidation
} = require("../utils/validation");

const role = require("../model/role.model");
const Role = require("../model/role.schema");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const addWorker = async (req, res) => {

    const { error } = subAdminValidation(res.body);
    if (error) {
        return res.status(400).send(error.details[0].message);}

    const mobileExists = await Worker.findOne({ mobile: req.body.mobile });
    if (mobileExists) {
        return res.status(400).send("mobile already exists");
    }

    const emailExists = await Worker.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send("email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const worker = new Worker(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            mobile: req.body.mobile,
            user: role.worker,
            headStateAssociated : req.body.id 
        }
    )

    try {
        const savedUser = await worker.save();
        const userRole = new Role({
          id: savedUser._id,
          role: role.worker,
        });
        await userRole.save();
        return res.status(200).
        set("content-type" , "application/json").
        send(
          JSON.stringify({
            workerId: savedUser._id,
          })
        );
      } catch (err) {
        res.status(400).send(err);
      }
};

const getWorkers = async (req, res) => { 
  const worker = await Worker.find({headStateAssociated : req.body.id});
  res.status(200).send(worker);
};

const deleteWorker = (req, res) => { 

    try{
     const {id}= req.params;

    Worker.deleteOne({_id : id}).then(() =>{
      console.log("worker deleted");
    }).catch((error) =>{
      console.log("problem in deleting worker" , error);
    })

    Role.deleteOne({ id : id }).then(function(){
        console.log("worker role deleted "); // Success
    }).catch(function(error){
        console.log("problem in deleting worker's role",error); // Failure
    });

    res.status(200).set("content-type", "application/json")
    .send(JSON.stringify({
      mssg : "deletion successFul"
    }))
  }catch(err){
    console.log(err);
    res.status(500)
    .set("content-type", "application/json")
    .send(JSON.stringify({
      status : "error",
      mssg : `${err}`
    }))
  }
};


module.exports = {
    addWorker,
    getWorkers,
    deleteWorker
}