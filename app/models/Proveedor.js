const { Schema, model } = require('mongoose')

const ProveedorSchema = Schema({
    
    nombre: {
        type: String,
        required: true
    },
    contacto: {
        type: String,
        required: true
    }
})

module.exports = model('Proveedores',ProveedorSchema)