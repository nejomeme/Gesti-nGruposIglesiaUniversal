const mongoose = require('mongoose')
const shepherdShema = mongoose.Schema({
    totalLideres:{
        type: Number,
        require:true
    }    
})

module.exports = mongoose.model('shepherd',shepherdShema)