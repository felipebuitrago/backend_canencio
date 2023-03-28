const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
    
    idpersonalizado: {
        type: String
    },
    nombre: {
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
    stock:{
        type: Number,
        required: true
    },
    isFaja:{
        type: Boolean
    },
    proveedor:{
        ref: 'Proveedor',
        type: Schema.Types.ObjectId   //referencia coleccion proveedor
    },
    registradopor:{
        ref: 'Usuario',
        type: Schema.Types.ObjectId  //referencia a usuario que creo producto
    }
})

module.exports = model('Productos',ProductoSchema)