const {
    model,
    Schema
} = require("mongoose");


const lectureSchema = Schema({
    videoLink : String,
    videoTitle : String,
    videoTime : String,
    isFree : Boolean,
},
{
    timestamps : true
})

module.exports = model("Lecture", lectureSchema);