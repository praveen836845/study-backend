const {
    model,
    Schema,
    default: mongoose
} = require("mongoose");

const Course = require("./course.schema");
const Package = require("./package.schema");
const Review = require("./review.schema");

// this model is for more details of the course
const courseContentSchema = Schema({
    courseId : {
        type : Schema.ObjectId,
        ref : "Course",
        require : true
    },
    courseName : {
        type : String
    },
    isFree : Boolean,
    aboutCourse : {
        type : String
    },
    description : {
        type : String
    },
    authorName : {
        type : String
    },
    authorDescription : {
        type : String
    },
    package :[
        {
            type: Schema.ObjectId,
            ref : "Package",
            require : true
        }
    ],
    reviews : [
        {
            type : Schema.ObjectId,
            ref : "Review",
            require : true
        }
    ]
    
},
    {timestamps :true}
);

module.exports = model("CourseContent", courseContentSchema);