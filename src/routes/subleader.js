const express = require("express")
const subleaderShema  = require("../models/subleader")

const router = express.Router()

//create persona
router.post("/subleaders",(req, res)=>{
    const user = subleaderShema(req.body)
    user
        .save()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
});

//get all personas
router.get("/subleaders",(req,res)=>{
    subleaderShema
        .find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

//get a persona
router.get("/subleaders/:id",(req,res)=>{
    const { id } = req.params
    subleaderShema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

//delete a persona
router.delete("/subleaders/:id",(req,res)=>{
    const { id } = req.params
    subleaderShema
     .remove({ _id: id})
     .then((data)=>res.json(data))
     .catch((error)=>res.json({message: error}))
});

//update a persona
router.put("/subleaders/:id",(req,res)=>{
    const { id } = req.params
    const { grupo, totalGrupos} = req.body
    subleaderShema
        .updateOne({ _id: id }, {$set: {grupo, totalGrupos}})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

module.exports = router