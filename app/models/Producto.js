const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
    
    nombre: {
        type: String,
        required: true
    },
    presentacion:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    categoria:[{
        ref: 'Categoria',
        type: Schema.Types.ObjectId   //referencia coleccion categorias
    }],
    proveedor:{
        ref: 'Proveedor',
        type: Schema.Types.ObjectId   //referencia coleccion proveedor
    },
    almacen:{
        ref: 'Almacen',
        type: Schema.Types.ObjectId  //referencia a almacenes donde está el producto
    }
})

module.exports = model('Productos',ProductoSchema)