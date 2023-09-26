const Role = require("../model/role.schema");
const role = require("../model/role.model");

const isAdmin = async (req, res, next) => {
  const id = req.body.id;
  const personRole = await Role.findOne({
    id: id,
  });

  if (!personRole) {
    return res.status(403).send(
      JSON.stringify({
        err: "auth failed",
      })
    );
  }

  if (personRole.role !== role.admin) {
    return res.status(403).send(
      JSON.stringify({
        err: "Not Suitable role",
      })
    );
  }
  console.log("verified");
  next();
};
module.exports = isAdmin;
