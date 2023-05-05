const { Schema, model } = require('mongoose')

const InventarioSchema = Schema({
    
    tipo_transaccion: {
        type: String,
        required: true
    },
    producto:{
        type: String,        
        required: true
    },
    presentacion:{
        type: String,        
        required: true
    },
    almacen:{
        type: String,        
        required: true
    },
    paciente_proveedor:{
        type: String,        
        required: true
    },
    fecha:{
        type: String,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    factura:{
        type: String
    },
    registrado_por:{
        type: String,
        required: true
    },
    nota:{
        type: String,        
        required: true
    }
})

module.exports = model('Inventario',InventarioSchema)