const { response } = require("express");
const mongoose = require("mongoose");
const  generarJWT  = require("../helpers/jwt");
const Producto = require('../models/Producto')

//query para joins y quitar ciertos campos
const aggregations = [{
      '$lookup': {
        'from': 'proveedores', 
        'localField': 'proveedor', 
        'foreignField': '_id', 
        'as': 'proveedor'
      }
    }, {
      '$lookup': {
        'from': 'almacenes', 
        'localField': 'almacen', 
        'foreignField': '_id', 
        'as': 'almacen'
      }
    },{
      '$lookup': {
        'from': 'categorias', 
        'localField': 'categoria', 
        'foreignField': '_id', 
        'as': 'categoria'
      }
    }, {
      '$unwind': {
        'path': '$proveedor'
      }
    }, {
      '$unset': [
        'proveedor.__v', 'proveedor._id',
        'almacen.__v','almacen._id','almacen.location',
        'categoria.__v','categoria._id','__v'
      ]
    }
]


//CREAR UN NUEVO PRODUCTO
const crearProducto = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let producto = {
        registradopor: req.uid,
        proveedor: req.body.proveedor,
        isFaja: req.body.isFaja,
        stock: req.body.stock,
        almacen: req.body.almacen,
        presentacion: req.body.presentacion,
        nombre: req.body.nombre,
        idpersonalizado: req.body.idpersonalizado,
        categoria:req.body.categoria
    }

    const result = new Producto(producto);
    await result.save();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through crearProducto $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER TODOS LOS REGISTROS CON RELACIONES
const readProductos = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Producto.aggregate(aggregations)
    //let result = await Producto.find();

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readProductos $$$$$$$",
        newToken: token,
        result 
    })
}


//LEER PRODUCTO POR ID
const readProductoById = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    // 1) let result = await Producto.findById(req.params.id);
    let result = await Producto.aggregate(aggregations.concat([
      {
        '$match':
            {
              '_id': { '$eq': new mongoose.Types.ObjectId(req.params.id) }
              // 2) 'nombre': { '$eq': result.nombre }
            }
      }])
    ) 

    return res.status(201).json({
        msg:"$$$$$$$ U are going through readProductoById $$$$$$$",
        newToken: token,
        result 
    })
}


//ACTUALIZAR PRODUCTO
const updateProducto = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Producto.findByIdAndUpdate(req.params.id,req.body);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through updateProducto $$$$$$$",
        newToken: token,
        result 
    })
}


//ELIMINAR PRODUCTO
const deleteProducto = async(req, res = response) => {

    const token = await generarJWT(req.uid, req.name);

    let result = await Producto.findByIdAndDelete(req.params.id);

    return res.status(201).json({
        msg:"$$$$$$$ U are going through deleteProducto $$$$$$$",
        newToken: token,
        result
    })
}

module.exports = {
    crearProducto,
    readProductos,
    readProductoById,
    updateProducto,
    deleteProducto
}