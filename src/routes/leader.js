const express = require("express")
const leaderShema  = require("../models/leader")

const router = express.Router()

//create persona
router.post("/leaders",(req, res)=>{
    const user = leaderShema(req.body)
    user
        .save()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
});

//get all personas
router.get("/leaders",(req,res)=>{
    leaderShema
        .find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

//get a persona
router.get("/leaders/:id",(req,res)=>{
    const { id } = req.params
    leaderShema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

//delete a persona
router.delete("/leaders/:id",(req,res)=>{
    const { id } = req.params
    leaderShema
     .remove({ _id: id})
     .then((data)=>res.json(data))
     .catch((error)=>res.json({message: error}))
});

//update a persona
router.put("/leaders/:id",(req,res)=>{
    const { id } = req.params
    const { grupo, totalGrupos, totalSubLider} = req.body
    leaderShema
        .updateOne({ _id: id }, {$set: {grupo, totalGrupos, totalSubLider}})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

module.exports = router;