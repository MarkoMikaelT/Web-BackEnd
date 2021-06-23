var mongoose = require("mongoose")
var dbURI = "mongodb://localhost/Chat_database"
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(dbURI)

mongoose.connection.on('connected', ()=> {
    console.log("Mongoose default connection open to " + dbURI)
})

mongoose.connection.on('error', (err)=> {
    console.log("Mongoose default connection error" + err)
})

mongoose.connection.on('disconnect', ()=> {
    console.log("Mongoose default connection disconnected")
})

process.on("SIGINT", ()=> {
    mongoose.connection.close( ()=> {
        console.log("Mongoose default connection disconnected through app")
        process.exit(0)
    })
})
