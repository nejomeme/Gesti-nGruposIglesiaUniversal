const mongoose = require('mongoose')
const personSchema = mongoose.Schema({
    nombre:{
        type: String,
        require:true
    },
    tipo_documento:{
        type: String,
        require:true
    },
    documento:{
        type: String,
        require:true
    },
    rol:{
        type: String,
        require:true
    },
    grupo:{
        type: String,
        require:true
    },
    genero:{
        type: String,
        require:true
    },
    direccion:{
        type: String,
        require:true
    },
    telefono:{
        type: Number,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    foto:{
        type: String,
        require:true
    }
})

module.exports = mongoose.model('person', personSchema)