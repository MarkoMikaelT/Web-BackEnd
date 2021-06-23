var mongoose = require('mongoose')

var courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {type: Number, required: true, 
                    min: [0, "more"], max: [1000, "less"]},
    course_name: {type: String, required: true, 
                    maxLength: [100, "too long"]},
    credits: {type: Number, required: true, 
                    min: [0, "more"], max: [100, "less"]},
    study_year: {type: Number, required: true, 
                    min: [0, "more"], max: [10, "less"]},
    teacher: {type: String, required: true, 
                    maxLength: [100, "too long"]}
})

var myCourse = mongoose.model('Course', courseSchema)
module.exports = myCourse 