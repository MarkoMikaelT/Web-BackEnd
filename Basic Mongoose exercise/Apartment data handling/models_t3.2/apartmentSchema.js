var mongoose = require('mongoose')

var apartmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {type: String},
    rakennusvuosi: {type : Number, required: true, 
                    min: [1900, "too old"], max: [2050, "too new"]},
    yhteyshlo: {type: String, required: true, maxLength: [50, "too long"]},
    email: {type: String, required: true},
    puhelin: {type: String, required: true},
    osoite: {type: String, required: true},
    pintaala: {type: Number, required: true, min: [0, "too small"]},
    huonelkm: {type: Number},
    hinta: {type: Number}
})

var myApartment = mongoose.model('Apartment', apartmentSchema)
module.exports = myApartment