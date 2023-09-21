const role = require("../model/role.model");

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

module.exports = {
  getRolesFormId,
};
