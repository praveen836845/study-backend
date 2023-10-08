const Role = require('../model/role.schema');
const role = require('../model/role.model');

const isJobPoster =  async (req, res, next) =>{
    const id = req.body.id;
    const personRole = await Role.findOne({
        id : id
    });

    if(!personRole){
        return res.status(403).send(Json.stringify({
            err : "you are unauthorized to acces this route"
        }));
    }

    if(personRole.role !== role.jobposter){
        return res.status(403).send(JSON.stringify({
            err : "auth failed"
        }));
    }
    next();

}
module.exports = isJobPoster;