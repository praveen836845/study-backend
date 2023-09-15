const Institute = require("../model/institute.schema");

const getInstitute = async (req, res) => {
  const institutes = Institute.find({});

  res.send(200).send("working..");
};

module.exports = {
  getInstitute,
};
