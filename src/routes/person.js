const express = require("express")
const personSchema  = require("../models/person")

const router = express.Router()

//create persona
router.post("/persons",(req, res)=>{
    const user = personSchema(req.body)
    user
        .save()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
});

//get all personas
router.get("/persons",(req,res)=>{
    personSchema
        .find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

//get a persona
router.get("/persons/:id",(req,res)=>{
    const { id } = req.params
    personSchema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

//delete a persona
router.delete("/persons/:id",(req,res)=>{
    const { id } = req.params
    personSchema
     .remove({ _id: id})
     .then((data)=>res.json(data))
     .catch((error)=>res.json({message: error}))
});

//update a persona
router.put("/persons/:id",(req,res)=>{
    const { id } = req.params
    const { nombre, tipo_documento, documento, rol, grupo, genero, direccion, telefono, email} = req.body
    personSchema
        .updateOne({ _id: id }, {$set: {nombre, tipo_documento, documento, rol, grupo, genero, direccion, telefono, email }})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}))
})

module.exports = router;