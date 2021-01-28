const express =require("express")
const app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.json())
const port = 3000

var MongoClient = require("mongodb").MongoClient
var url = "mongodb://localhost:27017/"

app.get('/', (req, res)=> {
    res.send("Please add a path.")
})

//t.2.2a
app.get("/courses", (req, res)=> {
    var params = req.query
    console.log(params)
    var maxY = params["maxYear"]
    var minC = params["minCredits"]
    let query = {}

    if(maxY) {
        query["study_year"] = {$lte: parseInt(maxY)}
    }
    if(minC) {
        query["credits"] = {$gte: parseInt(minC)}
    }

    MongoClient.connect(url, {useUnifiedTopology: true}, (err, db)=> {
        if(err) throw err
        var dbo = db.db("uniCourse")
        dbo.collection("courses").find(query).toArray( (err, result)=> {
            if(err) throw err
            db.close()
            res.status(200).json(result)
        })
    })
})

//t2.2b
app.post("/courses", (req, res)=> {
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, db)=> {
        if(err) throw err
        var dbo = db.db("uniCourse")
        var addCourse = req.body
        console.log(addCourse)
        dbo.collection("courses").insertOne(addCourse, (err, result)=> {
            if(err) throw err
            console.log("Data added!!!")
            db.close()
            res.status(200).send(result)
        })
    })
})


//t2.2c
app.get("/courses/:id", (req, res)=> {
    var params = req.params
    var courseId = parseInt(params.id)
    console.log(courseId)
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, db)=> {
        if(err) throw err
        var dbo = db.db("uniCourse")
        dbo.collection("courses").find({"id": courseId}).toArray( (err, result)=> {
            if(err) throw err
            db.close()
            res.status(200).send(result)
        })
    })
})

//t2.2d
app.delete("/courses/:id", (req, res)=> {
    var courseId = parseInt(req.params.id)
    console.log(courseId)
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, db)=> {
        if(err) throw err
        var dbo = db.db("uniCourse")
        dbo.collection("courses").deleteOne({"id": courseId}, (err, result)=> {
            if(err) throw err
            console.log("Course" + courseId + "deleted")
            db.close()
            res.status(200).send(result)
        })
    })
})

//t2.2e
app.put("/courses/:id", (req, res)=> {
    var courseId = parseInt(req.params.id)
    var newCourse = req.body
    var updateQuery = {$set: newCourse}
    var myQuery = {"id": courseId}
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, db)=> {
        if(err) throw err
        var dbo = db.db("uniCourse")
        dbo.collection("courses").updateOne(myQuery, updateQuery, (err, result)=> {
            if(err) throw err
            console.log("Course" + courseId + "updated!")
            db.close()
            res.status(200).send(result)
        })
    })
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})