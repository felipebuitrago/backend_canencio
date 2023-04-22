require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { dbConnect } = require('./config/mongo')

const PORT = process.env.PORT || 3000
const app = express()
//public html
app.use(express.static('public'))
//cors
app.use(cors())
//lecture and parse of the body
app.use(express.json())

//routes
app.use('/api/auth', require('./app/routes/auth')) //auth and login

app.use('/api/products', require('./app/routes/productos')) // products crud

app.use('/api/proveedores', require('./app/routes/proveedor')) // proveedor crud

app.use('/api/pacientes', require('./app/routes/paciente')) // pacientes crud

app.use('/api/categorias', require('./app/routes/categoria')) // categoria crud

app.use('/api/almacenes', require('./app/routes/almacen')) // almacen crud

//end routes

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'public/index.html'));
})
//connects to db
dbConnect()
//starts server
app.listen(PORT, () => {
    let prompt = "$$$ API listenning on port: "+  PORT + " $$$$$$$$$"
    console.log(prompt);
})