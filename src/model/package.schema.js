const {
    model,
    Schema
} = require("mongoose");
const Lecture = require("./lecture.schema");

const packageSchema = Schema({
    packageName : String,
    totalVideosInPackage : Number,
    totalDocuments : Number,
    totalTime : String,
    lectures : [
        {
            type: Schema.ObjectId,
            ref : "Lecture"
        }
    ]
},
{
    timestamps : true
});

module.exports = model("Package", packageSchema);