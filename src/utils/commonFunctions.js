const role = require("../model/role.model");
const bcrypt = require("bcryptjs");

function getRolesFormId(id) {
  switch (id) {
    case 0:
      return role.user;
    case 1:
      return role.worker;
    case 2:
      return role.teacher;
    case 3:
      return role.institute;
    case 4:
      return role.headstate;
    case 5:
      return role.jobposter;
    case 6:
      return role.admin;

    default:
      return null;
  }
}

async function encryptPassword(password){
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

module.exports = {
  getRolesFormId,
  encryptPassword
};
