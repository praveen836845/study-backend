const { Schema, model } = require('mongoose');

const roleSchema = Schema(
    {
        role: {
            type: String,
            default: 'user',
            enum: ["user", "worker", "teacher", "institute", "headState", "jobposter", "admin"]
           },

        id :{
             type: String,
             require : true
        }
    }
)


module.exports = model('Role', roleSchema);