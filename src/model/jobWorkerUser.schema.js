const {
    model,
    Schema
} = require('mongoose');

const jobWorkerUserSchema = Schema(
    {
        jobId : {
            type : String,
            required : true
        },
        WorkerId :{
            type : String,
            required : true
        },
        userId : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)

module.exports = model(JobWorkerUserModel, jobWorkerUserSchema);