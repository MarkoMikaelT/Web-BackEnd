var mongoose = require('mongoose')

var studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student_number: {type: Number, required: true, 
                    min: [0, "more"], max: [1000, "less"]},
    first_name: {type: String, required: true, 
                    maxLength: [50, "too long"]},
    last_name: {type: String, required: true, 
                    maxLength: [50, "too long"]},
    email: {type: String, required: true, 
                    maxLength: [50, "too long"]},
    gender: {type: String, required: true, 
                    enum: {
                        values: ["Male", "Female"],
                        message: "Gender is Male or Female"}
            },
    atCourse: {type: Array, 
                items: { type: String,
                    enum: {
                        values: ["Programming 1", "Programming 2", "Game Programming",
                                "Physics", "Electronics", "Maths", "English", "Swedish",
                                "Chemistry", "Leadership"
                                ],
                        uniqueItems: true
                    }
                }
            }
})

// 'Student' viittaa tietokantaan students HUOM! s|tudent|s pieni alkukirjain ja monikko s
var myStudent = mongoose.model('Student', studentSchema)
module.exports = myStudent 