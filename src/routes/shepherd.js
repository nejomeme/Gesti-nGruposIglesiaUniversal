const express = require("express")
const shepherdShema  = require("../models/shepherd")

const router = express.Router()

//create persona
router.post("/shepherds",(req, res)=>{
    const user = shepherdShema(req.body)
    user
        .save()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
});

//get all personas
router.get("/shepherds",(req,res)=>{
    shepherdShema
        .find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

//get a persona
router.get("/shepherds/:id",(req,res)=>{
    const { id } = req.params
    shepherdShema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

//delete a persona
router.delete("/shepherds/:id",(req,res)=>{
    const { id } = req.params
    shepherdShema
     .remove({ _id: id})
     .then((data)=>res.json(data))
     .catch((error)=>res.json({message: error}))
})

//update a persona
router.put("/shepherds/:id",(req,res)=>{
    const { id } = req.params
    const { totalLideres } = req.body
    shepherdShema
        .updateOne({ _id: id }, {$set: {totalLideres }})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
})

module.exports = router;