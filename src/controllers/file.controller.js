const User = require("../model/user.schema");
const path = require("path");
const Institute = require("../model/institute.schema");
const Job = require("../model/job.schema");

const saveProfile = async function (req, res) {
  const user = User.findOne({
    _id: req.body.userId,
  });

  if (!user) {
    return res.send(404).send("user not found");
  }

  const x = await user.updateOne({
    image: req.files.image[0].filename,
  });

  return res.status(200).send(
    JSON.stringify({
      status: "success",
    })
  );
};

const saveDocs = async function (req, res) {
  const user = User.findOne({
    _id: req.body.userId,
  });

  if (!user) {
    return res.send(404).send("user not found");
  }

  const x = await user.updateOne({
    document: req.files.document[0].filename,
  });

  return res.status(200).send(
    JSON.stringify({
      status: "success",
    })
  );
};

const getProfile = async function (req, res) {
  const user = await User.findOne({
    _id: req.body.userId,
  });

  if (!user) {
    return res.status(400).send(
      JSON.stringify({
        status: "failure",
        message: "Invalid UseriD",
      })
    );
  }

  const options = {
    root: path.join(__dirname, "..", "..", "public", "image"),
  };

  return res.status(200).sendFile(user.image, options);
};

const getDocs = async function (req, res) {
  const user = await User.findOne({
    _id: req.body.userId,
  });

  if (!user) {
    return res.status(400).send(
      JSON.stringify({
        status: "failure",
        message: "Invalid UseriD",
      })
    );
  }

  const options = {
    root: path.join(__dirname, "..", "..", "public", "document"),
  };

  return res.status(200).sendFile(user.document, options);
};


const getJobs = async function (req, res) {
  try{
    const job = await Job.find({});
    return res.status(200).send(job);
  }catch(err){
    console.log(err);
    return res.status(400).send(Json.stringify({
      status : "some error occured",
      mssg : `err`
    }));
  }
}

const getInstitute = async (req, res) => {
  try{
      const institutes = await Institute.find({});
      res.status(200).send(institutes);
  }catch(err){
      res.status(400).send(err);
  }
}

module.exports = {
  saveProfile,
  getProfile,
  saveDocs,
  getDocs,
  getJobs,
  getInstitute
};
