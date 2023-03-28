const { Schema, model } = require('mongoose')

const InventarioSchema = Schema({
    
    /*idpersonalizado: {
        type: String,
        required: true
    },*/
    tipodetransaccion: {
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    factura:{
        type: String
    },
    registradopor:{
        ref: 'Usuario',
        type: Schema.Types.ObjectId  //referencia a usuario que creo producto
    },
    producto:{
        ref: 'Producto',
        type: Schema.Types.ObjectId  //referencia a producto ingresado o egresado
    },
})

module.exports = model('Inventario',InventarioSchema)