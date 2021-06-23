const mongoose = require('mongoose')

var ChatUserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    User_id: {type: String},
    User_msg: {type: String},
    Time_msg: {type: String}
})

var myChatUser = mongoose.model('Chatuser', ChatUserSchema)
module.exports = myChatUser