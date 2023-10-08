const {
    Schema,
    model
} = require("mongoose");

const reviewSchema = Schema({
    reviewWriter : {
        type : String
    },
    rating : {
        type : String
    },
    review : {
        type : String
    },
    peopleFoundHelpful : {
        type : Number,
        default: 0
    },
    reviewerProfile : {
        type : String
    }
},
{
    timestamps: true,
});

module.exports = model("Review", reviewSchema);