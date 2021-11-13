const mongoose = require('mongoose')
const leaderShema = mongoose.Schema({
    grupo:{
        type: String,
        require:true
    },
    totalGrupos:{
        type: Number,
        require:true
    },
    totalSubLider:{
        type: Number,
        require:true
    }
})

module.exports = mongoose.model('leader', leaderShema)