const { Schema, model } = require('mongoose')

const AlmacenSchema = Schema({
    name: {
        type: String,
        required: true
    },
    "location":{
        type: String,
        required: true
    }
})

module.exports = model('Almacenes',AlmacenSchema)