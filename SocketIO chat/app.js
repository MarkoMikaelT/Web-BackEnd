const app = require("express")()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.json())
 //app.use(express.static('public'))  
const mongoose = require("mongoose")
require("./models/DB_app")
var Chatuser = require('./models/ChatUser_Schema')


app.get("/", (req, res)=> {
    res.sendFile(__dirname + '/index.html')
})

io.on("connection", (socket)=> {
    console.log("Socket yhteys muodostettu")

    socket.on("Viesti", (msg)=> {
        console.log("MESSAGE| " + msg)
        io.emit("server_Viesti", msg)
    })

    socket.on("PrivateViesti", (userID, msg)=> {
        console.log("PRIVATE| " + msg + userID)
        socket.to(userID).emit("server_Viesti", msg)
        socket.emit("server_Viesti", msg)
    })

    socket.on("New User", (User)=> {
        console.log("New log in: " + User)
        socket.user = User
        io.emit("New User", User)
    })

    socket.on("JOIN room", (global, user)=> {
        socket.join(global)
        socket.join(user)
        console.log("joined room: " + global + user)
    })

    socket.on("disconnect", ()=> {
        console.log("user left: " + socket.user)
        io.emit("user disconnect", socket.user)
    })
})

app.post('/', (req, res)=> {
    var NewUser = req.body
    console.log("Meni app-> post", NewUser)
    NewUser["_id"] = new mongoose.Types.ObjectId()
    var UserModel = new Chatuser(NewUser)

    UserModel.save( (err)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send("Message saved succesfully!")
    })
})

app.get('/:User_id', (req, res)=>{
    console.log(req.params)
    Chatuser.find(req.params).exec((err, result)=> {
        if(err) res.status(500).send("Error fetching user data.")
        else res.send(result)
    })
})



http.listen(port, ()=> {
    console.log("Listening port 3000")
})