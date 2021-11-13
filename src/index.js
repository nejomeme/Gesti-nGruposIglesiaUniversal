const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require("mongoose")

const personRoute = require("./routes/person")
const shepherdRoute = require("./routes/shepherd")
const leaderRoute = require("./routes/leader")
const subleaderRoute = require("./routes/subleader")

require("dotenv").config()



//rutas del proyecto
app.listen(port,()=>console.log('server listening to', port))
app.get('/',(req,res)=>{
    res.send('Bienvenido a la API')
})


//middlewares
app.use("/api", personRoute)
app.use("/api", shepherdRoute)
app.use("/api", leaderRoute)
app.use("/api", subleaderRoute)
app.use(express.json())

//conexion con mongoDB
mongoose
    .connect(process.env.MONGODB_CONNECT)
    .then(()=> console.log("conectado a MongoDB Atlas"))
    .catch((error)=> console.log(error))

