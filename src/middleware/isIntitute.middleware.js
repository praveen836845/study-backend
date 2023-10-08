const Role = require('../model/role.schema');
const role = require('../model/role.model');

const isInstitute =  async (req, res, next) =>{
    const id = req.body.id;
    const personRole = await Role.findOne({
        id : id
    });

    if(!personRole){
        return res.status(403).send(JSON.stringify({
            err : "unauthentic user"
        }));
    }

    if(personRole.role !== role.institute){
        return res.status(403).send(JSON.stringify({
            err : "auth failed"
        }));
    }
    next();

}
module.exports = isInstitute;