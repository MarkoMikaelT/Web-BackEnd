
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('public'))  
const mongoose = require("mongoose")
require("./models/mydb")
var Student = require('./models/studentSchema')
var Course = require('./models/courseSchema')
const path = require('path');

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname+'/indexStudent.html'));
})

//________________STUDENTS______________

app.get('/students', (req, res)=> {
    Student.find(req.query).exec( (err, result)=> {
        if(err) res.status(500).send("Error in finding students")
        else res.send(result)
    })
})

app.post('/students', (req, res)=> {
    var newStudent = req.body
    console.log(newStudent)
    newStudent["_id"] = new mongoose.Types.ObjectId()
    var studentModel = new Student(newStudent)

    studentModel.save( (err)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send("Student saved succesfully!")
    })
})

app.get('/students/:sNum', (req,res)=> {
    var studentNumber = req.params.sNum
    console.log(req.params)
    Student.find({student_number: studentNumber}).exec((err, result)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send(result)
    })
})

app.delete('/students/:sNum', (req, res)=> {
    var studentNumber = req.params.sNum
    console.log(req.params)
    Student.deleteOne({student_number: studentNumber}, (err)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send("Student deleted!")
    })
})

app.put('/students/:student_number', (req, res)=> {
    var studentNumber = req.params
    console.log(req.params)
    var Update = req.body
    console.log(Update)
    Student.updateOne(studentNumber, Update, (err, result)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else {
            console.log(result) 
            res.send("Student updated!")}
    })
})

//______________COURSES_______________

app.get('/courses', (req, res)=> {
    Course.find(req.query).exec( (err, result)=> {
        if(err) res.status(500).send("Error in finding courses")
        else res.send(result)
    })
})

app.post('/courses', (req, res)=> {
    var newCourse = req.body
    console.log(newCourse)
    newCourse["_id"] = new mongoose.Types.ObjectId()
    var courseModel = new Course(newCourse)

    courseModel.save( (err)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send("Course saved succesfully!")
    })
})

app.get('/courses/:id', (req,res)=> {
    var id = req.params
    console.log(req.params)
    Course.find(id).exec((err, result)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send(result)
    })
})

app.delete('/courses/:id', (req, res)=> {
    var id = req.params
    console.log(req.params)
    Course.deleteOne(id, (err)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send("Course deleted!")
    })
})

app.put('/courses/:id', (req, res)=> {
    var id = req.params
    console.log(req.params)
    var Update = req.body
    console.log(Update)
    Course.updateOne(id, Update, (err, result)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else {
            console.log(result) 
            res.send("Course updated!")}
    })
})

app.listen(port, ()=> {
    console.log("Listening port "+ port)
})