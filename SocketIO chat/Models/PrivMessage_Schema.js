const mongoose = require('mongoose')

var PrivateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    User_id: {type: String},
    User_msg: {type: String},
    Time_msg: {type: String}
})

var myPrivateSchema = mongoose.model('Private_message', PrivateSchema)
module.exports = myPrivateSchema