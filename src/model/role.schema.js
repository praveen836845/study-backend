const { Schema, model } = require('mongoose');

const roleSchema = Schema(
    {
        role: {
            type: String,
            default: 'user',
            enum: ["user", "worker", "teacher", "institute", "headstate", "jobposter", "admin"]
           },

        id :{
             type: String,
             require : true
        }
    },
    {
        timestamps : true
    }
)


module.exports = model('Role', roleSchema);