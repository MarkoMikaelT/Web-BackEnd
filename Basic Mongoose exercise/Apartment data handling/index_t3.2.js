const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const mongoose = require("mongoose")
require("./models_t3.2/mydb")

var Apartment = require('./models_t3.2/apartmentSchema')

//a
app.get('/aparts', (req, res)=> {
    var params = req.query
    console.log(params)
    var max_area = params["maxArea"]
    var min_area = params["minArea"]
    var max_price = params["maxPrice"] 
    let query = {}

    if(max_area && min_area){
        query["pintaala"] = {$lte: parseInt(max_area), $gte: parseInt(min_area)}
        console.log("MIN & MAX AREA")
    }
    else if(max_area) {
        query["pintaala"] = {$lte: parseInt(max_area)}
        console.log("IF MAX_AREA")
    }
    else if(min_area) {
        query["pintaala"] = {$gte: parseInt(min_area)}
        console.log("IF MIN_AREA")
    }
    if(max_price) {
        query["hinta"] = {$lte: parseInt(max_price)}
        console.log("IF MAX_PRICE")
    }
    Apartment.find(query).exec( (err, result)=> {
        if(err) res.status(500).send("Error in finding apartments!")
        else res.send(result)
    })
})

//b
app.post('/aparts', (req, res)=> {
    var newApart = req.body
    newApart["_id"] = new mongoose.Types.ObjectId()
    var apartModel = new Apartment(newApart)

    apartModel.save( (err)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send("New apartment added!")
    })
})

//c
app.get('/aparts/:id', (req, res)=> {
    var apartId = req.params
    console.log(apartId)
    Apartment.find(apartId).exec((err, result)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send(result)
    })
})

//d
app.put('/aparts/:id', (req, res)=> {
    var apartId = req.params
    console.log(apartId)
    var Update = req.body
    Apartment.updateOne(apartId, Update, (err, result)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send("Apartment updated!")
    })
})

//e
app.delete('/aparts/:id', (req, res)=> {
    var apartId = req.params
    console.log(apartId)
    Apartment.deleteOne(apartId, (err)=> {
        if(err) res.status(500).send("Internal error: " + err)
        else res.send("Apartment deleted!")
    })
})

app.listen(port, ()=> {
    console.log("Listening port " + port)
})