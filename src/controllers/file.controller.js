const User = require("../model/user.schema");
const path = require("path");

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

  // return res.status(200).send(
  //   JSON.stringify({
  //     status: "success",
  //     location: "http://localhost:3000/image/" + user.image,
  //   })
  // );

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

  // return res.status(200).send(
  //   JSON.stringify({
  //     status: "success",
  //     location: "http://localhost:3000/image/" + user.image,
  //   })
  // );

  const options = {
    root: path.join(__dirname, "..", "..", "public", "document"),
  };

  return res.status(200).sendFile(user.document, options);
};

module.exports = {
  saveProfile,
  getProfile,
  saveDocs,
  getDocs,
};
