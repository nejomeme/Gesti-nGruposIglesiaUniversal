const mongoose = require('mongoose')
const subleaderShema = mongoose.Schema({
    grupo:{
        type: String,
        require:true
    },
    totalGrupos:{
        type: Number,
        require:true
    }
})

module.exports = mongoose.model('subleader', subleaderShema)